module.exports = {
  reactStrictMode: true,
  experimental: {
    esmExternals: false,
  },
  webpack: function (config) {
    config.experiments = { asyncWebAssembly: true, syncWebAssembly: true };
    return config;
  },
};
