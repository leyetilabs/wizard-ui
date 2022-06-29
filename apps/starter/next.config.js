const withTM = require("next-transpile-modules")([
  "@wizard-ui/react",
  "@wizard-ui/terra",
]);

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    esmExternals: "loose",
  },
  webpack: function (config) {
    config.experiments = { asyncWebAssembly: true, syncWebAssembly: true };
    return config;
  },
};

module.exports = withTM(config);
