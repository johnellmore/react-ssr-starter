import {
  DatabaseExampleLoader,
  DatabaseExampleView,
} from "../handlers/DatabaseExample";
import { HomeLoader, HomeView } from "../handlers/Home";

/**
 * Defines each loader that is registered with the backend. Each loader is given
 * a unique string key which is used to match up the loaders with the views
 * defined in the `registeredViews()` function.
 *
 * These functions are distinct so that they can be imported separately. The
 * backend needs to import both since it's both loading the data AND rendering
 * it, but the frontend only imports the `registeredViews` function, and none of
 * the code in the loaders is bundled or shipped to the client.
 */
export function registeredLoaders() {
  return {
    home: HomeLoader,
    "database-example": DatabaseExampleLoader,
  };
}
type LoaderKeys = keyof ReturnType<typeof registeredLoaders>;

/**
 * Defines the view that renders each loader key. These must be matched up 1:1
 * to each loader, and that's enforced by typing constraints.
 */
export function registeredViews(): Record<LoaderKeys, React.FC> {
  return {
    home: HomeView,
    "database-example": DatabaseExampleView,
  };
}
