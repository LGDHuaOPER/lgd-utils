/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:13:12
 * @LastEditTime: 2021-09-10 20:43:04
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\attemptFunc.ts
 */

import lodashAttempt from 'lodash/attempt'
import lodashIsFunction from 'lodash/isFunction'

/**
 * @param func - 要尝试调用的函数
 * @param args - 调用 func 时，传递的参数
 * @typeParam func - ((...args: unknown[]) =\> unknown) | undefined
 * @typeParam args - unknown[]
 * @returns 返回 func 调用结果或者错误对象或者 func
 * @typeReturns unknown
 */
export default function attemptFunc(func?: ((...args: unknown[]) => unknown) | unknown, ...args: unknown[]): unknown {
  return lodashIsFunction(func) ? lodashAttempt(func, ...args) : func
}
