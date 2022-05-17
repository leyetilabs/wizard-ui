import { defineConfig, Options } from "tsup";

const baseConfig: Options = {
  entry: ["src/index.ts"],
  outDir: "dist",
  target: "es2016",
  platform: "browser",
  format: ["esm"],
  splitting: false,
  shims: false,
};

export default defineConfig([
  {
    ...baseConfig,
    minify: false,
    sourcemap: true,
  },
]);
