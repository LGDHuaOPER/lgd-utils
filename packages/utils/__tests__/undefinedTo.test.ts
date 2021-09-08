/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 17:04:33
 * @LastEditTime: 2021-09-08 14:27:28
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\__tests__\undefinedTo.test.ts
 */

import undefinedTo from '../src/undefinedTo'

describe('@lgd-utils/utils undefinedTo', () => {
  it(`undefinedTo(1, 2) is equal to 1`, () => {
    expect(undefinedTo(1, 2)).toBe(1)
  })

  it(`undefinedTo({}, 3) is equal to {}`, () => {
    expect(undefinedTo({}, 3)).toEqual({})
  })

  it(`undefinedTo(undefined, 4) is equal to 4`, () => {
    expect(undefinedTo(undefined, 4)).toEqual(4)
  })
})
