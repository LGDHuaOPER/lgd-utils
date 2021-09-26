/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-25 22:22:03
 * @LastEditTime: 2021-09-25 22:23:44
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\omitOwnBy.ts
 */

import lodashStubTrue from 'lodash/stubTrue'
import omitBy from './omitBy'

export default function omitOwnBy(object?: unknown, predicate?: unknown) {
  return omitBy(object, predicate, lodashStubTrue)
}
