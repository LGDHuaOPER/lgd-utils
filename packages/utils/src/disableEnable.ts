/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-21 09:50:15
 * @LastEditTime: 2021-11-11 15:43:38
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\disableEnable.ts
 */

import lodashIsString from 'lodash/isString'

import nilTo from './nilTo'

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
