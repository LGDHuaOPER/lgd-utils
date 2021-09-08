/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-06 17:48:47
 * @LastEditTime: 2021-09-06 18:07:57
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\scripts\postHuskyInit.js
 */

const fs = require('fs-extra')
const path = require('path')

if (
  fs.existsSync(path.resolve(__dirname, '../.husky/_/.gitignore.backup')) &&
  fs.existsSync(path.resolve(__dirname, '../.husky/_/husky.sh.backup'))
) {
  fs.moveSync(
    path.resolve(__dirname, '../.husky/_/.gitignore.backup'),
    path.resolve(__dirname, '../.husky/_/.gitignore'),
    {
      overwrite: true,
    },
  )
  fs.moveSync(path.resolve(__dirname, '../.husky/_/husky.sh.backup'), path.resolve(__dirname, '../.husky/_/husky.sh'), {
    overwrite: true,
  })
}
