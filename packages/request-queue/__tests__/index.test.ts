/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-12-10 15:01:30
 * @LastEditTime: 2021-12-20 19:39:55
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\request-queue\__tests__\index.test.ts
 */

import RequestQueue from '../src/index'

describe('@lgd-utils/request-queue', () => {
  it(
    'use RequestQueue successfully',
    async () => {
      expect.assertions(9)

      try {
        const requestQueue = new RequestQueue({
          maxConcurrent: 2,
          requestList: [0, 1, 2, 3, 4, 5, 6].map(
            (i) => () =>
              new Promise((resolve, reject) => {
                setTimeout(() => resolve(i), 1000)
              }),
          ),
        })

        await requestQueue.start()

        expect(requestQueue.complete).toBe(7)
        expect(requestQueue.destroyed).toBeTruthy()
        expect(requestQueue.errorKeys.length).toBe(0)
        expect(requestQueue.progress).toBe(7)
        expect(requestQueue.requestResult.length).toBe(7)
        expect(requestQueue.requests).toBe(7)
        expect(requestQueue.running).toBeFalsy()
        expect(requestQueue.successKeys.length).toBe(7)
        expect(requestQueue.total).toBe(7)
      } catch (e) {
        expect(e).toMatch('error')
      }
    },
    4000 + 5000,
  )
})
