/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-11-25 11:15:54
 * @LastEditTime: 2021-11-25 14:07:17
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\assertTypes.ts
 */

import lodashEq from 'lodash/eq'
import lodashIsBoolean from 'lodash/isBoolean'
import lodashGet from 'lodash/get'
import lodashIsEmpty from 'lodash/isEmpty'
import lodashIsError from 'lodash/isError'
import lodashIsFunction from 'lodash/isFunction'
import lodashIsNaN from 'lodash/isNaN'
import lodashIsNil from 'lodash/isNil'
import lodashIsNull from 'lodash/isNull'
import lodashIsNumber from 'lodash/isNumber'
import lodashIsPlainObject from 'lodash/isPlainObject'
import lodashIsRegExp from 'lodash/isRegExp'
import lodashIsString from 'lodash/isString'
import lodashIsUndefined from 'lodash/isUndefined'
import lodashOverEvery from 'lodash/overEvery'
import lodashOverSome from 'lodash/overSome'
import lodashToUpper from 'lodash/toUpper'
import { test } from '@lgd-utils/regexp'

/**
 * @param value - 要检查的值
 * @param types - 断言类型
 * @param options - 配置
 * @param assertEq - options.assertEq: 自定义的 eq 行为
 * @typeParam value - unknown | undefined
 * @typeParam types -
    | RegExp
    | string
    | ((val?: unknown) =\> boolean)
    | unknown
    | Array\<RegExp | string | ((val?: unknown) =\> boolean) | unknown | undefined\>
    | Record\<string, RegExp | string | ((val?: unknown) =\> boolean) | unknown | undefined\>
    | undefined
 * @typeParam options - \{
    assertEq?: (val?: unknown, otherVal?: unknown) =\> boolean
  \}
 * @returns 是否与断言类型匹配 - boolean
 */
export default function assertTypes(
  value?: unknown,
  types?:
    | RegExp
    | string
    | ((val?: unknown) => boolean)
    | unknown
    | Array<RegExp | string | ((val?: unknown) => boolean) | unknown | undefined>
    | Record<string, RegExp | string | ((val?: unknown) => boolean) | unknown | undefined>,
  options?: {
    assertEq?: (val?: unknown, otherVal?: unknown) => boolean
  },
): boolean {
  const assertEq = lodashIsFunction(lodashGet(options, 'assertEq')) ? lodashGet(options, 'assertEq') : lodashEq
  const fn = (types?: RegExp | string | ((val?: unknown) => boolean) | unknown) => {
    if (lodashIsFunction(types)) {
      return types
    }
    if (lodashIsRegExp(types)) {
      const _types = types
      return (value?: number | string) => test(_types, value)
    }
    if (lodashIsString(types)) {
      switch (lodashToUpper(types)) {
        case 'UNDEFINED':
          return lodashIsUndefined
        case 'NULL':
          return lodashIsNull
        case 'STRING':
          return lodashIsString
        case 'BOOLEAN':
          return lodashIsBoolean
        case 'NUMBER':
          return lodashIsNumber
        case 'ARRAY':
          return Array.isArray
        case 'EMPTY':
          return lodashIsEmpty
        case 'ERROR':
          return lodashIsError
        case 'FUNCTION':
          return lodashIsFunction
        case 'NAN':
          return lodashIsNaN
        case 'NIL':
          return lodashIsNil
        case 'PLAINOBJECT':
          return lodashIsPlainObject
        case 'REGEXP':
          return lodashIsRegExp
        default:
          void 0
      }
    }

    return (value?: unknown) => (assertEq as (val?: unknown, otherVal?: unknown) => boolean)(value, types)
  }

  if (Array.isArray(types)) {
    return lodashOverSome(types.map((_type) => fn(_type)))(value)
  }

  if (lodashIsPlainObject(types)) {
    return lodashOverEvery(
      Object.values(types as Record<string, RegExp | string | ((val?: unknown) => boolean) | unknown | undefined>).map(
        (_type) => fn(_type),
      ),
    )(value)
  }

  return fn(types)(value)
}
