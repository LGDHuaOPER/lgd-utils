/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-27 18:33:16
 * @LastEditTime: 2021-10-28 14:51:27
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\src\middleware\lodashTemplateUrl.ts
 */

import lodashGet from 'lodash/get'
import lodashIsPlainObject from 'lodash/isPlainObject'
import lodashMapValues from 'lodash/mapValues'
import lodashTemplate from 'lodash/template'

import { attemptFuncWithError, disableEnable, nilTo } from '@lgd-utils/utils'

import { AxiosInstance, AxiosRequestConfig } from 'axios'

export default function lodashTemplateUrl(
  config: AxiosRequestConfig,
  instance?: AxiosInstance,
  options?: LodashTemplateUrlOptions,
): AxiosRequestConfig {
  if (!config) throw new TypeError(`The parameter 'config' for function 'lodashTemplateUrl' is ${typeof config}.`)
  // if (!instance) throw new TypeError(`The parameter 'instance' for function 'lodashTemplateUrl' is ${typeof instance}.`)

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

  const urlParams = lodashGet(options, 'urlParams')
  if (lodashIsPlainObject(urlParams)) {
    config.url = lodashTemplate(config.url)(lodashMapValues(urlParams, (value) => encodeURIComponent(value)))
  }

  return config
}

export function auto(
  instance: AxiosInstance,
  options?: {
    default?: LodashTemplateUrlOptions
  },
): AxiosInstance {
  if (!instance) throw new TypeError(`The parameter 'instance' for function 'auto' is ${typeof instance}.`)

  instance.interceptors.request.use((config) =>
    lodashTemplateUrl(config, instance, lodashGet(options, 'default', options)),
  )

  return instance
}
