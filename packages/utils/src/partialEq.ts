/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:19:44
 * @LastEditTime: 2021-09-09 22:00:52
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\partialEq.ts
 */

import lodashEq from 'lodash/eq'
import lodashPartial from 'lodash/partial'

/**
 * @param partialArg - lodashEq()的预设的参数
 * @returns 返回预设参数的函数
 * @typeReturns boolean
 */
export default function partialEq(partialArg?: unknown): (val: unknown) => boolean {
  // return lodashWrap(lodashEq, function(func, val) {
  //   return func(v, val)
  // })
  return lodashPartial(lodashEq, partialArg)
}
