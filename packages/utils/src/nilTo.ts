/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-21 09:48:10
 * @LastEditTime: 2021-10-21 09:49:35
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\nilTo.ts
 */

/**
 * @param value - 要检查的值
 * @param defaultValue - 默认值
 * @returns result - 返回 resolved 值
 */
export default function nilTo(value?: unknown, defaultValue?: unknown): unknown {
  return value === void 0 || value === null ? defaultValue : value
}
