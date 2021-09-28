/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 14:41:14
 * @LastEditTime: 2021-09-28 14:27:03
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validEmail.ts
 */

import lodashGet from 'lodash/get'
import { test } from '@lgd-utils/regexp'

/**
 * @remarks
 * 校验 email
 *
 * @param email - The value to test
 * @param lv - 0: 严谨, 1: 宽松; default is 0
 * @typeParam email - string
 * @typeParam lv - number | string
 * @returns boolean
 */
export default function validEmail(email?: unknown, lv?: number | string): boolean {
  const emailRegMapping = {
    // eslint-disable-next-line no-useless-escape
    0: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    1: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  }

  return test(lodashGet(emailRegMapping, lv as number | string, emailRegMapping[0]), email)
}
