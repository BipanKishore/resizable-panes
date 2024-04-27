import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import postcss from 'rollup-plugin-postcss'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: './lib/index.cjs.js',
        format: 'cjs',
        sourcemap: true
      },
      {
        file: './lib/index.esm.js',
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins: [
      peerDepsExternal({
        packageJsonPath: '../package.json'
      }),
      resolve(),
      commonjs(),
      typescript({tsconfig: './configs/tsconfig.json'}),
      postcss()
    ]
  }
]
