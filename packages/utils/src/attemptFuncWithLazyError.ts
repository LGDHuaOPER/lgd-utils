/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:15:37
 * @LastEditTime: 2021-11-18 15:27:48
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\attemptFuncWithLazyError.ts
 */

import lodashIsError from 'lodash/isError'
import lodashIsFunction from 'lodash/isFunction'

import attemptFunc from './attemptFunc'

/**
 * @param func - 要尝试调用的函数
 * @param errorDefault - 尝试调用的函数出错时的默认值
 * @param args - 调用func时，传递的参数
 * @typeParam func - ((...args: unknown[]) =\> unknown) | unknown | undefined
 * @typeParam errorDefault - unknown | undefined
 * @typeParam args - unknown[]
 * @returns 返回func结果或者出错时的默认值或者func - unknown
 */
export default function attemptFuncWithLazyError(
  func?: ((...args: unknown[]) => unknown) | unknown,
  errorDefault?: unknown,
  ...args: unknown[]
): unknown {
  const result = attemptFunc(func, ...args)
  return lodashIsError(result) ? (lodashIsFunction(errorDefault) ? errorDefault() : errorDefault) : result
}
