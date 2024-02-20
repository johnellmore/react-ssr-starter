import React from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./react/App";
import { Home } from "./handlers/Home";

const container = document.getElementById("app")!;
const root = hydrateRoot(
  container,
  <App>
    <Home />
  </App>
);
