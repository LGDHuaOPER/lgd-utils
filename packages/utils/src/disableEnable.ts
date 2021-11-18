/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-21 09:50:15
 * @LastEditTime: 2021-11-18 15:57:43
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\disableEnable.ts
 */

import lodashIsString from 'lodash/isString'

import nilTo from './nilTo'

/**
 * @param disable - disable 状态
 * @param enable - enable 状态
 * @param enableByDefault - 默认 enable
 * @param options - 配置
 * @typeParam disable - boolean | null | undefined
 * @typeParam enable - boolean | null | undefined
 * @typeParam enableByDefault - boolean | undefined
 * @typeParam options - \{
    firstAssert: 'ENABLE' | 'enable' | 'DISABLE' | 'disable'
    returnAssert: 'ENABLE' | 'enable' | 'DISABLE' | 'disable'
  \}
 * @returns 返回 disable 或 enable 状态 - boolean
 */
export default function disableEnable(
  disable?: boolean | null,
  enable?: boolean | null,
  enableByDefault?: boolean,
  { firstAssert = 'ENABLE', returnAssert = 'ENABLE' } = {},
): boolean {
  if (!lodashIsString(firstAssert)) firstAssert = 'ENABLE'
  if (!lodashIsString(returnAssert)) returnAssert = 'ENABLE'
  firstAssert = firstAssert.toUpperCase()
  returnAssert = returnAssert.toUpperCase()
  if (!['ENABLE', 'DISABLE'].includes(firstAssert)) firstAssert = 'ENABLE'
  if (!['ENABLE', 'DISABLE'].includes(returnAssert)) returnAssert = 'ENABLE'

  const returnV =
    returnAssert === 'ENABLE'
      ? firstAssert === 'ENABLE'
        ? nilTo(enable, !nilTo(disable, !enableByDefault))
        : !nilTo(disable, !nilTo(enable, enableByDefault))
      : firstAssert === 'ENABLE'
      ? !nilTo(enable, !nilTo(disable, !enableByDefault))
      : nilTo(disable, !nilTo(enable, enableByDefault))

  return Boolean(returnV)
}
