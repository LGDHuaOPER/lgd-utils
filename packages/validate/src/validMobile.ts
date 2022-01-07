/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2022-01-07 10:35:59
 * @LastEditTime: 2022-01-07 10:37:35
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/validate/src/validMobile.ts
 */

import lodashGet from 'lodash/get'
import { test } from '@lgd-utils/regexp'

/**
 * @remarks
 * 校验 mobile
 *
 * @param mobile - The value to test
 * @param lv - 0: 严谨, 1: 宽松, 2: 最宽松; default is 0
 * @typeParam mobile - string
 * @typeParam lv - number | string
 * @returns boolean
 */
export default function validMobile(mobile?: unknown, lv?: number | string): boolean {
  const mobileRegMapping = {
    0: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
    1: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
    2: /^(?:(?:\+|00)86)?1\d{10}$/,
  }

  return test(lodashGet(mobileRegMapping, lv as number | string, mobileRegMapping[0]), mobile)
}
