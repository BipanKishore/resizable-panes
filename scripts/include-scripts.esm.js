'use strict'

export const ResizablePanes = process.env.NODE_ENV === 'production'
  ? import('resizable-panes-react.production.min.esm.js')
  : import('resizable-panes-react.development.esm.js')
