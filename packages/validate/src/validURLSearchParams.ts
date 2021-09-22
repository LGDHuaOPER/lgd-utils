/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 16:24:16
 * @LastEditTime: 2021-09-22 16:27:06
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validURLSearchParams.ts
 */

import globalthis from 'globalthis'

const globalThis: ReturnType<typeof globalthis> & {
  [propName: string]: unknown
} = globalthis()

/**
 * @remarks
 * Determine if a value is an URLSearchParams object
 * @param value - The value to test
 * @param URLSearchParamsConstructor - The Constructor of URLSearchParams
 * @typeParam value - unknown | undefined
 * @typeParam URLSearchParamsConstructor - typeof URLSearchParams | undefined
 * @returns True if value is an URLSearchParams object, otherwise false - boolean
 */
export default function validURLSearchParams(
  value?: unknown,
  URLSearchParamsConstructor?: typeof URLSearchParams,
): boolean {
  if (!URLSearchParamsConstructor) URLSearchParamsConstructor = globalThis.URLSearchParams
  return typeof URLSearchParamsConstructor !== 'undefined' && value instanceof URLSearchParamsConstructor
}
