
const { i18n } = require('./next-i18next.config')


module.exports = {
  i18n,
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      // Exclude `fs` and other Node.js built-ins in the client-side bundle
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  }
};
