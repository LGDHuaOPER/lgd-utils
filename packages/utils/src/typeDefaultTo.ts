/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:27:04
 * @LastEditTime: 2021-09-10 23:28:09
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\typeDefaultTo.ts
 */

import lodashEq from 'lodash/eq'
import lodashIsBoolean from 'lodash/isBoolean'
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
import regexpTest from './regexpTest'

/**
 * @param value - 要检查的值
 * @param defaultValue - 默认值
 * @param options - 配置
 * @param assertTypes - options.assertTypes: 断言类型
 * @param assertEq - options.assertEq: 断言 eq 模式
 * @returns result
 * @typeReturns unknown
 */
export default function typeDefaultTo(
  value?: unknown,
  defaultValue?: unknown,
  {
    assertTypes = lodashIsUndefined,
    assertEq = lodashEq,
    negate = false,
  }: {
    assertTypes?:
      | Array<RegExp | string | ((val: unknown) => boolean) | unknown>
      | RegExp
      | string
      | ((val: unknown) => boolean)
      | unknown
    assertEq?: ((val: unknown, otherVal: unknown) => boolean) | unknown
    negate?: boolean | ((value?: unknown, defaultValue?: unknown) => boolean) | unknown
  } = {},
): unknown {
  if (!lodashIsFunction(assertEq)) assertEq = lodashEq

  let _negate = negate
  if (lodashIsFunction(_negate)) {
    ;(_negate as unknown) = (_negate as (value?: unknown, defaultValue?: unknown) => boolean | unknown)(
      value,
      defaultValue,
    )
  }
  if (!lodashIsBoolean(_negate)) _negate = false

  const fn = (assertTypes: RegExp | string | ((val: unknown) => boolean) | unknown) => {
    if (lodashIsString(assertTypes)) {
      switch (lodashToUpper(assertTypes)) {
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
    if (lodashIsRegExp(assertTypes)) {
      const _assertTypes = assertTypes
      return (value: number | string) => regexpTest(_assertTypes, value)
    }
    if (!lodashIsFunction(assertTypes)) {
      const _assertTypes = assertTypes
      return (value: unknown) => (assertEq as (val: unknown, otherVal: unknown) => boolean)(value, _assertTypes)
    }

    return assertTypes
  }

  if (Array.isArray(assertTypes)) {
    assertTypes = lodashOverSome(assertTypes.map((_assertType) => fn(_assertType)))
  } else if (lodashIsPlainObject(assertTypes)) {
    assertTypes = lodashOverEvery(
      Object.values(assertTypes as Array<RegExp | string | ((val: unknown) => boolean) | unknown>).map((_assertType) =>
        fn(_assertType),
      ),
    )
  } else {
    assertTypes = fn(assertTypes)
  }

  const assertResult = _negate
    ? !(assertTypes as (val: unknown) => boolean)(value)
    : (assertTypes as (val: unknown) => boolean)(value)

  return assertResult ? (lodashIsUndefined(defaultValue) ? value : defaultValue) : value
}
