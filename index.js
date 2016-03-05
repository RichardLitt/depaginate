'use strict'
const _ = require('lodash')
const Promise = require('bluebird')
var arr = []

module.exports = function loadAllPages (callFx, opts) {
  opts['page'] = opts.page || 1

  return Promise
    .resolve(callFx(opts))
    .then((result) => {
      arr.push(result)
      if (_.isFunction(result.nextPage)) {
        opts.page = opts.page + 1
        return loadAllPages(callFx, opts)
      } else {
        var newArr = arr
        arr = []
        return _.flatten(newArr)
      }
    }).catch((err) => {
      if (err) {
        console.log('Failed to depaginate\n', err)
      }
    })
}
