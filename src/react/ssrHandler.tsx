import { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { Home, load } from "../handlers/Home";
import { readFileSync } from "fs";
import { App } from "./App";
import { resolve } from "path";

type Doc = {
  title: string;
  html: string;
  state: object;
};

export function routeHandler(req: Request, res: Response) {
  const loaderState = load();
  const html = renderToString(
    <App loaderState={loaderState}>
      <Home />
    </App>
  );
  const appString = renderDoc({
    title: "React SSR",
    html,
    state: loaderState,
  });
  res.send(appString);
}

export function renderDoc({ title, html, state }: Doc): string {
  return `
  <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
    </head>
    <body>
        <div id="app">${html}</div>
        <script>window.__reactUseLoaderState = ${JSON.stringify(state)};</script>
        <script src="${pathFromManifest("dist/static/client.js")}"></script>
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
