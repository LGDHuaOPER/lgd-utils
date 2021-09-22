/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-22 19:40:13
 * @LastEditTime: 2021-09-22 19:45:12
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\__tests__\sortObjectByProp.test.ts
 */

import sortObjectByProp from '../src/sortObjectByProp'

describe('@lgd-utils/object sortObjectByProp', () => {
  it(`sortObjectByProp() is equal to {}`, () => {
    expect(sortObjectByProp()).toEqual({})
  })

  it(`JSON.stringify(sortObjectByProp({ b: 2, a: '1', d: true, c: [33, 3], g: null, f: { ff: 55, ee: 4 } })) is to be '{"a":"1","b":2,"c":[33,3],"d":true,"f":{"ee":4,"ff":55},"g":null}'`, () => {
    expect(JSON.stringify(sortObjectByProp({ b: 2, a: '1', d: true, c: [33, 3], g: null, f: { ff: 55, ee: 4 } }))).toBe(
      '{"a":"1","b":2,"c":[33,3],"d":true,"f":{"ee":4,"ff":55},"g":null}',
    )
  })
})
