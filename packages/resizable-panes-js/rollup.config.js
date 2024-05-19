import {config} from 'dotenv'
import {typesRollupConfig, productionConfig, developmentConfig} from '../resizable-core/build.script'

let isProduction = false

if (process.env.NODE_ENV === 'dev') {
  config({
    path: './.env.dev',
    override: true
  })
} else {
  config()
  isProduction = true
}

export default isProduction
  ? productionConfig
  : [
      developmentConfig,
      typesRollupConfig
    ]
