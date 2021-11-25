const config = require('kcd-scripts/jest')

module.exports = {
  ...config,
  transformIgnorePatterns: ['node_modules/(?!(@terra-money/use-wallet)/)'],
}
