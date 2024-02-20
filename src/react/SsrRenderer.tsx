import { readFileSync } from "fs";
import { resolve } from "path";
import { renderToString } from "react-dom/server";
import { App } from "./App";
import { Request, Response } from "express";
import { LoaderRegistry, ViewRegistry } from "../types";

/**
 * Given a set of loaders and views, this class can create an Express handler
 * that executes the loader and then server-side-renders the view.
 */
export class SsrRenderer<T extends LoaderRegistry> {
  constructor(
    private readonly loaders: T,
    private readonly views: ViewRegistry<keyof T>
  ) {}

  makeHandler(key: keyof T) {
    if (typeof key !== "string") {
      throw new Error("Key must be a string");
    }
    const loader = this.loaders[key];
    const View = this.views[key] as any;
    if (!loader || !View) {
      throw new Error(`No loader or view found for key: ${key}`);
    }

    return async (req: Request, res: Response) => {
      const state = await loader({ req });
      const html = renderToString(
        <App views={this.views} viewKey={key} loaderState={state} />
      );
      const appString = renderDoc({
        title: "React SSR",
        html,
        state,
        viewKey: key,
      });
      res.send(appString);
    };
  }
}

/**
 * Render the HTML page skeleton that the app will live inside. This includes
 * the view key and the view state coming from the server.
 */
function renderDoc({
  title,
  html,
  state,
  viewKey,
}: {
  title: string;
  html: string;
  state: object;
  viewKey: string;
}): string {
  return `
  <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <!-- prevent favicon.ico requests (TODO replace this) -->
        <link rel="icon" href="data:;base64,iVBORw0KGgo=">
        <title>${title}</title>
    </head>
    <body>
        <div id="app">${html}</div>
        <script>
        window.__reactUseLoaderState = ${JSON.stringify(state)};
        window.__reactView = "${viewKey}";
        </script>
        <script src="${pathFromManifest("dist/static/frontend.js")}"></script>
    </body>
    </html>
`;
}

let manifest: Record<string, string> | undefined;

/**
 * Finds the hashed-suffixed path for a file in the manifest. This works in
 * conjunction with `esbuild-plugin-manifest` to allow for cache-busting static
 * assets.
 */
function pathFromManifest(path: string): string {
  if (!manifest) {
    const mainfestPath = resolve(__dirname, "./static/manifest.json");
    const raw = readFileSync(mainfestPath, "utf-8");
    manifest = JSON.parse(raw) as Record<string, string>;
  }
  const resolved = manifest[path];
  if (!resolved) {
    throw new Error(`File path not found in manifest: ${path}`);
  }
  if (!resolved.startsWith("dist/")) {
    throw new Error(`File path does not start with "dist/": ${resolved}`);
  }
  const distPath = resolved.slice(4); // remove "dist", keep leading slash
  return distPath;
}
