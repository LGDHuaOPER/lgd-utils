/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 10:59:31
 * @LastEditTime: 2021-09-19 12:15:24
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\__tests__\omitUndefined.test.ts
 */

import omitUndefined from '../src/omitUndefined'

describe('@lgd-utils/object omitUndefined', () => {
  it(`omitUndefined() is equal to {}`, () => {
    expect(omitUndefined()).toEqual({})
  })

  it(`omitUndefined({ key: 'value', key1: 'value1' }) is equal to { key: 'value', key1: 'value1' }`, () => {
    expect(omitUndefined({ key: 'value', key1: 'value1' })).toEqual({ key: 'value', key1: 'value1' })
  })

  it(`omitUndefined({ key: 'value', key1: null, key2: void 0 }) is equal to { key: 'value', key1: null }`, () => {
    expect(omitUndefined({ key: 'value', key1: null, key2: void 0 })).toEqual({ key: 'value', key1: null })
  })
})
