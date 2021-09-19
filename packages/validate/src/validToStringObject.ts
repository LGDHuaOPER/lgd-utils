/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:34:35
 * @LastEditTime: 2021-09-18 22:35:25
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validToStringObject.ts
 */

import validToStringType from './validToStringType'

export default function validToStringObject(val?: unknown): boolean {
  return validToStringType(val, 'Object')
}
