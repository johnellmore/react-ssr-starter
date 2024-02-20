import { readFileSync } from "fs";
import { resolve } from "path";
import { renderToString } from "react-dom/server";
import { App } from "../react/App";
import { Request, Response } from "express";
import { LoaderRegistry, ViewRegistry } from "../lib/types";

export class SsrRenderer<T extends LoaderRegistry> {
  constructor(
    private readonly loaders: T,
    private readonly views: ViewRegistry<keyof T>
  ) {
    //
  }

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

type Doc = {
  title: string;
  html: string;
  state: object;
  viewKey: string;
};
function renderDoc({ title, html, state, viewKey }: Doc): string {
  return `
  <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
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
