/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-27 18:51:05
 * @LastEditTime: 2021-11-22 14:49:54
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\src\middleware\paramsSerializer.ts
 */

import Qs from 'qs'
import lodashGet from 'lodash/get'
import lodashIsString from 'lodash/isString'
import lodashIsFunction from 'lodash/isFunction'

import { attemptFuncWithError, disableEnable, nilTo } from '@lgd-utils/utils'
import { validURLSearchParams } from '@lgd-utils/validate'

import { AxiosInstance, AxiosRequestConfig } from 'axios'

export default function paramsSerializer(
  config: AxiosRequestConfig,
  instance?: AxiosInstance,
  options?: ParamsSerializerOptions,
): AxiosRequestConfig {
  if (!config) throw new TypeError(`The parameter 'config' for function 'paramsSerializer' is ${typeof config}.`)
  // if (!instance) throw new TypeError(`The parameter 'instance' for function 'paramsSerializer' is ${typeof instance}.`)

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

  if (
    attemptFuncWithError(lodashGet(options, 'force'), false, config, instance, options) ||
    !lodashIsFunction(config.paramsSerializer)
  ) {
    config.paramsSerializer = function (params) {
      if (!params) return ''
      if (lodashIsString(params)) return params
      if (validURLSearchParams(params)) return params.toString()
      return Qs.stringify(params, { arrayFormat: 'brackets' })
    }
  }

  return config
}

paramsSerializer.auto = function auto(
  instance: AxiosInstance,
  options?: {
    default?: ParamsSerializerOptions
  },
): AxiosInstance {
  if (!instance) throw new TypeError(`The parameter 'instance' for function 'auto' is ${typeof instance}.`)

  instance.interceptors.request.use((config) =>
    paramsSerializer(config, instance, lodashGet(options, 'default', options)),
  )

  return instance
}
