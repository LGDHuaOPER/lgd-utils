/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 16:13:23
 * @LastEditTime: 2021-09-22 16:16:24
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validToStringPromise.ts
 */

import validToStringType from './validToStringType'

/**
 * @remarks
 * Determine if a value is a Promise
 * @param value - The value to test
 * @typeParam value - unknown | undefined
 * @returns True if value is a Promise, otherwise false - boolean
 */
export default function validToStringPromise(value?: unknown): boolean {
  return validToStringType(value, 'Promise')
}
