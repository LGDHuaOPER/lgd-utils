/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 10:59:31
 * @LastEditTime: 2021-09-18 11:55:02
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\html\__tests__\decode.test.ts
 */

import decode from '../src/decode'

describe('@lgd-utils/html decode', () => {
  it(`decode('div') is to be 'div'`, () => {
    expect(decode('div')).toBe('div')
  })

  it(`decode('&lt;div&gt;&lt;/div&gt;') is to be '<div></div>'`, () => {
    expect(decode('&lt;div&gt;&lt;/div&gt;')).toBe('<div></div>')
  })
})
