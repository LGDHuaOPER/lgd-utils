/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:15:37
 * @LastEditTime: 2021-09-10 20:43:57
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\attemptFuncWithError.ts
 */

import attemptFunc from './attemptFunc'
import lodashIsError from 'lodash/isError'

/**
 * @param func - 要尝试调用的函数
 * @param errorDefault - 尝试调用的函数出错时的默认值
 * @param args - 调用func时，传递的参数
 * @returns 返回func结果或者出错时的默认值或者func
 * @typeReturns unknown
 */
export default function attemptFuncWithError(
  func?: ((...args: unknown[]) => unknown) | unknown,
  errorDefault?: unknown,
  ...args: unknown[]
): unknown {
  const result = attemptFunc(func, ...args)
  return lodashIsError(result) ? errorDefault : result
}
