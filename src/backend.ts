import express from "express";
import { resolve } from "path";
import { routes } from "./routes/routes";

const app = express();
const port = 3000;

app.use(routes());

app.use("/static", express.static(resolve(__dirname, "./static")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
