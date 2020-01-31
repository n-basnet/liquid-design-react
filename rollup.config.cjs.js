import configCommon from './rollup.config.common'

const config = Object.assign({
  input: 'src/index.js',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
    },
  ],
}, configCommon)

export default config
