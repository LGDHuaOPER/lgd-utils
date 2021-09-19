/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:31:17
 * @LastEditTime: 2021-09-18 23:10:03
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\omitNil.ts
 */

import lodashIsNil from 'lodash/isNil'
import lodashOmitBy from 'lodash/omitBy'
import lodashUnary from 'lodash/unary'

export default function omitNil(object?: Record<string, unknown> | null): Record<string, unknown> {
  return lodashOmitBy(object, lodashUnary(lodashIsNil))
}
