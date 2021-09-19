/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 23:05:30
 * @LastEditTime: 2021-09-19 14:39:33
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\types\omitDeepBy.d.ts
 */

import omitDeepBy from '../src/omitDeepBy'

declare namespace omitDeepByNamespace {
  type omitDeepBy = typeof omitDeepBy
}

export = omitDeepByNamespace
