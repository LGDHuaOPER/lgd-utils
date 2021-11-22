/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-11-22 14:00:17
 * @LastEditTime: 2021-11-22 14:37:18
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\array\src\waterfalls.ts
 */

import lodashIsFunction from 'lodash/isFunction'
import { reduceWrap } from '@lgd-utils/array'

export default function waterfalls(fns?: WaterfallsParameterFns, ...args: unknown[]): unknown[] | unknown {
  return reduceWrap(
    Array.isArray(fns) ? fns.filter((fn) => lodashIsFunction(fn)) : lodashIsFunction(fns) ? [fns] : [],
    (_result: ReturnType<WaterfallsParameterFn>, fn: WaterfallsParameterFn, i: number, arr: WaterfallsParameterFn[]) =>
      fn(_result, i, arr),
    true,
    args,
  )
}
