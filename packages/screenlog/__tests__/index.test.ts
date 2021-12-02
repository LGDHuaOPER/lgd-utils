/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-12-02 09:17:53
 * @LastEditTime: 2021-12-02 11:12:09
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\screenlog\__tests__\index.test.ts
 */

import ScreenLog from '../src/index'

describe('@lgd-utils/screenlog', () => {
  const screenLog = new ScreenLog(['clear', 'error', 'info', 'log'])

  it(`screenLog.isInitialized is to be false`, () => {
    expect(screenLog.isInitialized).toBeFalsy()
  })

  it(`screenLog.availableProxyConsoleFnNames is equal to ['clear', 'error', 'info', 'log']`, () => {
    expect(screenLog.availableProxyConsoleFnNames).toEqual(['clear', 'error', 'info', 'log'])
  })

  screenLog.init({ autoScroll: false })

  it(`screenLog._options is equal to {
      bgColor: 'black',
      logColor: 'lightgreen',
      infoColor: 'blue',
      warnColor: 'orange',
      errorColor: 'red',
      fontSize: '1em',
      proxyConsole: ['clear', 'error', 'warn'],
      css: '',
      autoScroll: false,
    }`, () => {
    expect(screenLog._options).toEqual({
      bgColor: 'black',
      logColor: 'lightgreen',
      infoColor: 'blue',
      warnColor: 'orange',
      errorColor: 'red',
      fontSize: '1em',
      proxyConsole: ['clear', 'error', 'warn'],
      css: '',
      autoScroll: false,
    })
  })

  it(`screenLog.logEl is not to be undefined`, () => {
    expect(screenLog.logEl).not.toBeUndefined()
  })
})
