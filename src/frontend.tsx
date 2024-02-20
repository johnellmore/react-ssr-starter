import { hydrateRoot } from "react-dom/client";
import { App } from "./react/App";
import { registeredViews } from "./handlers/registry";

const container = document.getElementById("app")!;
const views = registeredViews();
const viewKey = (window as any).__reactView as string;
if (!viewKey) {
  throw new Error("No view key found");
}
const root = hydrateRoot(container, <App views={views} viewKey={viewKey} />);
