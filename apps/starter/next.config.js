module.exports = {
  reactStrictMode: true,
  experimental: {
    esmExternals: "loose",
  },
  webpack: function (config) {
    config.experiments = { asyncWebAssembly: true, syncWebAssembly: true };
    return config;
  },
};
