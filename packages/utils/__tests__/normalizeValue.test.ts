/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 17:04:33
 * @LastEditTime: 2021-09-12 12:49:21
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\__tests__\normalizeValue.ts
 */

import normalizeValue from '../src/normalizeValue'

describe('@lgd-utils/utils normalizeValue', () => {
  it(`normalizeValue('1', 'Number') is to be 1`, () => {
    expect(normalizeValue('1', 'Number')).toBe(1)
  })

  it(`normalizeValue(2, 'String') is to be '2'`, () => {
    expect(normalizeValue(2, 'String')).toBe('2')
  })

  it(`normalizeValue('3kb', 'Number', 4) is to be 4`, () => {
    expect(normalizeValue('3kb', 'Number', 4)).toBe(4)
  })

  it(`normalizeValue(
      {
        toString() {
          return 567
        },
      },
      'String',
      890,
    ) is to be 567`, () => {
    expect(
      normalizeValue(
        {
          toString() {
            return 567
          },
        },
        'String',
        890,
      ),
    ).toBe(567)
  })
})
