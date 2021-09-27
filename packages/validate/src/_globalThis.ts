/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-27 16:31:14
 * @LastEditTime: 2021-09-27 16:31:15
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\_globalThis.ts
 */

import globalthis from 'globalthis'

const globalThis: ReturnType<typeof globalthis> & {
  [propName: string]: unknown
} = globalthis()

export default globalThis
