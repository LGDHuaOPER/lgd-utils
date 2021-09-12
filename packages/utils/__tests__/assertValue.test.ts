/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-12 12:22:57
 * @LastEditTime: 2021-09-12 14:16:20
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\__tests__\assertValue.test.ts
 */

import assertValue from '../src/assertValue'

describe('@lgd-utils/utils assertValue', () => {
  it(`assertValue(1, 1) is to be true,
    assertValue(2, '2') is to be false.`, () => {
    expect(assertValue(1, 1)).toBeTruthy()
    expect(assertValue(2, '2')).toBeFalsy()
  })

  it(`assertValue('str', [3, null, /^\\w+$/]) is to be true,
    assertValue(void 0, ['4', false, (value: unknown) => value === null]) is to be false.`, () => {
    expect(assertValue('str', [3, null, /^\w+$/])).toBeTruthy()
    expect(assertValue(void 0, ['4', false, (value: unknown) => value === null])).toBeFalsy()
  })

  it(`assertValue('str123', { 1: /\\d+/, 2: (value: unknown) => value && (value as string).length > 3 }) is to be true,
    assertValue('456str', { 1: /\\w+/, 2: '' }) is to be false.`, () => {
    expect(
      assertValue('str123', { 1: /\d+/, 2: (value: unknown) => value && (value as string).length > 3 }),
    ).toBeTruthy()
    expect(assertValue('456str', { 1: /\w+/, 2: '' })).toBeFalsy()
  })
})
