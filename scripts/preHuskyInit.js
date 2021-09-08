/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-06 17:48:47
 * @LastEditTime: 2021-09-06 18:06:44
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\scripts\preHuskyInit.js
 */

const fs = require('fs-extra')
const path = require('path')

if (
  fs.existsSync(path.resolve(__dirname, '../.husky/_/.gitignore')) &&
  fs.existsSync(path.resolve(__dirname, '../.husky/_/husky.sh'))
) {
  fs.copySync(
    path.resolve(__dirname, '../.husky/_/.gitignore'),
    path.resolve(__dirname, '../.husky/_/.gitignore.backup'),
  )
  fs.copySync(path.resolve(__dirname, '../.husky/_/husky.sh'), path.resolve(__dirname, '../.husky/_/husky.sh.backup'))
}
