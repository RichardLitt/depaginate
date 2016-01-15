'use strict'
const _ = require('lodash')
const Promise = require('bluebird')
const arr = []

module.exports = function loadAllPages (callFx, opts) {
  opts['page'] = opts.page || 1

  return Promise.resolve().then(function () {
    return callFx(opts)
  }).then(function (result) {
    arr.push(result)
    if (_.isFunction(result.nextPage)) {
      opts.page = opts.page + 1
      return loadAllPages(callFx, opts)
    } else {
      return Promise.resolve(_.flatten(arr))
    }
  }).catch(function (err) {
    if (err) {
      console.log('Failed to depaginate')
    }
  })
}
