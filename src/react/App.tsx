import { StrictMode } from "react";
import { LoaderProvider } from "./useLoader";

type AppProps = {
  loaderState?: object;
  children: React.ReactNode;
};
export function App({ loaderState, children }: AppProps) {
  return (
    <StrictMode>
      <LoaderProvider value={loaderState}>{children}</LoaderProvider>
    </StrictMode>
  );
}
