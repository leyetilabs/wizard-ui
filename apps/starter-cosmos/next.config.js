const withTM = require("next-transpile-modules")([
  "d3-format",
  "@wizard-ui/react",
  "@wizard-ui/cosmos",
]);

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  experimental: {
    esmExternals: "loose",
  },
  webpack: function (config) {
    config.experiments = { asyncWebAssembly: true, syncWebAssembly: true };
    return config;
  },
};

module.exports = withTM(config);
