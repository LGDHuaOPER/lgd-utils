/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 15:37:38
 * @LastEditTime: 2021-09-27 16:32:44
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validFormData.ts
 */

import globalThis from './_globalThis'

/**
 * @remarks
 * Determine if a value is a FormData
 * @param value - The value to test
 * @param FormDataConstructor - The Constructor of FormData
 * @typeParam value - unknown | undefined
 * @typeParam FormDataConstructor - unknown | undefined
 * @returns True if value is a FormData, otherwise false - boolean
 */
export default function validFormData(value?: unknown, FormDataConstructor?: typeof FormData): boolean {
  if (!FormDataConstructor) FormDataConstructor = globalThis.FormData
  return typeof FormDataConstructor !== 'undefined' && value instanceof FormDataConstructor
}
