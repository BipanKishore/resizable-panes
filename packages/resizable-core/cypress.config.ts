import {defineConfig} from 'cypress'

export default defineConfig({
  projectId: '2xc7po',
  retries: {
    runMode: 0
  },

  // setupNodeEvents can be defined in either
  // the e2e or component configuration
  e2e: {
    baseUrl: 'http://localhost:9000/',
    setupNodeEvents (on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@cypress/code-coverage/task')(on, config)
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config
    }
  },

  component: {
    setupNodeEvents (on, config) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('@cypress/code-coverage/task')(on, config)
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config
    },
    devServer: {
      framework: 'react',
      bundler: 'webpack'
    }
  }
})
