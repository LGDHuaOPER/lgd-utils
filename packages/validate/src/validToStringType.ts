/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-08-31 10:25:16
 * @LastEditTime: 2021-09-22 14:18:01
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validToStringType.ts
 */

/**
 * @param value - 值
 * @param type - 类型
 * @typeParam value - unknown
 * @typeParam type - string
 * @returns 返回是否和给定的类型匹配 - boolean
 */
export default function validToStringType(value: unknown, type: string): boolean {
  if (Object.prototype.toString.call(type) !== '[object String]') type = 'Undefined'
  type = type.toUpperCase()
  const valueType = Object.prototype.toString.call(value).replace(/^\[object (.+)\]$/, '$1')

  return valueType.toUpperCase() === type
}
