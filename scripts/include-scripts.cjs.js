'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/resizable-panes-react.production.min.js')
} else {
  module.exports = require('./cjs/resizable-panes-react.development.js')
}
