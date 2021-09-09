/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:17:45
 * @LastEditTime: 2021-09-09 21:57:12
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\attemptFuncWithDefault.ts
 */

import lodashAttempt from 'lodash/attempt'
import lodashIsFunction from 'lodash/isFunction'

/**
 * @param func - 要尝试调用的函数
 * @param defaultV - 默认值
 * @param args - 调用func时，传递的参数
 * @returns result - 返回func结果或者出错时的默认值或者func
 * @typeReturns unknown
 */
export default function attemptFuncWithDefault(
  func?: (...args: unknown[]) => unknown,
  defaultV?: unknown,
  ...args: unknown[]
): unknown {
  return lodashIsFunction(func) ? lodashAttempt(func, ...args) : defaultV
}
