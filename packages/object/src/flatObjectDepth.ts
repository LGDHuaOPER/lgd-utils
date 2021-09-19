/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 23:17:52
 * @LastEditTime: 2021-09-19 11:57:00
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\flatObjectDepth.ts
 */

import lodashIsFunction from 'lodash/isFunction'
import lodashIsNumber from 'lodash/isNumber'
import lodashIsPlainObject from 'lodash/isPlainObject'
import lodashIsString from 'lodash/isString'
import lodashNthArg from 'lodash/nthArg'
import lodashTransform from 'lodash/transform'

export default function flatObjectDepth(
  object?: unknown,
  depth?: number,
  preFixKey?: string,
  {
    connector,
    iteratee,
  }: {
    connector?: string
    iteratee?: (
      _accumulator?: Record<string, unknown>,
      _value?: unknown,
      _key?: string,
      _object?: Record<string, unknown>,
      key?: string,
      depth?: number,
    ) => Record<string, unknown> | unknown
  } = {},
): Record<string, unknown> {
  if (!lodashIsPlainObject(object)) object = {}
  if (!lodashIsNumber(depth)) depth = 1
  if (!lodashIsString(preFixKey)) preFixKey = ''
  if (!lodashIsString(connector)) connector = '.'
  if (!lodashIsFunction(iteratee)) iteratee = lodashNthArg(1)

  const baseFlatObjectDepth = (
    object: Record<string, unknown>,
    depth: number,
    preFixKey: string,
    {
      connector,
      iteratee,
    }: {
      connector: string
      iteratee: (
        _accumulator?: Record<string, unknown>,
        _value?: unknown,
        _key?: string,
        _object?: Record<string, unknown>,
        key?: string,
        depth?: number,
      ) => Record<string, unknown> | unknown
    },
  ) =>
    lodashTransform(
      object,
      (_accumulator: Record<string, unknown>, _value, _key, _object) => {
        const key = preFixKey ? `${preFixKey}${connector}${_key}` : _key
        const iterateeValue = iteratee(_accumulator, _value, _key, _object, key, depth)
        if (lodashIsPlainObject(iterateeValue) && depth > 0) {
          Object.assign(
            _accumulator,
            baseFlatObjectDepth(iterateeValue as Record<string, unknown>, depth - 1, key, { connector, iteratee }),
          )
        } else {
          _accumulator[key] = iterateeValue
        }
      },
      {},
    )

  return baseFlatObjectDepth(object as Record<string, unknown>, depth, preFixKey, { connector, iteratee })
}
