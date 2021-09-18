/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 10:57:19
 * @LastEditTime: 2021-09-18 11:51:15
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\error\__tests__\CustomError.test.ts
 */

import CustomError from '../src/CustomError'
import lodashGet from 'lodash/get'

describe('@lgd-utils/error CustomError', () => {
  it(`CustomError.isCustomError is to be true.`, () => {
    expect(CustomError.isCustomError).toBeTruthy()
  })

  const customError = new CustomError('CustomError test', { key: 'value' })

  it(`customError.isCustomError is to be true.`, () => {
    expect(customError.isCustomError).toBeTruthy()
  })

  it(`customError.message is to be 'CustomError test'`, () => {
    expect(customError.message).toBe('CustomError test')
  })

  it(`customError.key is to be 'CustomError test'`, () => {
    expect(lodashGet(customError, 'key')).toBe('value')
  })
})
