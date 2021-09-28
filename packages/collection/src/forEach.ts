/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-26 00:25:18
 * @LastEditTime: 2021-09-28 11:23:50
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\collection\src\forEach.ts
 */

/**
 * @remarks
 * 循环一个集合，执行 function
 *
 * @param collection - 要循环的集合
 * @param fn - 循环执行的 function
 * @typeParam collection - unknown[] | Record\<string, unknown\> | null | undefined
 * @typeParam fn - (value: unknown, key: number | string, collection?: unknown[] | Record\<string, unknown\>) =\> void
 * @returns 返回结果 - void
 */
export default function forEach(
  collection: unknown[] | Record<string, unknown> | null | undefined,
  fn: (value: unknown, key: number | string, collection?: unknown[] | Record<string, unknown>) => void,
): void {
  if (collection === null || typeof collection === 'undefined') {
    return
  }

  if (typeof collection !== 'object') {
    collection = [collection]
  }

  if (Array.isArray(collection)) {
    for (let i = 0, l = collection.length; i < l; i++) {
      fn.call(null, collection[i], i, collection)
    }
  } else {
    for (const key in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, key)) {
        fn.call(null, collection[key], key, collection)
      }
    }
  }
}
