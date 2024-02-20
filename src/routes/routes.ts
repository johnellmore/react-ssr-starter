import express from "express";
import { SsrRenderer } from "../react/SsrRenderer";
import { registeredLoaders, registeredViews } from "./registry";

export function routes() {
  const router = express.Router();

  // The SsrRenderer takes the list of all registered loaders and views and
  // their keys, and can generate the request-serving function for a given
  // loader key.
  const ssr = new SsrRenderer(registeredLoaders(), registeredViews());

  router.get("/", ssr.makeHandler("home"));
  router.get("/server-side-example", ssr.makeHandler("server-side-example"));
  router.get("/client-side-example", ssr.makeHandler("client-side-example"));

  return router;
}
