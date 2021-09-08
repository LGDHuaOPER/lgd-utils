/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:22:24
 * @LastEditTime: 2021-09-08 10:22:25
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\regexpTest.ts
 */

import * as _ from 'lodash-es'

/**
 * @param regexp - 正则
 * @param value - 要检查的值
 * @returns 校验结果
 * @typeReturns boolean
 */
export default function regexpTest(regexp: RegExp, value: number | string): boolean {
  if (!_.isRegExp(regexp) || !_.overSome(_.isString, _.isNumber)(value)) return false

  return regexp.test(value as string)
}
