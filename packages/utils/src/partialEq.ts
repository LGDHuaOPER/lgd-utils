/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:19:44
 * @LastEditTime: 2021-09-08 10:19:44
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\partialEq.ts
 */

import * as _ from 'lodash-es'

/**
 * @param partialArg - _.eq()的预设的参数
 * @returns 返回预设参数的函数
 * @typeReturns boolean
 */
export default function partialEq(partialArg?: unknown): (val: unknown) => boolean {
  // return _.wrap(_.eq, function(func, val) {
  //   return func(v, val)
  // })
  return _.partial(_.eq, partialArg)
}
