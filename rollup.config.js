import typescript from "rollup-plugin-typescript2";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [peerDepsExternal(), typescript()],
  external: [
    "react",
    "react-dom",
    "@terra-money/terra.js",
    "@terra-money/wallet-provider",
    "graphql-request",
    "bignumber.js",
  ],
};
