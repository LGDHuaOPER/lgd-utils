/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-27 19:20:47
 * @LastEditTime: 2021-11-22 14:44:20
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\src\middleware\runtimeInterceptor.ts
 */

import lodashDefaultTo from 'lodash/defaultTo'
import lodashGet from 'lodash/get'
import lodashIsString from 'lodash/isString'
import lodashOnce from 'lodash/once'

import { waterfall } from '@lgd-utils/array'
import {
  attemptFuncWithDefaultAndError,
  attemptFuncWithError,
  attemptFuncWithLazyDefault,
  attemptFuncWithLazyDefaultAndLazyError,
  disableEnable,
  nilTo,
} from '@lgd-utils/utils'

import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export function requestFulfilled(
  config: AxiosRequestConfig,
  instance?: AxiosInstance,
  options?: RuntimeInterceptorRequestFulfilledOptions,
): AxiosRequestConfig {
  if (!config) throw new TypeError(`The parameter 'config' for function 'requestFulfilled' is ${typeof config}.`)
  // if (!instance) throw new TypeError(`The parameter 'instance' for function 'requestFulfilled' is ${typeof instance}.`)

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

  return waterfall(lodashGet(options, 'interceptor'), config) as AxiosRequestConfig
}

export function responseFulfilled(
  responseOrError: AxiosResponse | unknown,
  instance?: AxiosInstance,
  options?: RuntimeInterceptorResponseFulfilledOptions,
): AxiosResponse | unknown {
  // if (!responseOrError)
  //   throw new TypeError(
  //     `The parameter 'responseOrError' for function 'responseFulfilled' is ${typeof responseOrError}.`,
  //   )
  // if (!instance) throw new TypeError(`The parameter 'instance' for function 'responseFulfilled' is ${typeof instance}.`)

  // 如果是 disabled，则不处理
  if (
    !disableEnable(
      attemptFuncWithError(lodashGet(options, 'disable'), false, responseOrError, instance, options) as
        | boolean
        | null
        | undefined,
      attemptFuncWithError(lodashGet(options, 'enable'), true, responseOrError, instance, options) as
        | boolean
        | null
        | undefined,
      nilTo(lodashGet(options, 'enabledByDefault'), true) as boolean,
    )
  )
    return responseOrError

  return waterfall(lodashGet(options, 'interceptor'), responseOrError) as AxiosResponse | unknown
}

export function responseFulfilledWrapper(
  responseOrError: AxiosResponse,
  instance?: AxiosInstance,
  options?: RuntimeInterceptorResponseFulfilledWrapperOptions,
): AxiosResponse | unknown | Promise<AxiosResponse | unknown> {
  // if (!responseOrError)
  //   throw new TypeError(
  //     `The parameter 'responseOrError' for function 'responseFulfilledWrapper' is ${typeof responseOrError}.`,
  //   )
  // if (!instance) throw new TypeError(`The parameter 'instance' for function 'responseFulfilledWrapper' is ${typeof instance}.`)

  // 如果是 disabled，则不处理
  if (
    !disableEnable(
      attemptFuncWithError(lodashGet(options, 'disable'), false, responseOrError, instance, options) as
        | boolean
        | null
        | undefined,
      attemptFuncWithError(lodashGet(options, 'enable'), true, responseOrError, instance, options) as
        | boolean
        | null
        | undefined,
      nilTo(lodashGet(options, 'enabledByDefault'), true) as boolean,
    )
  )
    return responseOrError

  const assertSuccess = lodashGet(options, 'assertSuccess')
  const config = lodashGet(options, 'config')
  const defaultResponseDataKey = lodashGet(options, 'defaultResponseDataKey')
  const fulfilledInterceptor = lodashGet(options, 'interceptor.fulfilled') as RuntimeInterceptorFns
  const responseDataDefaultValue = lodashGet(options, 'responseDataDefaultValue')
  const responseDataKey = lodashGet(options, 'responseDataKey')

  if (attemptFuncWithError(assertSuccess, false, responseOrError, config)) {
    let _responseDataKey = attemptFuncWithError(responseDataKey, null, responseOrError, config) as
      | boolean
      | null
      | string
      | string[]
      | undefined
    if (
      [null, '', false].includes(_responseDataKey as null | string | boolean) ||
      (Array.isArray(_responseDataKey) && !_responseDataKey.length)
    ) {
      return responseFulfilled(responseOrError.data, instance, {
        interceptor: fulfilledInterceptor,
      })
    }

    if (
      [void 0, true].includes(_responseDataKey as undefined | boolean) ||
      (!lodashIsString(_responseDataKey) && !Array.isArray(_responseDataKey))
    )
      _responseDataKey = defaultResponseDataKey
    const responseData = lodashGet(responseOrError.data, _responseDataKey as string | string[])
    const _responseDataDefaultValue = attemptFuncWithError(responseDataDefaultValue, void 0, responseOrError, config)

    return responseFulfilled(
      _responseDataDefaultValue === void 0 ? responseData : lodashDefaultTo(responseData, _responseDataDefaultValue),
      instance,
      {
        interceptor: fulfilledInterceptor,
      },
    )
  }

  const defaultErrorMessage = lodashGet(options, 'defaultErrorMessage')
  const defaultErrorMessageKey = lodashGet(options, 'defaultErrorMessageKey')
  const errorMessageKey = lodashGet(options, 'errorMessageKey')
  const reject4error = lodashGet(options, 'reject4error')
  const rejectedInterceptor = lodashGet(options, 'interceptor.rejected') as RuntimeInterceptorFns

  let _errorMessageKey = attemptFuncWithError(errorMessageKey, null, responseOrError, config) as
    | string
    | string[]
    | undefined
  if (!lodashIsString(_errorMessageKey) && !Array.isArray(_errorMessageKey)) _errorMessageKey = defaultErrorMessageKey
  const _error = Object.assign(responseOrError.data, {
    errorMessage: lodashGet(responseOrError.data, _errorMessageKey as string | string[], defaultErrorMessage),
  })
  const responseRejectedOnce = lodashOnce((responseOrError) =>
    responseRejected(responseOrError, instance, {
      interceptor: rejectedInterceptor,
    }),
  )

  return attemptFuncWithLazyDefault(
    reject4error,
    () => Promise[reject4error ? 'reject' : 'resolve'](responseRejectedOnce(_error)),
    responseRejectedOnce(_error),
  )
}

