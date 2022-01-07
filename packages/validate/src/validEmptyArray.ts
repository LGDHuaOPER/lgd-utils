/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:33:28
 * @LastEditTime: 2022-01-07 10:46:06
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/validate/src/validEmptyArray.ts
 */

import lodashIdentity from 'lodash/identity'
import lodashIsEmpty from 'lodash/isEmpty'
import lodashIsFunction from 'lodash/isFunction'

/**
 * @remarks
 * 校验空数组
 *
 * @param value - 数组
 * @param iteratee - 迭代函数
 * @param options - 配置
 * @typeParam value - unknown | undefined
 * @typeParam iteratee - (value?: unknown) =\> unknown | undefined
 * @typeParam options___assertArray - typeof Array.isArray | undefined
 * @typeParam options___assertEmpty - (value?: unknown) =\> boolean | undefined
 * @returns 检验结果 - boolean
 */
export default function validEmptyArray(
  value?: unknown,
  iteratee?: (value?: unknown) => unknown | undefined,
  {
    assertArray,
    assertEmpty,
  }: {
    assertArray?: typeof Array.isArray
    assertEmpty?: (value?: unknown) => boolean
  } = {},
): boolean {
  if (!lodashIsFunction(iteratee)) iteratee = lodashIdentity
  if (!lodashIsFunction(assertArray)) assertArray = Array.isArray
  if (!lodashIsFunction(assertEmpty)) assertEmpty = lodashIsEmpty

  // return lodashOverEvery(assertArray, lodashFlow([iteratee, assertEmpty]))(value)
  return assertArray(value) && assertEmpty(iteratee(value))
}
