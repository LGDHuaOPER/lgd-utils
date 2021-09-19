/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:31:27
 * @LastEditTime: 2021-09-18 23:10:58
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\c.ts
 */

import lodashIsUndefined from 'lodash/isUndefined'
import lodashOmitBy from 'lodash/omitBy'
import lodashUnary from 'lodash/unary'

export default function omitUndefined(object?: Record<string, unknown> | null): Record<string, unknown> {
  return lodashOmitBy(object, lodashUnary(lodashIsUndefined))
}
