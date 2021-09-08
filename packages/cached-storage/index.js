/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-02 01:38:12
 * @LastEditTime: 2021-09-05 20:55:12
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\cached-storage\index.js
 */

'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/cached-storage.cjs.prod.js')
} else {
  module.exports = require('./dist/cached-storage.cjs.js')
}
