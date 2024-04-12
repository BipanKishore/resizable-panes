import {defineConfig} from 'cypress'
import cypressPluginsMethod from './cypress/plugins'

export default defineConfig({
  viewportWidth: 1016,
  viewportHeight: 1016,
  fixturesFolder: false,
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    }
  },
  e2e: {
    setupNodeEvents (on, config) {
      return cypressPluginsMethod(on, config)
    },
    env: {
      codeCoverage: {
        exclude: 'cypress/**/*.*'
      }
    }
  }
})
