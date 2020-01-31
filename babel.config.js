module.exports = api => {
  const isTest = api.env('test')

  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
  ]

  if (!isTest) {
    plugins.push([
      'ramda',
      {
        useES: true,
      },
    ])
  }

  return {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins,
  }
}
