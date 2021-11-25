/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:27:04
 * @LastEditTime: 2021-11-25 12:10:23
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\typeDefaultTo.ts
 */

import lodashIsBoolean from 'lodash/isBoolean'
import lodashIsFunction from 'lodash/isFunction'
import lodashIsUndefined from 'lodash/isUndefined'

import assertTypes from './assertTypes'

/**
 * @param value - 要检查的值
 * @param defaultValue - 默认值
 * @param options - 配置
 * @param assertTypes - options.assertTypes: 断言类型，兼容老版本，推荐使用 options.types
 * @param assertTypesOptions - options.assertTypesOptions: 使用默认断言类型方法的 options
 * @param negate - options.negate: 是否对结果进行取反
 * @param types - options.types: 断言类型
 * @typeParam value - unknown | undefined
 * @typeParam defaultValue - unknown | undefined
 * @typeParam options - \{
    assertTypes?: Parameters\<typeof assertTypes\>[1]
    assertTypesOptions?: Parameters\<typeof assertTypes\>[2]
    negate?: boolean | ((value?: unknown, defaultValue?: unknown) =\> boolean) | unknown
    types?: Parameters\<typeof assertTypes\>[1]
  \}
 * @returns result - unknown
 */
export default function typeDefaultTo(
  value?: unknown,
  defaultValue?: unknown,
  {
    assertTypes: _assertTypes,
    assertTypesOptions,
    negate = false,
    types,
  }: {
    assertTypes?: Parameters<typeof assertTypes>[1]
    assertTypesOptions?: Parameters<typeof assertTypes>[2]
    negate?: boolean | ((value?: unknown, defaultValue?: unknown) => boolean) | unknown
    types?: Parameters<typeof assertTypes>[1]
  } = {},
): unknown {
  let _negate = negate
  if (lodashIsFunction(_negate)) {
    ;(_negate as unknown) = (_negate as (value?: unknown, defaultValue?: unknown) => boolean | unknown)(
      value,
      defaultValue,
    )
  }
  if (!lodashIsBoolean(_negate)) _negate = false

  const _types = lodashIsUndefined(types) ? (lodashIsUndefined(_assertTypes) ? lodashIsUndefined : _assertTypes) : types

  const assertResult = _negate
    ? !assertTypes(value, _types, assertTypesOptions)
    : assertTypes(value, _types, assertTypesOptions)

  return assertResult ? (lodashIsUndefined(defaultValue) ? value : defaultValue) : value
}
