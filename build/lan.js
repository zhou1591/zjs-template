'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'lan'
let { buliding } = require('./bulid.config.js')
buliding()