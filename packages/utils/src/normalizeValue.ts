/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:25:10
 * @LastEditTime: 2021-09-08 10:25:11
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\normalizeValue.ts
 */

import * as _ from 'lodash-es'

/**
 * @param value - 要 normalize 的值
 * @param type - normalize type
 * @param defaultVal - 默认值
 * @returns normalize 后的值
 * @typeReturns unknown
 */
export default function normalizeValue(value: unknown, type?: string, defaultVal?: unknown): unknown {
  if (!_.isString(type)) return defaultVal === void 0 ? value : defaultVal
  switch (type.toUpperCase()) {
    /* eslint-disable no-unreachable */
    case 'NUMBER':
      if (Array.isArray(value)) break
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tempVal = +(value as any)
        if (_.isNumber(tempVal) && !isNaN(tempVal)) return tempVal
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
