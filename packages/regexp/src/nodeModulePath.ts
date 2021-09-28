/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-27 10:13:40
 * @LastEditTime: 2021-09-28 14:23:52
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\regexp\src\nodeModulePath.ts
 */

import lodashEscapeRegExp from 'lodash/escapeRegExp'
import lodashIsString from 'lodash/isString'

/**
 * @remarks
 * 生成 node_modules 内单个包的正则表达式
 *
 * @param packageName - 单个包名
 * @param suffix - 后缀
 * @typeParam packageName - string
 * @typeParam suffix - number | string | undefined
 * @returns 生成的正则表达式 - RegExp
 */
export default function nodeModulePath(packageName: string, suffix?: number | string): RegExp {
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
    `[\\\\/]node_modules[\\\\/]_?${lodashEscapeRegExp(packageName)}([A-Za-z0-9_@.-]+@${lodashEscapeRegExp(
      packageName,
    )})?${suffix}`,
  )
}
