/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-21 09:23:10
 * @LastEditTime: 2021-10-29 09:16:43
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\lib.d.ts
 */
declare interface CacheLike<T> {
  get(key: string): T | undefined

  set(key: string, value: T, maxAge?: number): boolean

  del?: (key: string) => void

  delete?: (key: string) => void

  keys(): string[]

  [propName: string]: unknown | undefined
}
