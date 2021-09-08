/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 17:04:33
 * @LastEditTime: 2021-09-08 14:31:04
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\__tests__\regexpTest.test.ts
 */

import regexpTest from '../src/regexpTest'

describe('@lgd-utils/utils regexpTest', () => {
  it(`regexpTest(1, 2) is to be false`, () => {
    // @ts-ignore
    expect(regexpTest(1, 2)).toBeFalsy()
  })

  it(`regexpTest({}, '3') is to be false`, () => {
    // @ts-ignore
    expect(regexpTest({}, '3')).toBeFalsy()
  })

  it(`regexpTest(/^\d+$/, '45') is to be true`, () => {
    expect(regexpTest(/^\d+$/, '45')).toBeTruthy()
  })

  it(`regexpTest(/^[a-zA-Z]+$/, 'a6b') is to be false`, () => {
    expect(regexpTest(/^\d+$/, 'a6b')).toBeFalsy()
  })
})
