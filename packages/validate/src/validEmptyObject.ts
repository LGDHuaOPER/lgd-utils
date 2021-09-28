/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:33:28
 * @LastEditTime: 2021-09-28 14:30:49
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validEmptyObject.ts
 */

import lodashFlow from 'lodash/flow'
import lodashIdentity from 'lodash/identity'
import lodashIsEmpty from 'lodash/isEmpty'
import lodashIsFunction from 'lodash/isFunction'
import validToStringObject from './validToStringObject'

/**
 * @remarks
 * 校验空对象
 *
 * @param value - 对象
 * @param iteratee - 迭代函数
 * @param options - 配置
 * @typeParam value - unknown | undefined
 * @typeParam iteratee - (value?: unknown) =\> unknown | undefined
 * @typeParam options___assertObject - typeof validToStringObject | undefined
 * @typeParam options___assertEmpty - (value?: unknown) =\> boolean | undefined
 * @returns 检验结果 - boolean
 */
export default function validEmptyObject(
  value?: unknown,
  iteratee?: (value?: unknown) => unknown | undefined,
  {
    assertObject,
    assertEmpty,
  }: {
    assertObject?: typeof validToStringObject
    assertEmpty?: (value?: unknown) => boolean
  } = {},
): boolean {
  if (!lodashIsFunction(iteratee)) iteratee = lodashIdentity
  if (!lodashIsFunction(assertObject)) assertObject = validToStringObject
  if (!lodashIsFunction(assertEmpty)) assertEmpty = lodashIsEmpty

  // return lodashOverEvery(assertObject, lodashFlow([iteratee, assertEmpty]))(value)
  return assertObject(value) && lodashFlow([iteratee, assertEmpty])(value)
}
