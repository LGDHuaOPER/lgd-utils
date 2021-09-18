/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 11:04:13
 * @LastEditTime: 2021-09-18 11:06:03
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\error\src\ExtendableError.ts
 */

export default class ExtendableError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = this.constructor.name
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = new Error(message).stack
    }
  }
}
