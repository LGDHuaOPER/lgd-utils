/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 13:41:11
 * @LastEditTime: 2021-09-18 17:42:24
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\number\src\convertLargeNumber.ts
 */

export default function convertLargeNumber(
  value?: number | string,
  precision?: number,
): [string, string, number, number, string] {
  const keepPrecision = (value: number, precision: number) => value.toFixed(precision)
  const toString = Object.prototype.toString
  const valueToStringTag = toString.call(value)
  const precisionToStringTag = toString.call(precision)
  if (precisionToStringTag !== '[object Number]' || (precision as number) < 0) precision = 2
  if (!['[object String]', '[object Number]'].includes(valueToStringTag))
    return [keepPrecision(0, precision as number), '', 0, 0, '']

  if (valueToStringTag === '[object String]') value = parseFloat(value as string)
  if (isNaN(value as number)) return [keepPrecision(0, precision as number), '', 0, 0, '']

  const wanBaseValue = 10000

  if ((value as number) < wanBaseValue) return [value + '', '', value as number, value as number, '']

  const baseUnitList = ['', '万', '亿', '万亿', '万万亿']
  const unitIndex = Math.floor(Math.log(value as number) / Math.log(wanBaseValue))
  const _value = keepPrecision((value as number) / Math.pow(wanBaseValue, unitIndex), precision as number)
  const _unit = baseUnitList[unitIndex]

  return [_value, _unit, +_value, value as number, '']
}
