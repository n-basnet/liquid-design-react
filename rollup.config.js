import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import autoExternal from 'rollup-plugin-auto-external'
import resolve from 'rollup-plugin-node-resolve'
import reactSvg from 'rollup-plugin-react-svg'
import url from 'rollup-plugin-url'
import string from 'rollup-plugin-string'

import pkg from './package.json'
const { getSVGOConfig } = require('./scripts/getSVGOConfig')

const MAX_INLINE_FILE_SIZE_KB = 100

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  plugins: [
    autoExternal(),
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
    }),
    resolve(),
    commonjs(),
    reactSvg({
      svgo: getSVGOConfig(),
    }),
    url({
      limit: MAX_INLINE_FILE_SIZE_KB * 1024,
      include: ['**/*.woff', '**/*.woff2'],
    }),
    string({
      include: '**/*.css',
    }),
  ],
  watch: {
    chokidar: false,
  },
}
