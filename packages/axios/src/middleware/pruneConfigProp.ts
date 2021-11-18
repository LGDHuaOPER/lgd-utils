/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-27 19:03:29
 * @LastEditTime: 2021-11-18 14:56:11
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\src\middleware\pruneConfigProp.ts
 */

import lodashGet from 'lodash/get'
import lodashSet from 'lodash/set'
import lodashUnSet from 'lodash/unset'
import lodashIsPlainObject from 'lodash/isPlainObject'

import { omitNil } from '@lgd-utils/object'
import { attemptFuncWithError, attemptFuncWithLazyDefault, disableEnable, nilTo } from '@lgd-utils/utils'

import { AxiosInstance, AxiosRequestConfig } from 'axios'

/**
 * @remarks
 * 对 AxiosRequestConfig 属性进行提纯
 *
 * @param config - 要提纯的 AxiosRequestConfig
 * @param instance - axios instance
 * @param options - 提纯配置
 * @typeParam config - AxiosRequestConfig
 * @typeParam instance - AxiosInstance | undefined
 * @typeParam options - PruneConfigPropOptions | undefined
 * @returns 返回提纯后的结果 - AxiosRequestConfig
 */
export default function pruneConfigProp(
  config: AxiosRequestConfig,
  instance?: AxiosInstance,
  options?: PruneConfigPropOptions,
): AxiosRequestConfig {
  if (!config) throw new TypeError(`The parameter 'config' for function 'pruneConfigProp' is ${typeof config}.`)
  // if (!instance) throw new TypeError(`The parameter 'instance' for function 'pruneConfigProp' is ${typeof instance}.`)

  const prop = lodashGet(options, 'prop') as string | number | symbol | Array<string | number | symbol>
  const configPropValue = lodashGet(config, prop)
  if (!prop || !configPropValue) return config

  // 如果是 disabled，则不处理
  if (
    !disableEnable(
      attemptFuncWithError(lodashGet(options, 'disable'), false, config, instance, options) as
        | boolean
        | null
        | undefined,
      attemptFuncWithError(lodashGet(options, 'enable'), true, config, instance, options) as boolean | null | undefined,
      nilTo(lodashGet(options, 'enabledByDefault'), true) as boolean,
    )
  )
    return config

  if (lodashIsPlainObject(configPropValue)) {
    lodashSet(
      config,
      prop,
      attemptFuncWithLazyDefault(lodashGet(options, 'pruneHandler'), () => omitNil(configPropValue), configPropValue),
    )
    if (attemptFuncWithError(lodashGet(options, 'dropPropWhenEmpty'), true, configPropValue)) lodashUnSet(config, prop)
  }

  return config
}

export function auto(
  instance: AxiosInstance,
  options?: {
    default?: PruneConfigPropOptions
  },
): AxiosInstance {
  if (!instance) throw new TypeError(`The parameter 'instance' for function 'auto' is ${typeof instance}.`)

  instance.interceptors.request.use((config) =>
    pruneConfigProp(config, instance, lodashGet(options, 'default', options)),
  )

  return instance
}
