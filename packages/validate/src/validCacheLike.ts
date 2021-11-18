/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-21 09:17:13
 * @LastEditTime: 2021-11-18 15:19:12
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validCacheLike.ts
 */

/**
 * @remarks
 * Determine if a value is a cacheLike
 *
 * @param cache - The value to test
 * @typeParam cache - CacheLike\<unknown\> | undefined
 * @returns True if value is a cacheLike, otherwise false - boolean
 */
export default function validCacheLike(cache?: CacheLike<unknown>): boolean {
  return !!(
    cache &&
    cache.set &&
    cache.get &&
    (cache.del || cache.delete) &&
    cache.keys &&
    typeof cache.get === 'function' &&
    typeof cache.set === 'function' &&
    (typeof cache.del === 'function' || typeof cache.delete === 'function') &&
    typeof cache.keys === 'function'
  )
}
