/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:31:51
 * @LastEditTime: 2021-09-19 11:42:25
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\omitOwnDeepBy.ts
 */

import lodashIdentity from 'lodash/identity'
import lodashIsEmpty from 'lodash/isEmpty'
import lodashStubTrue from 'lodash/stubTrue'
import omitDeepBy from './omitDeepBy'
import { validToStringObject } from '@lgd-utils/validate'

export default function omitOwnDeepBy(
  object?: unknown,
  predicate?: ((v: unknown, k: string) => boolean) | Array<unknown> | string | unknown,
  {
    assertObject = validToStringObject,
    enableEmptyObject = true,
    validEmptyObjectIteratee = lodashIdentity,
    assertEmpty = lodashIsEmpty,
  } = {},
): Record<string, unknown> {
  return omitDeepBy(object, predicate, lodashStubTrue, {
    assertObject,
    enableEmptyObject,
    validEmptyObjectIteratee,
    assertEmpty,
  })
}
