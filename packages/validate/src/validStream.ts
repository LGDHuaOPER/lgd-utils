/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 15:55:15
 * @LastEditTime: 2021-09-28 14:26:32
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validStream.ts
 */

import lodashGet from 'lodash/get'
import lodashIsFunction from 'lodash/isFunction'
import lodashIsObjectLike from 'lodash/isObjectLike'

/**
 * @remarks
 * Determine if a value is a Stream
 *
 * @param value - The value to test
 * @typeParam value - unknown | undefined
 * @returns True if value is a Stream, otherwise false - boolean
 */
export default function validStream(value?: unknown): boolean {
  return lodashIsObjectLike(value) && lodashIsFunction(lodashGet(value, 'pipe'))
}
