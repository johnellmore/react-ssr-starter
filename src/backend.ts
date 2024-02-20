import express from "express";
import { resolve } from "path";
import { SsrRenderer } from "./routes/SsrRenderer";
import { registeredLoaders, registeredViews } from "./routes/registry";

const app = express();
const port = 3000;

const ssr = new SsrRenderer(registeredLoaders(), registeredViews());

app.get("/", ssr.makeHandler("home"));
app.get("/server-side-example", ssr.makeHandler("server-side-example"));
app.get("/client-side-example", ssr.makeHandler("client-side-example"));

app.use("/static", express.static(resolve(__dirname, "./static")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
