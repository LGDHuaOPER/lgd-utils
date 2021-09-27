/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-27 10:13:40
 * @LastEditTime: 2021-09-27 11:00:48
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\regexp\src\nodeModuleScopePath.ts
 */

import lodashEscapeRegExp from 'lodash/escapeRegExp'
import lodashIsString from 'lodash/isString'

export default function nodeModuleScopePath(scope: string, packageName: string, suffix?: number | string): RegExp {
  if (!lodashIsString(scope)) scope = ``
  if (!lodashIsString(packageName)) packageName = ``
  switch (suffix) {
    case 0:
      suffix = ``
      break
    case 1:
      suffix = `[\\\\/]`
      break
    case 2:
      suffix = `[\\\\/]dist`
      break
    case 3:
      suffix = `[\\\\/]dist[\\\\/]`
      break
    default:
      void 0
  }
  if (!lodashIsString(suffix)) suffix = `[\\\\/]dist[\\\\/]`

  return new RegExp(
    `[\\\\/]node_modules[\\\\/]_?@${lodashEscapeRegExp(scope)}(_${lodashEscapeRegExp(
      packageName,
    )}[A-Za-z0-9_@.-]+@@${lodashEscapeRegExp(scope)})?[\\\\/]${lodashEscapeRegExp(packageName)}${suffix}`,
  )
}
