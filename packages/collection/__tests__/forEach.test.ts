/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-26 00:25:18
 * @LastEditTime: 2021-09-26 22:42:50
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\collection\__tests__\forEach.test.ts
 */

import forEach from '../src/forEach'

describe('@lgd-utils/collection forEach', () => {
  it(`forEach([1, 2, 3], (v, k) => { array.push((v as number) + 1) }), array is equal to [2, 3, 4]`, () => {
    const array: number[] = []
    forEach([1, 2, 3], (v, k) => {
      array.push((v as number) + 1)
    })
    expect(array).toEqual([2, 3, 4])
  })
})
