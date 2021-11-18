/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:20:55
 * @LastEditTime: 2021-11-18 15:24:14
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\partialEqWith.ts
 */

import lodashIsFunction from 'lodash/isFunction'
import lodashPartial from 'lodash/partial'

import partialEq from './partialEq'

/**
 * @param partialArg - comparator 的预设的参数
 * @param comparator - 比较函数
 * @typeParam partialArg - unknown | undefined
 * @typeParam comparator - ((partialArg: unknown, val: unknown) =\> boolean) | unknown | undefined
 * @returns 返回预设参数的比较函数 - (val: unknown) =\> boolean
 */
export default function partialEqWith(
  partialArg?: unknown,
  comparator?: ((partialArg: unknown, val: unknown) => boolean) | unknown,
): (val: unknown) => boolean {
  if (!lodashIsFunction(comparator)) return partialEq(partialArg)
  return lodashPartial(comparator, partialArg)
}
