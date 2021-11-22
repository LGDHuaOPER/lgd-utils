/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-11-22 14:00:17
 * @LastEditTime: 2021-11-22 14:36:51
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\array\src\waterfall.ts
 */

import lodashIsFunction from 'lodash/isFunction'
import { reduceWrap } from '@lgd-utils/array'

export default function waterfall(fns?: WaterfallParameterFns, arg?: unknown): unknown {
  return reduceWrap(
    Array.isArray(fns) ? fns.filter((fn) => lodashIsFunction(fn)) : lodashIsFunction(fns) ? [fns] : [],
    (_result: ReturnType<WaterfallParameterFn>, fn: WaterfallParameterFn, i: number, arr: WaterfallParameterFn[]) =>
      fn(_result, i, arr),
    true,
    arg,
  )
}
