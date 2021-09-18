/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 10:59:31
 * @LastEditTime: 2021-09-18 11:58:50
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\html\__tests__\decodeMapping.test.ts
 */

import decodeMapping from '../src/decodeMapping'

describe('@lgd-utils/html decodeMapping', () => {
  it(`decodeMapping['&lt;'] is to be '<'`, () => {
    expect(decodeMapping['&lt;']).toBe('<')
  })

  it(`decodeMapping['&gt;'] is to be '>'`, () => {
    expect(decodeMapping['&gt;']).toBe('>')
  })

  it(`decodeMapping['&amp;'] is to be '&'`, () => {
    expect(decodeMapping['&amp;']).toBe('&')
  })

  it(`decodeMapping['&nbsp;'] is to be ' '`, () => {
    expect(decodeMapping['&nbsp;']).toBe(' ')
  })

  it(`decodeMapping['&quot;'] is to be '"'`, () => {
    expect(decodeMapping['&quot;']).toBe('"')
  })

  it(`decodeMapping['&copy;'] is to be '©'`, () => {
    expect(decodeMapping['&copy;']).toBe('©')
  })
})
