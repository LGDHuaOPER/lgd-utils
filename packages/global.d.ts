/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-02 17:47:00
 * @LastEditTime: 2021-09-04 14:46:06
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\global.d.ts
 */

import 'jest-extended'
import 'jest-chain'

declare global {
  interface Date {
    toGMTString(): string
  }
}

// Global compile-time constants
declare const __COMMIT__: string
declare const __DEV__: boolean
declare const __ESM__: boolean
declare const __GLOBAL__: boolean
declare const __NODE_JS__: boolean
declare const __TEST__: boolean
declare const __VERSION__: string

// for tests
declare namespace jest {
  interface Matchers<R, T> {
    toHaveBeenWarned(): R
    toHaveBeenWarnedLast(): R
    toHaveBeenWarnedTimes(n: number): R
  }
}
