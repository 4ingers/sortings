const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@assets' : 'src/assets',
    '@styles' : 'src/styles',
    '@algorithms' : 'src/algorithms',
  })(config)
  
  return config
}