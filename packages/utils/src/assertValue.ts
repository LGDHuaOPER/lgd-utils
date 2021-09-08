/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:24:31
 * @LastEditTime: 2021-09-08 10:24:32
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\assertValue.ts
 */

import * as _ from 'lodash-es'

/**
 * @param value - 要检查的值
 * @param assertion - 断言模式
 * @returns 是否与断言模式匹配
 * @typeReturns boolean
 */
export default function assertValue(
  value?: unknown,
  assertion?: unknown[] | Record<string, unknown> | RegExp | ((val: unknown) => boolean) | unknown,
): boolean {
  if (Array.isArray(assertion)) return assertion.some((v: unknown) => assertValue(value, v))
  if (_.isPlainObject(assertion))
    return Object.keys(assertion as Record<string, unknown>).every((k) =>
      assertValue(value, (assertion as Record<string, unknown>)[k]),
    )
  if (_.isRegExp(assertion)) return (assertion as RegExp).test(value as string)
  if (_.isFunction(assertion)) return (assertion as (val: unknown) => boolean)(value)
  return assertion === value
}
