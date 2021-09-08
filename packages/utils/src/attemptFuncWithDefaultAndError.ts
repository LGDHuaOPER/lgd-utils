/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:18:37
 * @LastEditTime: 2021-09-08 10:18:37
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\attemptFuncWithDefaultAndError.ts
 */

import * as _ from 'lodash-es'

import attemptFuncWithDefault from './attemptFuncWithDefault'

/**
 * @param func - 要尝试调用的函数
 * @param defaultV - 默认值
 * @param errorDefault - 尝试调用的函数出错时的默认值
 * @param args - 调用func时，传递的参数
 * @returns 返回func结果或者出错时的默认值或者func
 * @typeReturns unknown
 */
export default function attemptFuncWithDefaultAndError(
  func?: (...args: unknown[]) => unknown,
  defaultV?: unknown,
  errorDefault?: unknown,
  ...args: unknown[]
): unknown {
  const result = attemptFuncWithDefault(func, defaultV, ...args)
  return _.isError(result) ? errorDefault : result
}
