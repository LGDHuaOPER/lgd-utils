/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 17:04:33
 * @LastEditTime: 2021-09-22 19:48:57
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\__tests__\partialEq.test.ts
 */

import partialEq from '../src/partialEq'

describe('@lgd-utils/utils partialEq', () => {
  it(`partialEq('true')(true) is to be false`, () => {
    expect(partialEq('true')(true)).toBeFalsy()
  })

  it(`partialEq('false')('false') is to be true`, () => {
    expect(partialEq('false')('false')).toBeTruthy()
  })
})
