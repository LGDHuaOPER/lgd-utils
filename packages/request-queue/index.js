/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-02 01:38:12
 * @LastEditTime: 2021-12-10 17:30:26
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\request-queue\index.js
 */

'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/request-queue.cjs.prod.js')
} else {
  module.exports = require('./dist/request-queue.cjs.js')
}
