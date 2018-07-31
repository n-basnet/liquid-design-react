const { getSVGOConfig } = require('../scripts/getSVGOConfig')

module.exports = (baseConfig, env, defaultConfig) => {
  const svgRuleIndex = defaultConfig.module.rules.indexOf(
    defaultConfig.module.rules.find(
      v => v.loader && v.loader.indexOf('svg-url-loader') > 0
    )
  )

  defaultConfig.module.rules[svgRuleIndex] = {
    test: /\.svg$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'react-svg-loader',
        options: {
          jsx: true,
          svgo: getSVGOConfig(),
        },
      },
    ],
  }
  defaultConfig.resolve.extensions.push('.svg')

  return defaultConfig
}
