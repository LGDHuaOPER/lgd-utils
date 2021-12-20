/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-12-10 14:56:04
 * @LastEditTime: 2021-12-20 19:41:59
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\polling\__tests__\index.test.ts
 */

import Polling from '../src/index'

describe('@lgd-utils/polling', () => {
  it(
    'use Polling successfully',
    async () => {
      expect.assertions(6)

      const maxTimes = 5
      let i = 0
      let polling: unknown

      try {
        await new Promise((resolve, reject) => {
          polling = new Polling({
            destroyHook() {
              if ([0, 3].includes((polling as Polling).exitCode as number)) {
                resolve(void 0)
              } else {
                reject(void 0)
              }
            },
            errorHook(reason) {
              console.log(reason, i)
              reject(reason)
            },
            immediate: true,
            interval: 3000,
            maxTimes,
            request: () =>
              new Promise((resolve, reject) => {
                setTimeout(() => resolve(++i), 1000)
              }),
          })
          // start
          ;(polling as Polling).start()
        })

        expect(i).toBe(maxTimes)
        expect((polling as Polling).exitCode).toBe(3)
        expect((polling as Polling).hasExeImmediate).toBeTruthy()
        expect((polling as Polling).running).toBeFalsy()
        expect((polling as Polling).times).toBe(maxTimes + 1)
        expect((polling as Polling).type).toBe(0)
      } catch (e) {
        expect(e).toMatch('error')
      }
    },
    1000 * 5 + 3000 * 5 + 5000,
  )
})
