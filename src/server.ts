import express from "express";
import { routeHandler } from "./react/ssrHandler";
import { resolve } from "path";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/ssr", routeHandler);

app.use("/static", express.static(resolve(__dirname, "./static")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
