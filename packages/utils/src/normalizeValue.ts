/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:25:10
 * @LastEditTime: 2021-11-18 15:25:56
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\normalizeValue.ts
 */

import lodashIsNumber from 'lodash/isNumber'
import lodashIsString from 'lodash/isString'

/**
 * @param value - 要 normalize 的值
 * @param type - normalize type
 * @param defaultVal - 默认值
 * @typeParam value - unknown | undefined
 * @typeParam type - string | undefined
 * @typeParam defaultVal - unknown | undefined
 * @returns normalize 后的值 - unknown
 */
export default function normalizeValue(value: unknown, type?: string, defaultVal?: unknown): unknown {
  if (!lodashIsString(type)) return defaultVal === void 0 ? value : defaultVal
  switch ((type as string).toUpperCase()) {
    /* eslint-disable no-unreachable */
    case 'NUMBER':
      if (Array.isArray(value)) break
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tempVal = +(value as any)
        if (lodashIsNumber(tempVal) && !isNaN(tempVal)) return tempVal
        // eslint-disable-next-line no-empty
      } catch (e) {}
      break
    case 'STRING':
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (value as any).toString()
      } catch (e) {
        return value + ''
      }
      break
    default:
      void 0
  }
  return defaultVal === void 0 ? value : defaultVal
}
