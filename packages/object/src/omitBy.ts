/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-25 22:06:30
 * @LastEditTime: 2021-09-25 22:19:30
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\omitBy.ts
 */

import lodashEq from 'lodash/eq'
import lodashIsFunction from 'lodash/isFunction'
import lodashIsRegExp from 'lodash/isRegExp'
import lodashIsString from 'lodash/isString'
import lodashOmitBy from 'lodash/omitBy'

export default function omitBy(
  object?: unknown,
  predicate?: unknown,
  inheritedPredicate?: unknown,
): Record<string, unknown> {
  const fn = (predicate: unknown, v: unknown, k: string) => {
    if (lodashIsFunction(predicate)) return predicate(v, k)
    if (Array.isArray(predicate)) return predicate.includes(k)
    if (lodashIsString(predicate)) return predicate === k
    if (lodashIsRegExp(predicate)) return predicate.test(k)
    return lodashEq(predicate, v)
  }
  if (inheritedPredicate === void 0 || inheritedPredicate === true) inheritedPredicate = predicate

  return lodashOmitBy(object as Record<string, unknown>, (v, k) => {
    if (Object.prototype.hasOwnProperty.call(object, k)) return fn(predicate, v, k)
    return fn(inheritedPredicate, v, k)
  })
}
