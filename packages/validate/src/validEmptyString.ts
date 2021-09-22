/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 15:08:58
 * @LastEditTime: 2021-09-22 15:36:01
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validEmptyString.ts
 */

import lodashIsString from 'lodash/isString'
import lodashOverEvery from 'lodash/overEvery'
import { partialEqBy } from '@lgd-utils/utils'

/**
 * @remarks
 * 校验空字符串
 * @param value - 字符串
 * @param iteratee - 迭代函数
 * @typeParam value - unknown | undefined
 * @typeParam iteratee - unknown | undefined
 * @returns boolean
 */
export default function validEmptyString(value?: unknown, iteratee?: unknown): boolean {
  return lodashOverEvery(lodashIsString, partialEqBy('', iteratee))(value)
}
