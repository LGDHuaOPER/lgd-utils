/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:22:24
 * @LastEditTime: 2021-09-09 22:04:21
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\regexpTest.ts
 */

import lodashIsNumber from 'lodash/isNumber'
import lodashIsRegExp from 'lodash/isRegExp'
import lodashIsString from 'lodash/isString'
import lodashOverSome from 'lodash/overSome'

/**
 * @param regexp - 正则
 * @param value - 要检查的值
 * @returns 校验结果
 * @typeReturns boolean
 */
export default function regexpTest(regexp: RegExp, value: number | string): boolean {
  if (!lodashIsRegExp(regexp) || !lodashOverSome(lodashIsString, lodashIsNumber)(value)) return false

  return regexp.test(value as string)
}
