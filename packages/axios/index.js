/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-02 01:38:12
 * @LastEditTime: 2021-10-21 13:57:08
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\index.js
 */

'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/axios.cjs.prod.js')
} else {
  module.exports = require('./dist/axios.cjs.js')
}
