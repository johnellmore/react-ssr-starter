/**
 * Builds the backend. Invoke using `node buildBackend.js`. Pass the `--watch`
 * flag to enable watch mode for development.
 */

const esbuild = require("esbuild");

const opts = {
  entryPoints: ["src/backend.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  outdir: "dist",
};

(async () => {
  if (process.argv.includes("--watch")) {
    const ctx = await esbuild.context(opts);
    await ctx.watch();
    console.log("watching for changes");
  } else {
    await esbuild.build(opts);
    console.log("backend built");
  }
})();
