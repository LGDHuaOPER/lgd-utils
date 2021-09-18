/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-02 01:38:12
 * @LastEditTime: 2021-09-18 11:28:30
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\error\index.js
 */

'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/error.cjs.prod.js')
} else {
  module.exports = require('./dist/error.cjs.js')
}
