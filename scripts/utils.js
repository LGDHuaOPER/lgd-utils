/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 20:20:56
 * @LastEditTime: 2022-01-12 19:08:01
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/scripts/utils.js
 */

const chalk = require('chalk')
const fs = require('fs')

const targets = (exports.targets = fs.readdirSync('packages').filter((f) => {
  if (!fs.statSync(`packages/${f}`).isDirectory()) {
    return false
  }
  const pkg = require(`../packages/${f}/package.json`)
  // 如果 disable build，则不进行 build
  if (pkg.__lgd_utils__disable_build === true) return false
  if (pkg.private && !pkg.buildOptions) {
    return false
  }
  return true
}))

exports.fuzzyMatchTarget = (partialTargets, includeAllMatching) => {
  const matched = []
  partialTargets.forEach((partialTarget) => {
    for (const target of targets) {
      if (target.match(partialTarget)) {
        matched.push(target)
        if (!includeAllMatching) {
          break
        }
      }
    }
  })
  if (matched.length) {
    return matched
  } else {
    console.log()
    console.error(
      `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`Target ${chalk.underline(partialTargets)} not found!`)}`,
    )
    console.log()

    process.exit(1)
  }
}
