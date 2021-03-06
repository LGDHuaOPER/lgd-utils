/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:20:55
 * @LastEditTime: 2021-11-25 14:10:11
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\partialEqBy.ts
 */

import lodashEq from 'lodash/eq'
import lodashIsFunction from 'lodash/isFunction'

import partialEq from './partialEq'

/**
 * @param partialArg - lodashEq()的预设的参数
 * @param iteratee - 迭代函数
 * @typeParam partialArg - unknown | undefined
 * @typeParam iteratee - ((val?: unknown) =\> unknown) | unknown | undefined
 * @returns 返回预设参数的函数 - (val?: unknown) =\> boolean
 */
export default function partialEqBy(
  partialArg?: unknown,
  iteratee?: ((val?: unknown) => unknown) | unknown,
): (val?: unknown) => boolean {
  if (!lodashIsFunction(iteratee)) return partialEq(partialArg)
  // return lodashWrap(lodashEq, function (func: (val: unknown, other: unknown) => boolean, val: unknown) {
  //   return func(partialArg, (iteratee as (val: unknown) => unknown)(val))
  // })
  return (val?: unknown): boolean => lodashEq(partialArg, (iteratee as (val?: unknown) => unknown)(val))
}
