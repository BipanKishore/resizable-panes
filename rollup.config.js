import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import packageJson from './package.json'
import {config} from 'dotenv'

if (process.env.NODE_ENV === 'dev') {
  config({
    path: './.env.dev',
    override: true
  })
} else {
  config()
}

const isOptimise = process.env.REACT_LIB_OPTIMIZE === 'TRUE'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript(),
    postcss(),
    isOptimise ? null : terser()
  ],
  external: ['react']
}
