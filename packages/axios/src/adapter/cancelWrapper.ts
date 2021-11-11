/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-21 10:20:25
 * @LastEditTime: 2021-11-11 18:26:18
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\src\adapter\cancelWrapper.ts
 */

import buildFullPath from 'axios/lib/core/buildFullPath'
import buildURL from 'axios/lib/helpers/buildURL'
import lodashGet from 'lodash/get'
import { AxiosAdapter, AxiosRequestConfig, default as axios } from 'axios'

import { disableEnable, nilTo, attemptFunc, undefinedTo } from '@lgd-utils/utils'
import { omitNil, sortObjectByProp } from '@lgd-utils/object'

import RequestManager from './_RequestManager'

/**
 * @remarks
 * The cancelWrapper adapter for axios
 *
 * @defaultValue `axios.defaults.adapter`
 * @param adapter - The axios adapter
 * @typeParam adapter - AxiosAdapter | undefined
 * @defaultValue `{}`
 * @param options - The options for cancelWrapper
 * @typeParam options - CancelWrapperOptions | undefined
 * @returns The wrapper for axios adapter - (config: AxiosRequestConfig) =\> AxiosPromise<any>
 */
export default function cancelWrapper(
  adapter: AxiosAdapter | undefined = axios.defaults.adapter,
  options: CancelWrapperOptions | undefined = {},
): AxiosAdapter {
  const {
    cancelKey: optionsCancelKey,
    cancelKeyPath = 'cancelKey',
    disableCancel: optionsDisableCancel,
    disableCancelPath = 'disableCancel',
    enableCancel: optionsEnableCancel,
    enableCancelPath = 'enableCancel',
    enabledByDefault,
    onCancelerCreate: optionsOnCancelerCreate,
    onCancelerCreatePath = 'onCancelerCreate',
    requestManager: optionsRequestManager,
    requestManagerPath = 'requestManager',
    requestManagerOptions: optionsRequestManagerOptions,
    requestManagerOptionsPath = 'requestManagerOptions',
  } = options

  return (config: AxiosRequestConfig) => {
    const { baseURL, data, method, params, paramsSerializer, url } = config
    const cancelKey = lodashGet(config, cancelKeyPath, optionsCancelKey)
    const disableCancel = lodashGet(config, disableCancelPath, optionsDisableCancel)
    const enableCancel = lodashGet(config, enableCancelPath, optionsEnableCancel)
    const onCancelerCreate = lodashGet(config, onCancelerCreatePath, optionsOnCancelerCreate)

    const _enabledByDefault = attemptFunc(enabledByDefault, options, config)
    const _enableCancel = disableEnable(
      disableCancel,
      enableCancel,
      nilTo(_enabledByDefault as boolean | undefined, true) as boolean,
      {
        firstAssert: 'DISABLE',
      },
    )

    if (_enableCancel) {
      const _requestManager = lodashGet(config, requestManagerPath, optionsRequestManager)
      const requestManager = RequestManager.validate(_requestManager)
        ? _requestManager
        : new RequestManager({
            debug: false,
            ...lodashGet(config, requestManagerOptionsPath, undefinedTo(optionsRequestManagerOptions, {})),
          })

      const _key = `${buildURL(
        buildFullPath(baseURL, url),
        sortObjectByProp(params),
        paramsSerializer,
      )}!!${JSON.stringify(sortObjectByProp(data))}!!`
      const key = nilTo(
        attemptFunc(
          cancelKey,
          omitNil({
            baseURL,
            data,
            method,
            params,
            url,
          }),
          _key,
          requestManager,
          options,
          config,
        ),
        _key,
      )

      if (key) {
        return (async () => {
          try {
            const source = axios.CancelToken.source()
            attemptFunc(
              onCancelerCreate,
              [key, (reason: string) => requestManager.cancel(key, reason)],
              requestManager,
              options,
              config,
            )
            config.cancelToken = source.token
            ;(requestManager.add || requestManager.set)(key, source.cancel)

            const responseData = await (adapter as AxiosAdapter)(config)
            requestManager.cancel(key)

            return responseData
          } catch (reason) {
            requestManager.cancel(key)

            throw reason
          }
        })()
      }
    }

    return (adapter as AxiosAdapter)(config)
  }
}
