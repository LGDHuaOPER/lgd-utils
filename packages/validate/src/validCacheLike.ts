/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-21 09:17:13
 * @LastEditTime: 2021-10-21 09:47:21
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\src\validCacheLike.ts
 */

export default function validCacheLike(cache?: CacheLike<unknown>): boolean {
  return !!(
    cache &&
    cache.set &&
    cache.get &&
    cache.del &&
    cache.keys &&
    typeof cache.get === 'function' &&
    typeof cache.set === 'function' &&
    typeof cache.del === 'function' &&
    typeof cache.keys === 'function'
  )
}
