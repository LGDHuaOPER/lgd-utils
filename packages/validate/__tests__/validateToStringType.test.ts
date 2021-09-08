/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 17:04:33
 * @LastEditTime: 2021-09-06 20:17:00
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\__tests__\validateToStringType.test.ts
 */

import validToStringType from '../src/validToStringType'

describe('@lgd-utils/validate validToStringType', () => {
  it('1 is Number, and "1" is not Number', () => {
    expect(validToStringType(1, 'Number')).toBeTruthy()
    expect(validToStringType('1', 'Number')).toBeFalsy()
  })

  it('"2" is String, and true is not String', () => {
    expect(validToStringType('2', 'String')).toBeTruthy()
    expect(validToStringType(true, 'String')).toBeFalsy()
  })

  it('false is Boolean, and null is not Boolean', () => {
    expect(validToStringType(false, 'Boolean')).toBeTruthy()
    expect(validToStringType(null, 'Boolean')).toBeFalsy()
  })

  it('null is Null, and undefined is not Null', () => {
    expect(validToStringType(null, 'Null')).toBeTruthy()
    expect(validToStringType(undefined, 'Null')).toBeFalsy()
  })

  it('void 0 is Undefined, and [] is not Undefined', () => {
    expect(validToStringType(void 0, 'Undefined')).toBeTruthy()
    expect(validToStringType([], 'Undefined')).toBeFalsy()
  })

  it('[3] is Array, and {} is not Array', () => {
    expect(validToStringType([3], 'Array')).toBeTruthy()
    expect(validToStringType({}, 'Array')).toBeFalsy()
  })

  it('{ key: 4 } is Object, and function () {} is not Object', () => {
    expect(validToStringType({ key: 4 }, 'Object')).toBeTruthy()
    expect(validToStringType(function () {}, 'Object')).toBeFalsy()
  })

  it('function () { return 5 } is Function, and /^\\d+/ is not Function', () => {
    expect(
      validToStringType(function () {
        return 5
      }, 'Function'),
    ).toBeTruthy()
    expect(validToStringType(/^\d+/, 'Function')).toBeFalsy()
  })

  it('/^\\d+$/ is RegExp, and new Date() is not RegExp', () => {
    expect(validToStringType(/^\d+$/, 'RegExp')).toBeTruthy()
    expect(validToStringType(new Date(), 'RegExp')).toBeFalsy()
  })

  it('new Date(Date.now()) is Date, and 0 is not Date', () => {
    expect(validToStringType(new Date(Date.now()), 'Date')).toBeTruthy()
    expect(validToStringType(0, 'Date')).toBeFalsy()
  })
})
