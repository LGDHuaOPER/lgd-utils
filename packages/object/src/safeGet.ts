/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-25 23:57:45
 * @LastEditTime: 2021-09-27 20:19:24
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\safeGet.ts
 */

import lodashGet from 'lodash/get'
import lodashIsString from 'lodash/isString'
import lodashToPath from 'lodash/toPath'

export default function safeGet(
  object?: unknown,
  path?: number | string | Array<number | string>,
  defaultValue?: unknown,
): unknown {
  if (!lodashIsString(path) && !Array.isArray(path)) return defaultValue

  if (lodashIsString(path)) {
    if (path.trim() === '') return defaultValue

    const pathArr = lodashToPath(path).filter(Boolean)
    if (pathArr.length > 1) path = [path]
  }

  return lodashGet(object, path, defaultValue)
}
