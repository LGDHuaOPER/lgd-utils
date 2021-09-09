/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:26:09
 * @LastEditTime: 2021-09-09 22:03:03
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\promiseSeries.ts
 */

import attemptFuncWithDefaultAndError from './attemptFuncWithDefaultAndError'
import lodashIsFunction from 'lodash/isFunction'

/**
 * @param  promiseFnList - 返回 promise 的函数数组
 * @param thisArg - 绑定的this对象
 * @param successCb - 成功回调
 * @param errorCb - 失败回调
 * @returns promise
 * @typeReturns Promise<unknown>
 */
export default function promiseSeries(
  promiseFnList?: Array<(args: unknown[]) => Promise<unknown>>,
  thisArg?: unknown,
  successCb?: (val: unknown) => unknown,
  errorCb?: (val: unknown) => unknown,
): Promise<unknown> {
  if (!Array.isArray(promiseFnList)) promiseFnList = []
  promiseFnList = promiseFnList.map((_promiseFn) => {
    if (lodashIsFunction(_promiseFn)) return _promiseFn
    return function () {
      return Promise.resolve(_promiseFn)
    }
  })
  async function main() {
    const dataList = []
    for (let i = 0; i < (promiseFnList as Array<(args: unknown[]) => Promise<unknown>>).length; i++) {
      try {
        const data: unknown = await (thisArg === void 0
          ? (promiseFnList as Array<(args: unknown[]) => Promise<unknown>>)[i]([...dataList])
          : (promiseFnList as Array<(args: unknown[]) => Promise<unknown>>)[i].call(thisArg, [...dataList]))
        dataList.push(data)
      } catch (e) {
        return Promise.reject(e)
      }
    }

    return dataList
  }

  if (lodashIsFunction(successCb) || lodashIsFunction(errorCb)) {
    return main()
      .then((value) => {
        return attemptFuncWithDefaultAndError(successCb, value, value, value)
      })
      .catch((reason) => {
        return attemptFuncWithDefaultAndError(errorCb, reason, reason, reason)
      })
  }

  return main()
}
