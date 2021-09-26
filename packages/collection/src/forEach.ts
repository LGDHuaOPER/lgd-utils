/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-26 00:25:18
 * @LastEditTime: 2021-09-26 00:38:42
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\collection\src\forEach.ts
 */

export default function forEach(
  object: unknown[] | Record<string, unknown> | null | undefined,
  fn: (value: unknown, key: number | string, object?: unknown[] | Record<string, unknown>) => void,
) {
  if (object === null || typeof object === 'undefined') {
    return
  }

  if (typeof object !== 'object') {
    object = [object]
  }

  if (Array.isArray(object)) {
    for (let i = 0, l = object.length; i < l; i++) {
      fn.call(null, object[i], i, object)
    }
  } else {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        fn.call(null, object[key], key, object)
      }
    }
  }
}
