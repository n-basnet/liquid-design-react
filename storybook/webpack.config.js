const { getSVGOConfig } = require('../scripts/getSVGOConfig')

const findRuleIndex = (testRegex, rules) =>
  rules.indexOf(rules.find(v => v.test.toString() === testRegex.toString()))

const updateRule = ({ testRegex, use, rules }) => {
  rules[findRuleIndex(testRegex, rules)] = {
    test: testRegex,
    use,
  }
  return rules
}

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules = updateRule({
    testRegex: /\.svg$/,
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
    rules: defaultConfig.module.rules,
  })

  defaultConfig.module.rules = updateRule({
    testRegex: /\.css$/,
    use: 'raw-loader',
    rules: defaultConfig.module.rules,
  })

  defaultConfig.resolve.extensions.push('.svg')

  return defaultConfig
}
