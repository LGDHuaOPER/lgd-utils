/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 23:21:39
 * @LastEditTime: 2021-09-18 23:25:01
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\sortObjectByProp.ts
 */

import lodashIsPlainObject from 'lodash/isPlainObject'
import sortProps from './sortProps'

export default function sortObjectByProp(
  object?: Record<string, unknown> | unknown,
  sortedFn?: (a: unknown, b: unknown) => number,
): Record<string, unknown> {
  if (!lodashIsPlainObject(object)) return {}

  const returnV = Object.create(object as Record<string, unknown>)
  sortProps(object, sortedFn).forEach((key) => {
    const value = (object as Record<string, unknown>)[key]
    returnV[key] = lodashIsPlainObject(value) ? sortObjectByProp(value, sortedFn) : value
  })

  return returnV
}
