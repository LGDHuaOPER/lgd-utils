/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:34:35
 * @LastEditTime: 2021-09-22 16:17:35
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validToStringObject.ts
 */

import validToStringType from './validToStringType'

/**
 * @remarks
 * Determine if a value is an Object
 * @param value - The value to test
 * @typeParam value - unknown | undefined
 * @returns True if value is an Object, otherwise false - boolean
 */
export default function validToStringObject(value?: unknown): boolean {
  return validToStringType(value, 'Object')
}
