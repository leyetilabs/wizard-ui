const withTM = require("next-transpile-modules")(["d3-format"]);

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: false,
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = withTM(config);
