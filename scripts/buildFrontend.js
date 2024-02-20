const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");
const manifestPlugin = require("esbuild-plugin-manifest");

// clean the `dist/static` directory first
const distStatic = path.join(__dirname, "..", "dist", "static");
if (fs.existsSync(distStatic)) {
  fs.rmSync(distStatic, { recursive: true });
}

const opts = {
  entryPoints: ["src/frontend.tsx"],
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
