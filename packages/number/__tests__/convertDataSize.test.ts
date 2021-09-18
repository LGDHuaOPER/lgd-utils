/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 10:59:31
 * @LastEditTime: 2021-09-18 17:55:45
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\number\__tests__\convertDataSize.test.ts
 */

import convertDataSize from '../src/convertDataSize'

describe('@lgd-utils/number convertDataSize', () => {
  it(`convertDataSize() is equal to ['0', 'B', 0, 0, 'B']`, () => {
    expect(convertDataSize()).toEqual(['0', 'B', 0, 0, 'B'])
  })

  it(`convertDataSize(1024, 'KB') is equal to ['1', 'MB', 1, 1024, 'KB']`, () => {
    expect(convertDataSize(1024, 'KB')).toEqual(['1', 'MB', 1, 1024, 'KB'])
  })
})
