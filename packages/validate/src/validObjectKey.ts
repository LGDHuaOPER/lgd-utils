/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 16:27:29
 * @LastEditTime: 2021-09-22 16:30:43
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validObjectKey.ts
 */

import lodashGet from 'lodash/get'
import lodashIsString from 'lodash/isString'
import lodashIsSymbol from 'lodash/isSymbol'
import lodashOverSome from 'lodash/overSome'

/**
 * @remarks
 * Determine if a value is an objectKey
 * @param objectKey - The value to test
 * @param lv - 0: 严谨, 1: 宽松, 2: 最宽松; default is 0
 * @typeParam objectKey - unknown | undefined
 * @typeParam lv - number | string | undefined
 * @returns boolean
 */
export default function validObjectKey(objectKey?: unknown, lv?: number | string): boolean {
  const assertObjectKeyMapping = {
    0: [lodashIsString],
    1: [lodashIsString, lodashIsSymbol],
    2: [lodashIsString, lodashIsSymbol, Array.isArray],
  }

  return lodashOverSome(lodashGet(assertObjectKeyMapping, lv as number | string, assertObjectKeyMapping[0]))(objectKey)
}
