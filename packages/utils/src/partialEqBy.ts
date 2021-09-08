/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:20:55
 * @LastEditTime: 2021-09-08 10:20:56
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\partialEqBy.ts
 */

import * as _ from 'lodash-es'

import partialEq from './partialEq'

/**
 * @param partialArg - _.eq()的预设的参数
 * @param iteratee - 迭代函数
 * @returns 返回预设参数的函数
 * @typeReturns (val: unknown) =\> boolean
 */
export default function partialEqBy(
  partialArg?: unknown,
  iteratee?: (val: unknown) => unknown,
): (val: unknown) => boolean {
  if (!_.isFunction(iteratee)) return partialEq(partialArg)
  return _.wrap(_.eq, function (func: (val: unknown, other: unknown) => boolean, val: unknown) {
    return func(partialArg, (iteratee as (val: unknown) => unknown)(val))
  })
}
