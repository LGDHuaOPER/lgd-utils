/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 23:20:29
 * @LastEditTime: 2021-09-19 12:05:48
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\sortProps.ts
 */

import lodashIsFunction from 'lodash/isFunction'
import lodashIsPlainObject from 'lodash/isPlainObject'
import lodashTrim from 'lodash/trim'

export default function sortProps(
  object?: Record<string, unknown> | unknown,
  sortedFn?: (a: unknown, b: unknown) => number,
): Array<string> {
  if (lodashIsPlainObject(object) && lodashIsFunction(sortedFn)) {
    const numberKeys: Array<string> = []
    const stringKeys: Array<string> = []
    Object.keys(object as Record<string, unknown>).forEach((key) => {
      if (lodashTrim(key) === '' || isNaN(+key)) {
        stringKeys.push(key)
      } else {
        numberKeys.push(key)
      }
    })
    numberKeys.sort(sortedFn)
    stringKeys.sort(sortedFn)

    return numberKeys.concat(stringKeys)
  } else {
    return lodashIsPlainObject(object) ? Object.keys(object as Record<string, unknown>).sort() : []
  }
}
