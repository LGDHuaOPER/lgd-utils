/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:22:24
 * @LastEditTime: 2021-09-27 20:02:28
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\regexp\src\test.ts
 */

import lodashIsNumber from 'lodash/isNumber'
import lodashIsRegExp from 'lodash/isRegExp'
import lodashIsString from 'lodash/isString'

/**
 * @param regexp - 正则
 * @param value - 要检查的值
 * @returns 校验结果 - boolean
 */
export default function test(regexp?: RegExp | unknown, value?: number | string | unknown): boolean {
  if (!lodashIsRegExp(regexp) || (!lodashIsString(value) && !lodashIsNumber(value))) return false

  return (regexp as RegExp).test(value as string)
}
