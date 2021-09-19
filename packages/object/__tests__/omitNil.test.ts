/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 10:59:31
 * @LastEditTime: 2021-09-19 12:14:43
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\__tests__\omitNil.test.ts
 */

import omitNil from '../src/omitNil'

describe('@lgd-utils/object omitNil', () => {
  it(`omitNil() is equal to {}`, () => {
    expect(omitNil()).toEqual({})
  })

  it(`omitNil({ key: 'value', key1: 'value1' }) is equal to { key: 'value', key1: 'value1' }`, () => {
    expect(omitNil({ key: 'value', key1: 'value1' })).toEqual({ key: 'value', key1: 'value1' })
  })

  it(`omitNil({ key: 'value', key1: null, key2: void 0 }) is equal to { key: 'value' }`, () => {
    expect(omitNil({ key: 'value', key1: null, key2: void 0 })).toEqual({ key: 'value' })
  })
})
