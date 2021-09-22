/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 15:51:50
 * @LastEditTime: 2021-09-22 15:54:38
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validNonemptyString.ts
 */

import lodashIsString from 'lodash/isString'
import lodashNegate from 'lodash/negate'
import lodashOverEvery from 'lodash/overEvery'
import { partialEqBy } from '@lgd-utils/utils'

/**
 * @remarks
 * 校验非空字符串
 * @param value - 字符串
 * @param iteratee - 迭代函数
 * @typeParam value - unknown | undefined
 * @typeParam iteratee - unknown | undefined
 * @returns boolean
 */
export default function validNonemptyString(value?: unknown, iteratee?: unknown): boolean {
  return lodashOverEvery(lodashIsString, lodashNegate(partialEqBy('', iteratee)))(value)
}
