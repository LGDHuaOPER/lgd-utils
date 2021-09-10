/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-06-23 17:36:30
 * @LastEditTime: 2021-09-10 21:04:50
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\array\src\reduceWrap.ts
 */

import { attemptFuncWithError, undefinedTo } from '@lgd-utils/utils'

import lodashIsFunction from 'lodash/isFunction'
import lodashNthArg from 'lodash/nthArg'

/**
 * @remarks
 * 以特定的约束条件迭代执行某逻辑，获取结果
 *
 * @param value - 要迭代的数组
 * @param reduceBy - 迭代的方式
 * @param reduceWhile - 什么时候进行迭代
 * @param initialValue - 初始值
 * @typeParam value - any
 * @typeParam reduceBy - any
 * @typeParam reduceWhile - any
 * @typeParam initialValue - any
 * @returns result - 返回迭代的结果
 */
export default function reduceWrap(
  value?: unknown,
  reduceBy?: ((result?: unknown, v?: unknown, i?: number, arr?: unknown[]) => unknown) | unknown,
  reduceWhile?: unknown,
  initialValue?: unknown,
): unknown {
  if (!Array.isArray(value)) return undefinedTo(initialValue, value)
  if (!lodashIsFunction(reduceBy)) reduceBy = lodashNthArg(1)

  let result = initialValue
  value.some((v, i, arr) => {
    const _result = (reduceBy as (result: unknown, v: unknown, i: number, arr: unknown[]) => unknown)(result, v, i, arr)
    result = _result
    return !attemptFuncWithError(reduceWhile, false, _result, v, i, arr)
  })

  return result
}
