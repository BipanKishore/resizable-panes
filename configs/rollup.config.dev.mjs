// rollup.config.js
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
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({tsconfig: './configs/tsconfig.json'}),
      postcss()
    ]
  }
  // {
  //   input: '@types/index.d.ts',
  //   output: [
  //     {
  //       file: 'lib/index.d.ts',
  //       format: 'esm'
  //     }
  //   ],
  //   plugins: [dts()],
  //   external: [/\.(css|less|scss)$/]
  // }
]
