/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 11:08:31
 * @LastEditTime: 2021-09-18 11:49:01
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\error\src\CustomError.ts
 */

import ExtendableError from './ExtendableError'
import lodashForOwn from 'lodash/forOwn'
import lodashSet from 'lodash/set'

export default class CustomError extends ExtendableError {
  static isCustomError = true

  constructor(message?: string, payload?: Record<string, unknown>) {
    super(message)
    lodashForOwn(payload, (value, key) => {
      lodashSet(this, key, value)
    })
  }

  public isCustomError = true
}
