/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2022-01-07 09:49:16
 * @LastEditTime: 2022-01-07 10:14:39
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/validate/src/validExternal.ts
 */

import lodashGet from 'lodash/get'
import { test } from '@lgd-utils/regexp'

/**
 * @remarks
 * Determine if a value is an external
 *
 * @param external - The value to test
 * @param lv - 0: 严谨, 1: 宽松, 2: 最宽松; default is 0
 * @typeParam external - string
 * @typeParam lv - number | string
 * @returns boolean
 */
export default function validExternal(external?: unknown, lv?: number | string): boolean {
  const externalRegMapping = {
    0: /^(https?:|mailto:|tel:)/,
    1: /^((ht|f)tps?:|mailto:|tel:)/,
    2: /^((ht|f)tps?:|mailto:|tel:)/i,
  }

  return test(lodashGet(externalRegMapping, lv as number | string, externalRegMapping[0]), external)
}
