/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:24:31
 * @LastEditTime: 2021-11-25 13:59:21
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\assertValue.ts
 */

import lodashIsFunction from 'lodash/isFunction'
import lodashIsPlainObject from 'lodash/isPlainObject'
import lodashIsRegExp from 'lodash/isRegExp'

/**
 * @param value - 要检查的值
 * @param assertion - 断言模式
 * @typeParam value - unknown | undefined
 * @typeParam assertion - unknown[] | Record\<string, unknown\> | RegExp | ((val: unknown) =\> boolean) | unknown | undefined
 * @returns 是否与断言模式匹配 - boolean
 */
export default function assertValue(
  value?: unknown,
  assertion?: unknown[] | Record<string, unknown> | RegExp | ((val?: unknown) => boolean) | unknown,
): boolean {
  if (Array.isArray(assertion)) return assertion.some((v?: unknown) => assertValue(value, v))
  if (lodashIsPlainObject(assertion))
    return Object.keys(assertion as Record<string, unknown>).every((k) =>
      assertValue(value, (assertion as Record<string, unknown>)[k]),
    )
  if (lodashIsRegExp(assertion)) return (assertion as RegExp).test(value as string)
  if (lodashIsFunction(assertion)) return (assertion as (val?: unknown) => boolean)(value)
  return assertion === value
}
