/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 10:59:31
 * @LastEditTime: 2021-09-18 11:54:22
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\html\__tests__\encode.test.ts
 */

import encode from '../src/encode'

describe('@lgd-utils/html encode', () => {
  it(`encode('div') is to be 'div'`, () => {
    expect(encode('div')).toBe('div')
  })

  it(`encode('<div></div>') is to be '&lt;div&gt;&lt;/div&gt;'`, () => {
    expect(encode('<div></div>')).toBe('&lt;div&gt;&lt;/div&gt;')
  })
})
