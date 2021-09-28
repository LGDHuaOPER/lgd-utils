/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-27 19:52:28
 * @LastEditTime: 2021-09-28 10:25:34
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\regexp\src\_validNonemptyString.ts
 */

import lodashIsFunction from 'lodash/isFunction'
import lodashIsString from 'lodash/isString'

export default function validNonemptyString(value?: unknown, iteratee?: unknown): boolean {
  return lodashIsString(value) && (lodashIsFunction(iteratee) ? iteratee(value) : value) !== ''
}
