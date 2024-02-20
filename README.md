# Frameworkless React SSR starter

This is a ultra-based Node.js/Express/Typescript/React stack to run SSR React apps.

This is an alternative to opinionated frameworks like Next.js and Remix. Instead, it leans on basic tools like `esbuild` and `express` to assemble an SSR-capable backend. There's no "magic"; no forced route file conventions, no hidden build process, no restrictions on middleware, no walled-off ecosystem when adding support for image bundling or databases or whatever. Instead, all of the plumbing is in plain sight and is fully customizable.

It does borrow one convention from Remix: the interior structure of a route file. Route files are structured as a pair: a "loader" function that runs on the server, and a "view" function that uses that data and renders on both server and client.

The downside of not using a framework is reflected in the `src/routes/routes.ts` file. The loaders and views have to be paired together so that the backend knows how to render different routes, but the associations ALSO have to be shipped to the frontend so that the correct view can be shown for a given loader. To prevent the loader code from being shipped to the frontend, these can't be tied directly to one another; hence the key-matching approach.

## Local development

```sh
npm run dev
```

This runs the frontend build, backend build, and nodemon concurrently. The first time you do this, `nodemon` may error out because the server file won't exist. To work around this, just stop and restart the command.

## Deployment

To build for deployment:
```sh
npm run build
```

The contents of the `dist/` directory can then be deployed. All dependencies are bundled, and there's no need to deploy `node_modules` or other external dependencies.
