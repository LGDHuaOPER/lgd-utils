/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 17:04:33
 * @LastEditTime: 2021-09-12 14:17:25
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\__tests__\typeDefaultTo.test.ts
 */

import typeDefaultTo from '../src/typeDefaultTo'

describe('@lgd-utils/utils typeDefaultTo', () => {
  it(`typeDefaultTo(void (0), 1) is to be 1,
    typeDefaultTo('2', 3) is to be '2',`, () => {
    expect(typeDefaultTo(void 0, 1)).toBe(1)
    expect(typeDefaultTo('2', 3)).toBe('2')
  })

  it(`typeDefaultTo(4, '5', { assertTypes: 'Number' }) is to be '5',
    typeDefaultTo(6, '7', { assertTypes: 'Number', negate: true }) is to be 6`, () => {
    expect(typeDefaultTo(4, '5', { assertTypes: 'Number' })).toBe('5')
    expect(typeDefaultTo(6, '7', { assertTypes: 'Number', negate: true })).toBe(6)
  })

  it(`typeDefaultTo('123', 456, { assertTypes: /^\\d+$/ }) is to be 456,
    typeDefaultTo({ a: 789 }, '0', {
      assertTypes: (value: unknown) => value && (value as Record<string, number>).a > 0,
      negate: true,
    }) is equal to { a: 789 }`, () => {
    expect(typeDefaultTo('123', 456, { assertTypes: /^\d+$/ })).toBe(456)
    expect(
      typeDefaultTo({ a: 789 }, '0', {
        assertTypes: (value: unknown) => value && (value as Record<string, number>).a > 0,
        negate: true,
      }),
    ).toEqual({ a: 789 })
  })

  it(`typeDefaultTo(void 0, '8', { assertTypes: null, assertEq: (val: unknown, otherVal: unknown) => val == otherVal }) is to be '8',
    typeDefaultTo([], 9, {
      assertTypes: null,
      assertEq: (val: unknown, otherVal: unknown) => Array.isArray(val),
      negate: true,
    }) is equal to be []`, () => {
    expect(
      typeDefaultTo(void 0, '8', { assertTypes: null, assertEq: (val: unknown, otherVal: unknown) => val == otherVal }),
    ).toBe('8')
    expect(
      typeDefaultTo([], 9, {
        assertTypes: null,
        assertEq: (val: unknown, otherVal: unknown) => Array.isArray(val),
        negate: true,
      }),
    ).toEqual([])
  })
})
