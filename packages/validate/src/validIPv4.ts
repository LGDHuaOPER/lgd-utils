/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 15:43:34
 * @LastEditTime: 2021-09-28 14:26:49
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validIPv4.ts
 */

import lodashGet from 'lodash/get'
import { test } from '@lgd-utils/regexp'

/**
 * @remarks
 * Determine if a value is an IPv4
 *
 * @param ipv4 - The value to test
 * @param lv - 0: 严谨, 1: 宽松; default is 0
 * @typeParam ipv4 - unknown | undefined
 * @typeParam lv - number | string | undefined
 * @returns True if value is an IPv4, otherwise false - boolean
 */
export default function validIPv4(ipv4?: unknown, lv?: number | string): boolean {
  const ipv4RegMapping = {
    0: /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/,
    1: /((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}/,
  }

  return test(lodashGet(ipv4RegMapping, lv as number | string, ipv4RegMapping[0]), ipv4)
}
