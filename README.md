# Frameworkless React SSR starter

**This is a frameworkless Node.js/Typescript/Express/React stack to serve SSR React apps.** It prefers _explicit code_ over _magic glue_. It [`cloc`](https://github.com/AlDanial/cloc)s in at 300 total lines of code.

It's an alternative to opinionated frameworks (Next.js, Remix, Sveltekit, others) which leans on basic tools like `esbuild` and `express` to assemble an SSR-capable backend. There's no man behind the curtain:

* no forced route file conventions that are difficult/impossible to override
* no hidden build process
* no one-true-way to build middleware, use a queue, etc.
* and other 

Instead, all of the plumbing is in plain sight and is fully customizable.

It adapts one useful convention from Remix: the interior structure of a route file. Route files are structured as a pair: a "loader" function that runs on the server, and a "view" function that uses that data to render the React view on both server and client.

### Pros

* **Simple main stack.** Just vanilla Node, Express, and React.
* **Simple build system.** It's `esbuild`, `nodemon`, and `concurrently`: all of which are do-one-thing-well tools that are manually glued together. No config-heavy do-everything tools like Vite, Webpack, etc. (Vite and others have a place, but they're not always needed).
* **No HMR (hot module replacement) or live reload.** These add unnecessary complexity. Instead, the server is immediately restarted on changes, and the browser can be manually refreshed to see the changes.
  * Live reload could be added simply using something [like this](https://esbuild.github.io/api/#live-reload) it's it really important.
* **Same build output format for both dev and production.** The `dist/` folder. There's no live-served, uninspectable build output.
  * If you want to customize prod vs. dev build configuration, that's easy to do by editing the esbuild configuration in `scripts/build*` files.
* **[Tree-shaking](https://esbuild.github.io/api/#tree-shaking-and-side-effects) natively.** Server-side code like database clients won't end up in client-side bundles.

### Cons

* **More manual steps to register loaders and views**. See the `src/routes/registry.ts` file for how this works. This is necessary to avoid a build step that scans for a file structure.
* **No client-side bundle splitting by route/view.** This is nice to have for SEO- or performance-sensitive apps, but not always needed for basic SPAs.
* **Image bundling, WebAssembly bundling, etc. requires additional work.** The good news is that there's typically an esbuild plugin for just about everything. It's trivial to build your own plugin if not.
* **SSR rendering is done using [`renderToString`](https://react.dev/reference/react-dom/server/renderToString).** This doesn't support streaming. Streaming isn't necessary for most use cases, and it adds some complexity. That said, PRs are welcome to adjust this to [`renderToPipeableStream`](https://react.dev/reference/react-dom/server/renderToPipeableStream).

## Getting started

1. Clone this repo.
2. Delete the `.git` folder to start with a fresh git history.
3. Delete the `LICENSE` file and "License" section of the README.
4. Install dependencies with `npm install`.
5. Run the local server with `npm run dev`. `nodemon` will error the first time you do this; just terminate and re-run the command.

This repo is intentionally kept slim; you'll probably want to add:

* A formatter like `prettier`
* Linting with `eslint`
* Typechecking command with Typescript's `tsc`
* CI/CD jobs for running the above
* React styling library like `emotion`
* A static asset bundling plugin (e.g. for images)

## Deployment

To build for deployment:
```sh
npm run build
```

The build is placed into the `dist/` directory. This directory is fully self-contained. It can be deployed to a server or copied into a Dockerfile or whatever.

## License

Public domain via [The Unlicense](https://choosealicense.com/licenses/unlicense/#). If you find this useful, you can say "thanks" by showing kindness today to someone who doesn't deserve it.
