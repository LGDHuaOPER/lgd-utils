/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-02 01:38:12
 * @LastEditTime: 2021-09-26 22:01:18
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\collection\index.js
 */

'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/collection.cjs.prod.js')
} else {
  module.exports = require('./dist/collection.cjs.js')
}
