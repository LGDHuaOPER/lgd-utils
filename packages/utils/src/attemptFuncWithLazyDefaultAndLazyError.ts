/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:18:37
 * @LastEditTime: 2021-11-18 15:29:10
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\attemptFuncWithLazyDefaultAndLazyError.ts
 */

import lodashIsError from 'lodash/isError'
import lodashIsFunction from 'lodash/isFunction'

import attemptFuncWithLazyDefault from './attemptFuncWithLazyDefault'

/**
 * @param func - 要尝试调用的函数
 * @param defaultV - 默认值
 * @param errorDefault - 尝试调用的函数出错时的默认值
 * @param args - 调用func时，传递的参数
 * @typeParam func - ((...args: unknown[]) =\> unknown) | unknown | undefined
 * @typeParam defaultV - (() =\> unknown) | undefined
 * @typeParam errorDefault - (() =\> unknown) | undefined
 * @typeParam args - unknown[]
 * @returns 返回func结果或者出错时的默认值或者func - unknown
 */
export default function attemptFuncWithLazyDefaultAndLazyError(
  func?: ((...args: unknown[]) => unknown) | unknown,
  defaultV?: () => unknown,
  errorDefault?: () => unknown,
  ...args: unknown[]
): unknown {
  const result = attemptFuncWithLazyDefault(func, defaultV, ...args)
  return lodashIsError(result) ? (lodashIsFunction(errorDefault) ? errorDefault() : errorDefault) : result
}
