/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-08 10:23:13
 * @LastEditTime: 2021-11-18 15:20:11
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\undefinedTo.ts
 */

/**
 * @param value - 要检查的值
 * @param defaultValue - 默认值
 * @typeParam value - unknown | undefined
 * @typeParam defaultValue - unknown | undefined
 * @returns 返回 resolved 值 - unknown
 */
export default function undefinedTo(value?: unknown, defaultValue?: unknown): unknown {
  return value === void 0 ? defaultValue : value
}
