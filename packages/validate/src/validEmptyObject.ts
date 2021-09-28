/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:33:28
 * @LastEditTime: 2021-09-28 10:31:08
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validEmptyObject.ts
 */

import lodashFlow from 'lodash/flow'
import lodashIdentity from 'lodash/identity'
import lodashIsEmpty from 'lodash/isEmpty'
import lodashIsFunction from 'lodash/isFunction'
import validToStringObject from './validToStringObject'

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
