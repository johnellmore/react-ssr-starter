import express from "express";
import { resolve } from "path";
import { SsrRenderer } from "./react/SsrRenderer";
import { registeredLoaders, registeredViews } from "./handlers/registry";

const app = express();

// serve the frontend JS bundle, as well as any other static files
app.use(
  "/static",
  express.static(resolve(__dirname, "./static"), {
    maxAge: "1y",
    immutable: true,
  })
);

// The SsrRenderer takes the list of all registered loaders, views, and their
// keys, and can generate the request-serving function for a given loader key.
const ssr = new SsrRenderer(registeredLoaders(), registeredViews());
app.get("/", ssr.makeHandler("home"));
app.get("/server-side-example", ssr.makeHandler("server-side-example"));
app.get("/client-side-example", ssr.makeHandler("client-side-example"));

const server = app.listen(3000, () => {
  console.log(`Server running at http://localhost:${server.address()?.port}`);
});
