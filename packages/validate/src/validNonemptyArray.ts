/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:33:28
 * @LastEditTime: 2022-01-07 11:04:35
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/validate/src/validNonemptyArray.ts
 */

import lodashIdentity from 'lodash/identity'
import lodashIsEmpty from 'lodash/isEmpty'
import lodashIsFunction from 'lodash/isFunction'
import lodashNegate from 'lodash/negate'

/**
 * @remarks
 * 校验非空数组
 *
 * @param value - 数组
 * @param iteratee - 迭代函数
 * @param options - 配置
 * @typeParam value - unknown | undefined
 * @typeParam iteratee - (value?: unknown) =\> unknown | undefined
 * @typeParam options___assertArray - typeof Array.isArray | undefined
 * @typeParam options___assertNonempty - (value?: unknown) =\> boolean | undefined
 * @returns 检验结果 - boolean
 */
export default function validNonemptyArray(
  value?: unknown,
  iteratee?: (value?: unknown) => unknown | undefined,
  {
    assertArray,
    assertNonempty,
  }: {
    assertArray?: typeof Array.isArray
    assertNonempty?: (value?: unknown) => boolean
  } = {},
): boolean {
  if (!lodashIsFunction(iteratee)) iteratee = lodashIdentity
  if (!lodashIsFunction(assertArray)) assertArray = Array.isArray
  if (!lodashIsFunction(assertNonempty)) assertNonempty = lodashNegate(lodashIsEmpty)

  // return lodashOverEvery(assertArray, lodashFlow([iteratee, assertNonempty]))(value)
  return assertArray(value) && assertNonempty(iteratee(value))
}
