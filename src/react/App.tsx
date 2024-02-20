import { StrictMode } from "react";
import { LoaderProvider } from "./useLoader";
import { ViewRegistry } from "../lib/types";

type AppProps = {
  views: ViewRegistry<string>;
  viewKey: string;
  loaderState?: object;
};
export function App({ views, viewKey, loaderState }: AppProps) {
  const View = views[viewKey];
  if (!View) {
    throw new Error(`No view found for key: ${viewKey}`);
  }
  return (
    <StrictMode>
      <LoaderProvider value={loaderState}>
        <View />
      </LoaderProvider>
    </StrictMode>
  );
}
