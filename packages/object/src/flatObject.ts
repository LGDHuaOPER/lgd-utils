/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:31:34
 * @LastEditTime: 2021-09-19 12:00:54
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\flatObject.ts
 */

import flatObjectDepth from './flatObjectDepth'

export default function flatObject(
  object?: unknown,
  preFixKey?: string,
  {
    connector,
    iteratee,
  }: {
    connector?: string
    iteratee?: (
      _accumulator?: Record<string, unknown>,
      _value?: unknown,
      _key?: string,
      _object?: Record<string, unknown>,
      key?: string,
      depth?: number,
    ) => Record<string, unknown> | unknown
  } = {},
): Record<string, unknown> {
  return flatObjectDepth(object, 1, preFixKey, { connector, iteratee })
}
