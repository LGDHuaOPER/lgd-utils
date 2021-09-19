/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:30:23
 * @LastEditTime: 2021-09-19 14:40:16
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\omitDeepBy.ts
 */

import { validEmptyObject, validToStringObject } from '@lgd-utils/validate'

import lodashEq from 'lodash/eq'
import lodashForIn from 'lodash/forIn'
import lodashIdentity from 'lodash/identity'
import lodashIsEmpty from 'lodash/isEmpty'
import lodashIsFunction from 'lodash/isFunction'
import lodashIsString from 'lodash/isString'
import omitDeepByNamespace from '../types/omitDeepBy.d'

export default function omitDeepBy(
  object?: unknown,
  predicate?: ((v: unknown, k: string) => boolean) | Array<unknown> | string | unknown,
  inheritedPredicate: ((v: unknown, k: string) => boolean) | Array<unknown> | string | unknown | boolean = true,
  {
    assertObject = validToStringObject,
    enableEmptyObject = true,
    validEmptyObjectIteratee = lodashIdentity,
    assertEmpty = lodashIsEmpty,
  } = {},
): Record<string, unknown> {
  if (!lodashIsFunction(assertObject)) assertObject = validToStringObject
  if (!assertObject(object)) return {}
  if (!lodashIsFunction(validEmptyObjectIteratee)) validEmptyObjectIteratee = lodashIdentity
  if (!lodashIsFunction(assertEmpty)) assertEmpty = lodashIsEmpty
  if (inheritedPredicate === true) inheritedPredicate = predicate

  const omittedObject: Record<string, unknown> = {}
  const assertOmit = (
    predicate: ((v: unknown, k: string) => boolean) | Array<unknown> | string | unknown,
    v: unknown,
    k: string,
  ) => {
    if (lodashIsFunction(predicate)) return predicate(v, k)
    if (Array.isArray(predicate)) return predicate.includes(k)
    if (lodashIsString(predicate)) return predicate === k
    return lodashEq(predicate, v)
  }
  const fn = (
    usingPredicate: ((v: unknown, k: string) => boolean) | Array<unknown> | string | unknown,
    v: unknown,
    k: string,
    omittedObject: Record<string, unknown>,
    omitDeepBy: omitDeepByNamespace.omitDeepBy,
    predicate: ((v: unknown, k: string) => boolean) | Array<unknown> | string | unknown,
    inheritedPredicate: ((v: unknown, k: string) => boolean) | Array<unknown> | string | unknown,
  ) => {
    if (assertOmit(usingPredicate, v, k)) return true
    if (assertObject(v)) {
      const temp = omitDeepBy(v, predicate, inheritedPredicate)
      if (validEmptyObject(temp, validEmptyObjectIteratee, { assertObject, assertEmpty })) {
        if (enableEmptyObject) {
          omittedObject[k] = temp
        }
        return true
      }

      omittedObject[k] = temp
      return true
    }
    omittedObject[k] = v
    return true
  }
  lodashForIn(object, (v, k) =>
    fn(
      Object.prototype.hasOwnProperty.call(object, k) ? predicate : inheritedPredicate,
      v,
      k,
      omittedObject,
      omitDeepBy,
      predicate,
      inheritedPredicate,
    ),
  )

  return omittedObject
}
