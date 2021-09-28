/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 16:13:23
 * @LastEditTime: 2021-09-28 14:26:28
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validToStringBlob.ts
 */

import validToStringType from './validToStringType'

/**
 * @remarks
 * Determine if a value is a Blob
 *
 * @param value - The value to test
 * @typeParam value - unknown | undefined
 * @returns True if value is a Blob, otherwise false - boolean
 */
export default function validToStringBlob(value?: unknown): boolean {
  return validToStringType(value, 'Blob')
}
