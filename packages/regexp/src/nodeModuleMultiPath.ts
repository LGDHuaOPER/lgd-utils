/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-27 10:13:40
 * @LastEditTime: 2021-09-27 15:42:05
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\regexp\src\nodeModuleMultiPath.ts
 */

import lodashEscapeRegExp from 'lodash/escapeRegExp'
import lodashIsString from 'lodash/isString'
import lodashTrim from 'lodash/trim'
import { validNonemptyString } from '@lgd-utils/validate'

export default function nodeModuleMultiPath(packageNames: string | string[], suffix?: number | string): RegExp {
  if (!lodashIsString(packageNames) && !Array.isArray(packageNames)) packageNames = ``
  const _packageNames = lodashIsString(packageNames) ? (packageNames as string).split('|') : packageNames
  const escapeRegExpPackageNames = _packageNames
    .filter((_packageName) => validNonemptyString(_packageName, lodashTrim))
    .map((_packageName) => lodashEscapeRegExp(_packageName))

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
    `[\\\\/]node_modules[\\\\/]_?(${escapeRegExpPackageNames.join(
      '|',
    )})([A-Za-z0-9_@.-]+@(${escapeRegExpPackageNames.join('|')}))?${suffix}`,
  )
}
