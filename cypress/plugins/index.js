import task from '@cypress/code-coverage/task'

export default (on, config) => {
  task(on, config)
  return config
}
