/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:31:43
 * @LastEditTime: 2021-09-19 12:01:11
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\flatObjectDeep.ts
 */

import flatObjectDepth from './flatObjectDepth'

export default function flatObjectDeep(
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
  return flatObjectDepth(object, Number.MAX_SAFE_INTEGER || Number.MAX_VALUE, preFixKey, { connector, iteratee })
}
