/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 14:16:15
 * @LastEditTime: 2021-09-28 14:27:09
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validArrayBufferView.ts
 */

import globalThis from './_globalThis'

/**
 * @remarks
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param value - The value to test
 * @param ArrayBufferConstructor - The constructor for ArrayBufferView
 * @typeParam value - unknown | undefined
 * @typeParam ArrayBufferConstructor - unknown | typeof ArrayBuffer
 * @returns True if value is a view on an ArrayBuffer, otherwise false - boolean
 */
export default function validArrayBufferView(value?: unknown, ArrayBufferConstructor?: typeof ArrayBuffer): boolean {
  if (!ArrayBufferConstructor) ArrayBufferConstructor = globalThis.ArrayBuffer
  let result
  if (typeof ArrayBufferConstructor !== 'undefined' && ArrayBufferConstructor.isView) {
    result = ArrayBufferConstructor.isView(value)
  } else {
    result =
      value && (value as ArrayBufferView).buffer && (value as ArrayBufferView).buffer instanceof ArrayBufferConstructor
  }
  return Boolean(result)
}
