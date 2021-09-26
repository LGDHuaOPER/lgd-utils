/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-25 22:44:14
 * @LastEditTime: 2021-09-25 23:54:51
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\mergeOwn.ts
 */

import lodashIsFunction from 'lodash/isFunction'
import lodashIsPlainObject from 'lodash/isPlainObject'
import lodashMergeWith from 'lodash/mergeWith'
import lodashOverSome from 'lodash/overSome'
import lodashStubTrue from 'lodash/stubTrue'
import omitBy from './omitBy'
import { validToStringObject } from '@lgd-utils/validate'

function stubObject() {
  return {}
}

export default function mergeOwn(
  object?: Record<string, unknown> | unknown,
  sources?: Record<string, unknown> | Array<Record<string, unknown>> | unknown,
  options?: mergeOwnOptions | unknown,
): Record<string, unknown> {
  const defaultDropPropsSymbol = Symbol('__dropPropsSymbol__')
  const defaultCustomizer = (
    objValue: unknown,
    srcValue: unknown,
    key: string,
    object: Record<string, unknown> | unknown,
    source: Record<string, unknown> | unknown,
    stack: unknown,
  ) => {
    if (!Object.prototype.hasOwnProperty.call(source, key)) return defaultDropPropsSymbol
  }
  if (!lodashIsPlainObject(options))
    options = {
      customizer: defaultCustomizer,
      dropPropsSymbol: defaultDropPropsSymbol,
      enableTargetEmptyObject: true,
      enableTargetDropInherited: true,
      objectValidator: validToStringObject,
    }
  const {
    customizer = defaultCustomizer,
    dropPropsSymbol = defaultDropPropsSymbol,
    enableTargetEmptyObject = true,
    enableTargetDropInherited = true,
  } = options as mergeOwnOptions
  const objectValidator = lodashIsFunction((options as mergeOwnOptions).objectValidator)
    ? ((options as mergeOwnOptions).objectValidator as (value?: unknown) => boolean)
    : validToStringObject

  const fn = (
    object?: Record<string, unknown> | unknown,
    sources?: Record<string, unknown> | Array<Record<string, unknown>> | unknown,
    options?: mergeOwnOptions | unknown,
  ): Record<string, unknown> => {
    if (lodashOverSome(objectValidator as (value?: unknown) => boolean, Array.isArray)(sources)) {
      object = objectValidator(object) ? object : stubObject()
      sources = objectValidator(sources)
        ? [sources as Record<string, unknown>]
        : (sources as Array<Record<string, unknown>>)

      let tempObject
      if (enableTargetEmptyObject) {
        tempObject = lodashMergeWith(stubObject(), object, ...(sources as Array<Record<string, unknown>>), customizer)
      } else {
        tempObject = lodashMergeWith(object, ...(sources as Array<Record<string, unknown>>), customizer)
      }

      return omitBy(
        tempObject,
        (v: unknown, k: string) => v === dropPropsSymbol,
        enableTargetDropInherited ? lodashStubTrue : true,
      )
    }

    return objectValidator(object) ? (object as Record<string, unknown>) : stubObject()
  }

  if (arguments.length < 3) {
    let mergeObject: Record<string, unknown>
    switch (arguments.length) {
      case 0:
        mergeObject = stubObject()
        break
      case 1:
        mergeObject = objectValidator(object) ? (object as Record<string, unknown>) : stubObject()
        break
      case 2:
        mergeObject = fn(object, sources, options)
        break
      default:
        mergeObject = stubObject()
    }

    return mergeObject
  }

  return fn(object, sources, options)
}
