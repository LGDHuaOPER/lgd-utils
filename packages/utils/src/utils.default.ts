/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-05 21:19:57
 * @LastEditTime: 2021-09-08 10:30:32
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\src\utils.default.ts
 */

import assertValue from './assertValue'
import attemptFunc from './attemptFunc'
import attemptFuncWithDefault from './attemptFuncWithDefault'
import attemptFuncWithDefaultAndError from './attemptFuncWithDefaultAndError'
import attemptFuncWithError from './attemptFuncWithError'
import attemptFuncWithLazyDefault from './attemptFuncWithLazyDefault'
import normalizeValue from './normalizeValue'
import partialEq from './partialEq'
import partialEqBy from './partialEqBy'
import partialEqWith from './partialEqWith'
import promiseSeries from './promiseSeries'
import regexpTest from './regexpTest'
import typeDefaultTo from './typeDefaultTo'
import undefinedTo from './undefinedTo'

export default {
  attemptFunc,
  attemptFuncWithLazyDefault,
  attemptFuncWithError,
  attemptFuncWithDefault,
  attemptFuncWithDefaultAndError,
  partialEq,
  partialEqBy,
  partialEqWith,
  regexpTest,
  undefinedTo,
  assertValue,
  normalizeValue,
  promiseSeries,
  typeDefaultTo,
}
