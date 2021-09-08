/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:27:04
 * @LastEditTime: 2021-09-08 10:28:13
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\typeDefaultTo.ts
 */

import * as _ from 'lodash-es'

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
    assertTypes = _.isUndefined,
    assertEq = _.eq,
    negate = false,
  }: {
    assertTypes?:
      | Array<RegExp | string | ((val: unknown) => boolean) | unknown>
      | RegExp
      | string
      | ((val: unknown) => boolean)
      | unknown
    assertEq?: (val: unknown, otherVal: unknown) => boolean
    negate?: boolean
  } = {},
): unknown {
  if (!_.isFunction(assertEq)) assertEq = _.eq

  let _negate = negate
  if (_.isFunction(_negate)) _negate = _negate(value, defaultValue)
  if (!_.isBoolean(_negate)) _negate = false

  const fn = (assertTypes: RegExp | string | ((val: unknown) => boolean) | unknown) => {
    if (_.isString(assertTypes)) {
      switch (_.toUpper(assertTypes)) {
        case 'UNDEFINED':
          return _.isUndefined
        case 'NULL':
          return _.isNull
        case 'STRING':
          return _.isString
        case 'BOOLEAN':
          return _.isBoolean
        case 'NUMBER':
          return _.isNumber
        case 'ARRAY':
          return Array.isArray
        case 'EMPTY':
          return _.isEmpty
        case 'ERROR':
          return _.isError
        case 'FUNCTION':
          return _.isFunction
        case 'NAN':
          return _.isNaN
        case 'NIL':
          return _.isNil
        case 'PLAINOBJECT':
          return _.isPlainObject
        case 'REGEXP':
          return _.isRegExp
        default:
          void 0
      }
    }
    if (_.isRegExp(assertTypes)) {
      const _assertTypes = assertTypes
      return (value: number | string) => regexpTest(_assertTypes, value)
    }
    if (!_.isFunction(assertTypes)) {
      const _assertTypes = assertTypes
      return (value: unknown) => assertEq(value, _assertTypes)
    }

    return assertTypes
  }

  if (Array.isArray(assertTypes)) {
    assertTypes = _.overSome(assertTypes.map((_assertType) => fn(_assertType)))
  } else if (_.isPlainObject(assertTypes)) {
    assertTypes = _.overEvery(
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

  return assertResult ? (_.isUndefined(defaultValue) ? value : defaultValue) : value
}
