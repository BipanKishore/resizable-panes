import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import postcss from 'rollup-plugin-postcss'
import terser from '@rollup/plugin-terser'
import {dts} from 'rollup-plugin-dts'
// import copy from 'rollup-plugin-copy'
import path from 'path'
import {fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

export const LIB_NAME = 'resizable-panes-react'
export const DEVELOPMENT = 'development'
export const PRODUCTION = 'production'

const CJS_EXTENTION = 'cjs.js'
const ESM_EXTENTION = 'esm.js'

const CJS_BUILD_PATH = './lib/cjs/'
const ESM_BUILD_PATH = './lib/esm/'

export const LIB_FILE_NAME_DEVELOPMENT_CJS = `${LIB_NAME}.${DEVELOPMENT}.${CJS_EXTENTION}`
export const LIB_FILE_NAME_PRODUCTION_CJS = `${LIB_NAME}.${PRODUCTION}.min.${CJS_EXTENTION}`

export const LIB_FILE_NAME_DEVELOPMENT_ESM = `${LIB_NAME}.${DEVELOPMENT}.${ESM_EXTENTION}`
export const LIB_FILE_NAME_PRODUCTION_ESM = `${LIB_NAME}.${PRODUCTION}.min.${ESM_EXTENTION}`

export const BUILD_INPUT_FILE_PATH = path.resolve(__dirname, '../src/index.ts')

export const cjsOutOptionsDevelopment = {
  file: `${CJS_BUILD_PATH}${'index.cjs.js'}`,
  format: 'cjs',
  sourcemap: true,
  sourcemapPathTransform: (sourcePath) => {
    return sourcePath.substring('../'.length)
  }
}

export const cjsOutOptionsProduction = {
  file: `${CJS_BUILD_PATH}${'index.cjs.js'}`,
  format: 'cjs',
  sourcemap: true,
  sourcemapPathTransform: (sourcePath) => {
    return sourcePath.substring('../'.length)
  }
}

export const esmOutOptionsDevelopment = {
  file: `${ESM_BUILD_PATH}${'index.esm.js'}`,
  format: 'esm',
  sourcemap: true,
  sourcemapPathTransform: (sourcePath) => {
    return sourcePath.substring('../'.length)
  }
}

export const esmOutOptionsProduction = {
  file: `${ESM_BUILD_PATH}${'index.esm.js'}`,
  format: 'esm',
  sourcemap: true,
  sourcemapPathTransform: (sourcePath) => {
    return sourcePath.substring('../'.length)
  }
}

export const developmentPlugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  typescript(),
  postcss()
  // copy({
  //   targets: [{
  //     src: 'scripts/include-scripts.cjs.js',
  //     dest: `${CJS_BUILD_PATH}`,
  //     rename: 'index.cjs.js'
  //   },
  //   {
  //     src: 'scripts/include-scripts.esm.js',
  //     dest: `${ESM_BUILD_PATH}`,
  //     rename: 'index.esm.js'
  //   }]
  // })
]

export const productionPlugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  typescript(),
  postcss(),
  terser()
]

export const EXTERNALS = ['react']

export const typesRollupConfig = {
  input: 'src/index.ts',
  output: [{file: 'lib/index.d.ts', format: 'es'}],
  plugins: [dts()]
}

export const developmentConfig = {
  input: 'src/index.ts',
  output: [
    {
      ...cjsOutOptionsDevelopment
    },
    {
      ...esmOutOptionsDevelopment
    }
  ],
  plugins: developmentPlugins,
  external: EXTERNALS
}

const productionConfigMinSet = {
  input: 'src/index.ts',
  output: [
    {
      ...cjsOutOptionsProduction
    },
    {
      ...esmOutOptionsProduction
    }
  ],
  plugins: productionPlugins,
  external: EXTERNALS
}

export const productionConfig = [
  // developmentConfig,
  productionConfigMinSet,
  typesRollupConfig
]
