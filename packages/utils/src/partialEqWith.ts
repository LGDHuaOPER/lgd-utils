/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:20:55
 * @LastEditTime: 2021-09-08 10:22:07
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\partialEqWith.ts
 */

import * as _ from 'lodash-es'

import partialEq from './partialEq'

/**
 * @param partialArg - comparator 的预设的参数
 * @param comparator - 比较函数
 * @returns 返回预设参数的比较函数
 * @typeReturns (val: unknown) =\> boolean
 */
export default function partialEqWith(
  partialArg?: unknown,
  comparator?: (partialArg: unknown, val: unknown) => boolean,
): (val: unknown) => boolean {
  if (!_.isFunction(comparator)) return partialEq(partialArg)
  return _.partial(comparator, partialArg)
}
