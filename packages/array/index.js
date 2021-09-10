/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-02 01:38:12
 * @LastEditTime: 2021-09-10 20:19:27
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\array\index.js
 */

'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/array.cjs.prod.js')
} else {
  module.exports = require('./dist/array.cjs.js')
}
