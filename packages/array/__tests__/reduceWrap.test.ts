/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 17:04:33
 * @LastEditTime: 2021-09-10 21:07:37
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\array\__tests__\reduceWrap.test.ts
 */

import lodashIsUndefined from 'lodash/isUndefined'
import reduceWrap from '../src/reduceWrap'

describe('@lgd-utils/validate validToStringType', () => {
  it(`After reduceWrap called is to be '11'`, () => {
    expect(reduceWrap(['11', 22, undefined, void 0, null], null, lodashIsUndefined)).toBe('11')
  })

  it(`After reduceWrap called is to be 33`, () => {
    expect(reduceWrap([undefined, void 0, 33], null, lodashIsUndefined)).toBe(33)
  })

  it(`After reduceWrap called is to be 15`, () => {
    expect(
      reduceWrap(
        [
          (_result: number) => _result + 1,
          (_result: number) => _result + 2,
          (_result: number) => _result + 3,
          (_result: number) => _result + 4,
          (_result: number) => _result + 5,
        ],
        (_result: number, fn: (_result: number) => number) => fn(_result),
        true,
        0,
      ),
    ).toBe(0 + 1 + 2 + 3 + 4 + 5)
  })
})
