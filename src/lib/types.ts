import { Request } from "express";

/**
 * Arguments that are passed to each loader when it's executed. This could be
 * expanded to pass database connections or other dependencies.
 */
type LoaderArgs = {
  req: Request;
  // others can be added here
};

/**
 * A function that, for a given request, generates the data for a view.
 */
type Loader = (
  args?: LoaderArgs
) => Record<string, any> | Promise<Record<string, any>>;

/**
 * A registry of all the loaders that are available to the server, keyed by
 * unique strings.
 */
export type LoaderRegistry = Record<string, Loader>;

/**
 * A registry of all the views that are available to the server, keyed by the
 * same strings as their respective loaders.
 *
 * TODO narrow key types to just strings.
 */
export type ViewRegistry<K extends string | number | symbol> = Record<
  K,
  React.FC
>;
