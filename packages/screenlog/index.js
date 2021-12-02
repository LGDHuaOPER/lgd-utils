/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-02 01:38:12
 * @LastEditTime: 2021-12-02 09:33:40
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\screenlog\index.js
 */

'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/screenlog.cjs.prod.js')
} else {
  module.exports = require('./dist/screenlog.cjs.js')
}
