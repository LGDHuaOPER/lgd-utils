/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 15:49:26
 * @LastEditTime: 2021-09-22 15:53:06
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validNilOrEmptyStr.ts
 */

import lodashIsNil from 'lodash/isNil'
import lodashOverSome from 'lodash/overSome'
import lodashPartial from 'lodash/partial'
import lodashRearg from 'lodash/rearg'
import lodashTrim from 'lodash/trim'
import validEmptyString from './validEmptyString'

/**
 * @remarks
 * 校验是undefined、null或空字符串
 * @param value - 值
 * @typeParam value - unknown | undefined
 * @returns boolean
 */
export default function validNilOrEmptyStr(value?: unknown): boolean {
  return lodashOverSome(lodashIsNil, lodashPartial(lodashRearg(validEmptyString, [1, 0]), lodashTrim))(value)
}
