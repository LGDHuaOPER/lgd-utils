/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:33:28
 * @LastEditTime: 2022-01-07 11:06:01
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/validate/src/validNonemptyObject.ts
 */

import lodashIdentity from 'lodash/identity'
import lodashIsEmpty from 'lodash/isEmpty'
import lodashIsFunction from 'lodash/isFunction'
import lodashNegate from 'lodash/negate'

import validToStringObject from './validToStringObject'

/**
 * @remarks
 * 校验非空对象
 *
 * @param value - 对象
 * @param iteratee - 迭代函数
 * @param options - 配置
 * @typeParam value - unknown | undefined
 * @typeParam iteratee - (value?: unknown) =\> unknown | undefined
 * @typeParam options___assertObject - typeof validToStringObject | undefined
 * @typeParam options___assertNonempty - (value?: unknown) =\> boolean | undefined
 * @returns 检验结果 - boolean
 */
export default function validNonemptyObject(
  value?: unknown,
  iteratee?: (value?: unknown) => unknown | undefined,
  {
    assertObject,
    assertNonempty,
  }: {
    assertObject?: typeof validToStringObject
    assertNonempty?: (value?: unknown) => boolean
  } = {},
): boolean {
  if (!lodashIsFunction(iteratee)) iteratee = lodashIdentity
  if (!lodashIsFunction(assertObject)) assertObject = validToStringObject
  if (!lodashIsFunction(assertNonempty)) assertNonempty = lodashNegate(lodashIsEmpty)

  // return lodashOverEvery(assertObject, lodashFlow([iteratee, assertNonempty]))(value)
  return assertObject(value) && assertNonempty(iteratee(value))
}
