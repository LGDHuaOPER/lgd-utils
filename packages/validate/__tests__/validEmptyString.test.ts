/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 17:04:33
 * @LastEditTime: 2021-09-22 19:54:41
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\__tests__\validEmptyString.test.ts
 */

import lodashTrim from 'lodash/trim'
import validEmptyString from '../src/validEmptyString'

describe('@lgd-utils/validate validEmptyString', () => {
  it(`validEmptyString(1) is to be false`, () => {
    expect(validEmptyString(1)).toBeFalsy()
  })

  it(`validEmptyString('  ') is to be false`, () => {
    expect(validEmptyString('  ')).toBeFalsy()
  })

  it(`validEmptyString('') is to be true`, () => {
    expect(validEmptyString('')).toBeTruthy()
  })

  it(`validEmptyString('  ', lodashTrim) is to be true`, () => {
    expect(validEmptyString('  ', lodashTrim)).toBeTruthy()
  })
})
