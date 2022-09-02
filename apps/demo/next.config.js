const withTM = require("next-transpile-modules")([
  "d3-format",
  "@wizard-ui/core",
  "@wizard-ui/react",
]);

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = withTM(config);
