/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-26 00:15:30
 * @LastEditTime: 2021-09-28 14:21:09
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\mergeDeep.ts
 */

import { forEach } from '@lgd-utils/collection'
import lodashIsPlainObject from 'lodash/isPlainObject'
import lodashLast from 'lodash/last'
import lodashSet from 'lodash/set'
import safeGet from './safeGet'

/**
 * @remarks
 * 递归合并数组或对象
 *
 * @param args - 要合并的数组或对象，最后一个可以传 'object' 或 'array' 标记合并行为
 * @typeParam args - Array\<unknown[] | Record\<string, unknown\> | 'object' | 'array' | unknown\>
 * @returns 合并后的数组或对象 - Record\<string, unknown\>
 */
export default function mergeDeep(
  ...args: Array<unknown[] | Record<string, unknown> | 'object' | 'array' | unknown>
): unknown[] | Record<string, unknown> {
  const last = lodashLast(args)
  let result = {}
  let offset = 0
  if (last === 'object') {
    result = {}
    offset = 1
  } else if (last === 'array') {
    result = []
    offset = 1
  } else if (lodashIsPlainObject(last)) {
    result = {}
    offset = 0
  } else if (Array.isArray(last)) {
    result = []
    offset = 0
  }

  function assignValue(val: unknown, key: number | string) {
    const resultVal = safeGet(result, key)
    let mergeVal
    if (lodashIsPlainObject(resultVal) && lodashIsPlainObject(val)) {
      mergeVal = mergeDeep(resultVal, val, 'object')
    } else if (Array.isArray(resultVal) && Array.isArray(val)) {
      mergeVal = mergeDeep(resultVal, val, 'array')
    } else if (lodashIsPlainObject(val)) {
      mergeVal = mergeDeep({}, val, 'object')
    } else if (Array.isArray(val)) {
      mergeVal = mergeDeep([], val, 'array')
    } else {
      mergeVal = val
    }
    lodashSet(result, key, mergeVal)
  }

  for (let i = 0, l = args.length - offset; i < l; i++) {
    forEach(args[i] as unknown[] | Record<string, unknown>, assignValue)
  }

  return result
}
