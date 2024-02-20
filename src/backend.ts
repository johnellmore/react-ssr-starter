import express from "express";
import { resolve } from "path";
import { SsrRenderer } from "./react/SsrRenderer";
import { registeredLoaders, registeredViews } from "./handlers/registry";

const app = express();
const port = 3000;

app.use(
  "/static",
  express.static(resolve(__dirname, "./static"), {
    maxAge: "1y",
    immutable: true,
  })
);

// The SsrRenderer takes the list of all registered loaders and views and their
// keys, and can generate the request-serving function for a given loader key.
const ssr = new SsrRenderer(registeredLoaders(), registeredViews());

app.get("/", ssr.makeHandler("home"));
app.get("/server-side-example", ssr.makeHandler("server-side-example"));
app.get("/client-side-example", ssr.makeHandler("client-side-example"));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
