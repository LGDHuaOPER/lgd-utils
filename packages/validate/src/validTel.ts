/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 14:41:14
 * @LastEditTime: 2022-01-07 10:43:48
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/validate/src/validTel.ts
 */

import lodashGet from 'lodash/get'
import { test } from '@lgd-utils/regexp'

/**
 * @remarks
 * 校验 tel
 *
 * @param tel - The value to test
 * @param lv - 0: 严谨, 1: 宽松; default is 0
 * @typeParam tel - string
 * @typeParam lv - number | string
 * @returns boolean
 */
export default function validTel(tel?: unknown, lv?: number | string): boolean {
  const telRegMapping = {
    0: /^\d{3}-\d{8}$|^\d{4}-\d{7}$/,
    1: /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/,
  }

  return test(lodashGet(telRegMapping, lv as number | string, telRegMapping[0]), tel)
}
