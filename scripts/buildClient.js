const esbuild = require("esbuild");
const manifestPlugin = require("esbuild-plugin-manifest");

const opts = {
  entryPoints: ["src/client.tsx"],
  bundle: true,
  platform: "browser",
  outdir: "dist/static",
  plugins: [manifestPlugin()],
};

(async () => {
  if (process.argv.includes("--watch")) {
    const ctx = await esbuild.context(opts);
    await ctx.watch();
    console.log("watching for changes");
  } else {
    await esbuild.build(opts);
  }
})();
