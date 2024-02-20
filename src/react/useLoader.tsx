import { useContext, createContext } from "react";

const LoaderContext = createContext<any>(null);

/**
 * React hook to get the server-provided view state. This should generally only
 * be used in the top-level view component.
 */
export function useLoader<T extends (...args: any) => any>(): Awaited<
  ReturnType<T>
> {
  // client-side access
  if (typeof window !== "undefined") {
    return (window as any).__reactUseLoaderState;
  }

  // server-side access
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
}

export const LoaderProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: any;
}) => {
  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
};
