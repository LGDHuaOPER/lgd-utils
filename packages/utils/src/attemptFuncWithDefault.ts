/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:17:45
 * @LastEditTime: 2021-11-18 15:13:58
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
 * @typeParam func - ((...args: unknown[]) =\> unknown) | unknown | undefined
 * @typeParam defaultV - unknown | undefined
 * @typeParam args - unknown[]
 * @returns 返回func结果或者出错时的默认值或者func - unknown
 */
export default function attemptFuncWithDefault(
  func?: ((...args: unknown[]) => unknown) | unknown,
  defaultV?: unknown,
  ...args: unknown[]
): unknown {
  return lodashIsFunction(func) ? lodashAttempt(func, ...args) : defaultV
}
