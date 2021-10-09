const config = require('kcd-scripts/jest')

module.exports = {
  ...config,
  transformIgnorePatterns: ['node_modules/(?!(@terra-dev/use-wallet)/)'],
}
