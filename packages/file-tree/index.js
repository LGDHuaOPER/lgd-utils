/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-02 01:38:12
 * @LastEditTime: 2022-01-12 19:03:29
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/file-tree/index.js
 */

'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/file-tree.cjs.prod.js')
} else {
  module.exports = require('./dist/file-tree.cjs.js')
}
