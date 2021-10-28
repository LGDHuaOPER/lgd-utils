/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-02 01:38:12
 * @LastEditTime: 2021-10-28 17:05:49
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\symbol\index.js
 */

'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/symbol.cjs.prod.js')
} else {
  module.exports = require('./dist/symbol.cjs.js')
}