export function responseRejected(
  responseOrError: AxiosResponse | AxiosError | unknown,
  instance?: AxiosInstance,
  options?: RuntimeInterceptorResponseRejectedOptions,
): AxiosResponse | AxiosError | unknown {
  // if (!responseOrError)
  //   throw new TypeError(`The parameter 'responseOrError' for function 'responseRejected' is ${typeof responseOrError}.`)
  // if (!instance) throw new TypeError(`The parameter 'instance' for function 'responseRejected' is ${typeof instance}.`)

  // 如果是 disabled，则不处理
  if (
    !disableEnable(
      attemptFuncWithError(lodashGet(options, 'disable'), false, responseOrError, instance, options) as
        | boolean
        | null
        | undefined,
      attemptFuncWithError(lodashGet(options, 'enable'), true, responseOrError, instance, options) as
        | boolean
        | null
        | undefined,
      nilTo(lodashGet(options, 'enabledByDefault'), true) as boolean,
    )
  )
    return responseOrError

  return waterfall(lodashGet(options, 'interceptor'), responseOrError) as AxiosResponse | AxiosError | unknown
}

export function responseRejectedWrapper(
  responseOrError: AxiosError | unknown,
  instance?: AxiosInstance,
  options?: RuntimeInterceptorResponseRejectedWrapper,
): AxiosError | unknown | Promise<AxiosError | unknown> {
  // if (!responseOrError) throw new TypeError(`The parameter 'responseOrError' for function 'responseRejectedWrapper' is ${typeof responseOrError}.`)
  // if (!instance) throw new TypeError(`The parameter 'instance' for function 'responseRejectedWrapper' is ${typeof instance}.`)

  const hookNames = []
  let returnV

  if (!responseOrError) {
    const hookName = 'emptyErrorHook'
    returnV = attemptFuncWithLazyDefaultAndLazyError(
      lodashGet(options, hookName),
      () => Promise.reject(responseOrError),
      () => Promise.reject(responseOrError),
      responseOrError,
    )
    hookNames.push(hookName)
  } else if ((responseOrError as AxiosError).response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (responseOrError instanceof Error && (responseOrError as AxiosError).isAxiosError) {
      const done = (
        rejectedInterceptor: RuntimeInterceptorFns,
        reject4error:
          | boolean
          | ((responseOrError: AxiosError | unknown) => AxiosError | unknown | Promise<AxiosError | unknown>),
      ) => {
        const responseRejectedOnce = lodashOnce((responseOrError) =>
          responseRejected(responseOrError, instance, {
            interceptor: rejectedInterceptor,
          }),
        )

        return attemptFuncWithLazyDefault(
          reject4error,
          () => Promise[reject4error ? 'reject' : 'resolve'](responseRejectedOnce(responseOrError)),
          responseRejectedOnce(responseOrError),
        )
      }
      const hookName = 'isAxiosErrorHook'
      returnV = attemptFuncWithLazyDefaultAndLazyError(
        lodashGet(options, hookName),
        () => Promise.reject((responseOrError as AxiosError).response),
        () => Promise.reject((responseOrError as AxiosError).response),
        (responseOrError as AxiosError).response,
        responseOrError,
        done,
      )
      hookNames.push(hookName)
    } else {
      const hookName = 'hasResponseNotAxiosErrorHook'
      returnV = attemptFuncWithLazyDefaultAndLazyError(
        lodashGet(options, hookName),
        () => Promise.reject((responseOrError as AxiosError).response),
        () => Promise.reject((responseOrError as AxiosError).response),
        (responseOrError as AxiosError).response,
        responseOrError,
      )
      hookNames.push(hookName)
    }
  } else if ((responseOrError as AxiosError).request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    const hookName = 'hasRequestHook'
    returnV = attemptFuncWithLazyDefaultAndLazyError(
      lodashGet(options, hookName),
      () => Promise.reject((responseOrError as AxiosError).request),
      () => Promise.reject((responseOrError as AxiosError).request),
      (responseOrError as AxiosError).request,
      responseOrError,
    )
    hookNames.push(hookName)
  } else {
    // Something happened in setting up the request that triggered an Error
    const hookName = 'otherErrorHook'
    returnV = attemptFuncWithLazyDefaultAndLazyError(
      lodashGet(options, hookName),
      () => Promise.reject(responseOrError),
      () => Promise.reject(responseOrError),
      responseOrError,
    )
    hookNames.push(hookName)
  }

  return attemptFuncWithDefaultAndError(
    lodashGet(options, 'assertUseDefaultHook'),
    returnV === void 0,
    returnV === void 0,
    returnV,
    hookNames,
  )
    ? attemptFuncWithLazyDefaultAndLazyError(
        lodashGet(options, 'defaultHook'),
        () => Promise.reject(responseOrError),
        () => Promise.reject(responseOrError),
        responseOrError,
      )
    : returnV
}
