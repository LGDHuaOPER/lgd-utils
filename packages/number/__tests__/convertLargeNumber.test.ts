/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 10:59:31
 * @LastEditTime: 2021-09-18 17:54:35
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\number\__tests__\convertLargeNumber.test.ts
 */

import convertLargeNumber from '../src/convertLargeNumber'

describe('@lgd-utils/number convertLargeNumber', () => {
  it(`convertDataSize() is equal to ['0.00', '', 0, 0, '']`, () => {
    expect(convertLargeNumber()).toEqual(['0.00', '', 0, 0, ''])
  })

  it(`convertDataSize(100000000) is equal to ['1.00', '亿', 1, 100000000, '']`, () => {
    expect(convertLargeNumber(100000000)).toEqual(['1.00', '亿', 1, 100000000, ''])
  })
})
