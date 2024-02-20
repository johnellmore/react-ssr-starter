# Frameworkless React SSR starter

**This is a frameworkless Node.js/Express/Typescript/React stack to serve SSR React apps.** This structure prefers _explicit code_ over _magic glue_. It [`cloc`](https://github.com/AlDanial/cloc)s in at approximately 300 lines of code total.

This is an alternative to opinionated frameworks like Next.js and Remix. It leans on basic tools like `esbuild` and `express` to assemble an SSR-capable backend. **There's no "magic"**; no forced route file conventions, no hidden build process, no restrictions on middleware, no walled-off ecosystem when adding support for image bundling or databases or whatever. Instead, all of the plumbing is in plain sight and is fully customizable.

It adapts one convention from Remix: the interior structure of a route file. Route files are structured as a pair: a "loader" function that runs on the server, and a "view" function that uses that data and renders on both server and client.

### Pros

* The runtime is just vanilla Express and React.
* Build system is just simple do-one-thing-well tools that are manually glued together. There are no config-heavy do-everything tools like Vite, Webpack, etc. Vite and others have a place, but they're not always needed.
* No HMR (hot module replacement) or live reload. This is "magic" which tends to add unnecessary complexity. Instead, the server is just restarted on changes, and the browser can be manually refreshed to see the changes.
  * Live reload could be added using something [like this](https://esbuild.github.io/api/#live-reload).
* The same build process and output format for both dev and production builds: the `dist/` folder. There's no live-served, uninspectable build output.
  * If you want to customize prod vs dev build, that's easily to do by editing the esbuild configuration in `scripts/build*` files.
* [Tree-shaking](https://esbuild.github.io/api/#tree-shaking-and-side-effects) natively. Server-side code like database clients won't end up in client-side bundles.

### Cons

* More manual steps to register loaders and views (see the `src/routes/registry.ts` file for how this works). This is necessary to avoid a build step that scans for a file structure.
* No client-side bundle splitting by route/view. This is nice to have for SEO- or performance-sensitive apps, but not always needed for basic SPAs.
* Image bundling, WebAssembly bundling, etc. requires manual steps. The good news is that there's typically an esbuild plugin for just about everything, and it's trivial to build your own esbuild plugin if not.
* SSR rendering is done using [`renderToString`](https://react.dev/reference/react-dom/server/renderToString), which doesn't support streaming. Streaming isn't necessary for most use cases, and it adds some complexity. That said, PRs are welcome to adjust this to [`renderToPipeableStream`](https://react.dev/reference/react-dom/server/renderToPipeableStream).

## Getting started

Clone or fork this repo, then install dependencies with `npm install`, then follow the "local development" instructions below.

This repo is intentionally kept slim; you'll probably want to add:

* A formatter like `prettier`
* Linting with `eslint`
* Typechecking command with Typescript's `tsc`
* CI/CD jobs for running the above
* React styling library like `emotion`

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
