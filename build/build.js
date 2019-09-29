'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

let { buliding } = require("./bulid.config.js")
buliding()