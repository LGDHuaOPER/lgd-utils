/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 13:43:53
 * @LastEditTime: 2021-09-18 17:43:38
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\number\src\convertDataSize.ts
 */

import { attemptFunc, typeDefaultTo } from '@lgd-utils/utils'

import bytes from 'bytes'
import lodashOmit from 'lodash/omit'
import lodashToNumber from 'lodash/toNumber'

export default function convertDataSize(
  originalSize?: number | string,
  originalUnit?: string,
  unitSeparator?: string,
  options?:
    | bytes.BytesOptions
    | ((option: {
        bytesSize: number
        bytes: typeof bytes
        defaultUnit: string
        originalSize: number | string
        originalUnit: string
        unitSeparator: string
      }) => bytes.BytesOptions),
): [string, string, number, number | string, string] {
  const defaultUnit = 'B'

  ;(originalSize as number | string | unknown) = typeDefaultTo(originalSize, 0, {
    assertTypes: ['Number', 'String'],
    negate: true,
  })
  ;(originalUnit as string | unknown) = typeDefaultTo(originalUnit, defaultUnit, {
    assertTypes: 'String',
    negate: true,
  })
  ;(unitSeparator as string | unknown) = typeDefaultTo(unitSeparator, '__unitSeparator__', {
    assertTypes: 'String',
    negate: true,
  })

  // 先转换成以 B 为单位
  const bytesSize: number | unknown = typeDefaultTo(bytes(`${originalSize}${originalUnit}`), 0, {
    assertTypes: ['NaN', 'Null'],
  })

  ;(options as bytes.BytesOptions | unknown) = typeDefaultTo(
    attemptFunc(options, { bytesSize, bytes, defaultUnit, originalSize, originalUnit, unitSeparator }),
    { decimalPlaces: 3, unitSeparator },
    { assertTypes: 'PlainObject', negate: true },
  )

  const byteStrWithoutThousandsSeparator = bytes(bytesSize as number, lodashOmit(options, 'thousandsSeparator'))
  const [sizeWithoutThousandsSeparator] =
    byteStrWithoutThousandsSeparator === null
      ? ['0', defaultUnit]
      : byteStrWithoutThousandsSeparator.split(unitSeparator as string)
  const byteStr = bytes(bytesSize as number, options as bytes.BytesOptions)
  const [size, unit] = byteStr === null ? ['0', defaultUnit] : byteStr.split(unitSeparator as string)

  return [
    size,
    unit,
    lodashToNumber(sizeWithoutThousandsSeparator),
    originalSize as number | string,
    originalUnit as string,
  ]
}
