/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-27 16:10:00
 * @LastEditTime: 2021-10-28 14:43:42
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\src\middleware\contentType.ts
 */

import Qs from 'qs'
import lodashForOwn from 'lodash/forOwn'
import lodashGet from 'lodash/get'
import lodashIsArrayBuffer from 'lodash/isArrayBuffer'
import lodashIsBuffer from 'lodash/isBuffer'
import lodashIsFunction from 'lodash/isFunction'
import lodashIsPlainObject from 'lodash/isPlainObject'
import lodashIsString from 'lodash/isString'
import lodashMapValues from 'lodash/mapValues'

import { attemptFuncWithDefaultAndError } from '@lgd-utils/utils'
import {
  validArrayBufferView,
  validFormData,
  validStream,
  validToStringBlob,
  validToStringFile,
  validURLSearchParams,
} from '@lgd-utils/validate'

import { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, HeadersDefaults } from 'axios'

export function defaults(instance: AxiosInstance, options?: ContentTypeDefaultsOptions): AxiosInstance {
  if (!instance) throw new TypeError(`The parameter 'instance' for function 'defaults' is ${typeof instance}.`)

  const defaultContentTypeMapping = {
    delete: 'application/x-www-form-urlencoded; charset=UTF-8',
    get: 'application/x-www-form-urlencoded; charset=UTF-8',
    head: 'application/x-www-form-urlencoded; charset=UTF-8',
    patch: 'application/json; charset=UTF-8',
    post: 'application/json; charset=UTF-8',
    put: 'application/json; charset=UTF-8',
  }

  const contentTypeMapping = (function customContentTypeMappingHandler() {
    const customContentTypeMapping = lodashGet(options, 'custom')

    if (lodashIsString(customContentTypeMapping))
      return lodashMapValues(defaultContentTypeMapping, () => customContentTypeMapping)

    if (lodashIsFunction(customContentTypeMapping))
      return lodashMapValues(defaultContentTypeMapping, customContentTypeMapping)

    if (lodashIsPlainObject(customContentTypeMapping))
      return Object.assign({}, defaultContentTypeMapping, customContentTypeMapping)

    return defaultContentTypeMapping
  })()

  const headerKey = lodashGet(options, 'headerKey', 'Content-Type')

  lodashForOwn(contentTypeMapping, (value, key) => {
    if (instance.defaults.headers[key as keyof HeadersDefaults] === void 0) {
      instance.defaults.headers[key as keyof HeadersDefaults] = {}
    }
    ;(instance.defaults.headers[key as keyof HeadersDefaults] as AxiosRequestHeaders)[headerKey] = value
  })

  return instance
}

export function getContentType(
  config: AxiosRequestConfig,
  instance?: AxiosInstance,
  options?: {
    headerKey?: string
    type?: string
  },
): string {
  if (!config) throw new TypeError(`The parameter 'config' for function 'getContentType' is ${typeof config}.`)
  // if (!instance) throw new TypeError(`The parameter 'instance' for function 'getContentType' is ${typeof instance}.`)

  const headerKey = lodashGet(options, 'headerKey', 'Content-Type')
  const type = lodashGet(options, 'type', 'headers')

  const configHeaders: AxiosRequestHeaders = config.headers || {}
  const configMethod = config.method || 'get'
  const headersMethodContentType = lodashGet(configHeaders[configMethod], headerKey)
  const headersCommonContentType = lodashGet(configHeaders.common, headerKey)
  switch (type) {
    case 'headers':
      return configHeaders[headerKey]
    case 'headers.method':
    case 'method':
      return headersMethodContentType
    case 'common':
    case 'headers.common':
      return headersCommonContentType
    case 'default':
    default:
      return lodashIsString(headersMethodContentType) ? headersMethodContentType : headersCommonContentType
  }
}

export function request(
  config: AxiosRequestConfig,
  instance?: AxiosInstance,
  options?: ContentTypeRequestOptions,
): AxiosRequestConfig {
  if (!config) throw new TypeError(`The parameter 'config' for function 'request' is ${typeof config}.`)
  // if (!instance) throw new TypeError(`The parameter 'instance' for function 'request' is ${typeof instance}.`)

  const headerKey = lodashGet(options, 'headerKey', 'Content-Type')
  const fallbackConfigHeaders = lodashGet(options, 'fallbackConfigHeaders', true)

  if (fallbackConfigHeaders) {
    config.headers = attemptFuncWithDefaultAndError(
      fallbackConfigHeaders,
      config.headers,
      config.headers,
      config.headers,
      config,
      instance,
      options,
    ) as AxiosRequestHeaders
    if (config.headers === void 0) config.headers = {}
  }

  const headersContentType = getContentType(config, instance, {
    headerKey,
    type: 'headers',
  })
  const defaultContentType = getContentType(config, instance, {
    headerKey,
    type: 'default',
  })
  if (
    (headersContentType === void 0 && defaultContentType === void 0) ||
    (headersContentType || defaultContentType).includes('application/x-www-form-urlencoded')
  ) {
    if (headersContentType === void 0 && defaultContentType === void 0) {
      ;(config.headers as AxiosRequestHeaders)[headerKey] = 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    if (!Array.isArray(config['transformRequest'])) {
      config['transformRequest'] = [
        function (data) {
          if (!data) return ''
          if (validURLSearchParams(data)) return data.toString()
          if (validArrayBufferView(data)) return data.buffer
          return [
            lodashIsString,
            validFormData,
            lodashIsArrayBuffer,
            lodashIsBuffer,
            validStream,
            validToStringFile,
            validToStringBlob,
          ].some((fn) => fn(data))
            ? data
            : Qs.stringify(data, { arrayFormat: 'brackets' })
        },
      ]
    }
  }
  if (headersContentType === void 0) {
    ;(config.headers as AxiosRequestHeaders)[headerKey] = defaultContentType
  }

  return config
}

export function auto(
  instance: AxiosInstance,
  options?: { defaults?: ContentTypeDefaultsOptions; request?: ContentTypeDefaultsOptions },
): AxiosInstance {
  if (!instance) throw new TypeError(`The parameter 'instance' for function 'auto' is ${typeof instance}.`)

  defaults(instance, lodashGet(options, 'defaults'))

  instance.interceptors.request.use((config) => request(config, instance, lodashGet(options, 'request')))

  return instance
}
