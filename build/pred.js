'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'pred'
let { buliding } = require('./bulid.config.js')
buliding()