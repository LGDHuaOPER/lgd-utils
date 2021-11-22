/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-27 17:43:26
 * @LastEditTime: 2021-11-22 14:49:40
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\src\middleware\mergeHeaders.ts
 */

import lodashGet from 'lodash/get'
import lodashIsFunction from 'lodash/isFunction'
import lodashIsNil from 'lodash/isNil'
import lodashMergeWith from 'lodash/mergeWith'

import { omitOwnDeepBy } from '@lgd-utils/object'
import { defaultDropPropsSymbol } from '@lgd-utils/symbol'
import { attemptFuncWithError, partialEq, undefinedTo } from '@lgd-utils/utils'

import { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

export default function mergeHeaders(
  config: AxiosRequestConfig,
  instance?: AxiosInstance,
  options?: MergeHeadersOptions,
): AxiosRequestConfig {
  if (!config) throw new TypeError(`The parameter 'config' for function 'mergeHeaders' is ${typeof config}.`)
  // if (!instance) throw new TypeError(`The parameter 'instance' for function 'mergeHeaders' is ${typeof instance}.`)

  const _mergeCustomizer = lodashGet(options, 'mergeCustomizer')
  const mergeCustomizer = lodashIsFunction(_mergeCustomizer)
    ? _mergeCustomizer
    : (((
        objValue: unknown,
        srcValue: MergeHeadersMergeCustomizerSrcValueFn | unknown,
        key: string,
        object: Record<string, unknown>,
        source: Record<string, unknown>,
        stack: unknown,
      ) =>
        attemptFuncWithError(
          srcValue,
          undefinedTo(objValue, defaultDropPropsSymbol),
          // headers function 类型的自定义处理器的元数据
          lodashGet(options, 'customHandlerMetaData'),
          objValue,
          srcValue,
          key,
          object,
          source,
          stack,
        )) as MergeHeadersMergeCustomizer)

  const mergeWithArgs = [
    ...[lodashGet(options, 'mergeWithUnShiftArg')],
    config.headers,
    lodashGet(options, 'customHeaders'),
    mergeCustomizer,
  ].filter((v) => !lodashIsNil(v)) as Parameters<typeof lodashMergeWith>
  lodashMergeWith(...mergeWithArgs)

  config.headers = omitOwnDeepBy(
    config.headers,
    lodashGet(options, 'omitOwnDeepByArgPredicate', partialEq(defaultDropPropsSymbol)),
    lodashGet(options, 'omitOwnDeepByArgOptions', { enableEmptyObject: false }),
  ) as AxiosRequestHeaders

  return config
}

mergeHeaders.auto = function auto(
  instance: AxiosInstance,
  options?: {
    default?: MergeHeadersOptions
  },
): AxiosInstance {
  if (!instance) throw new TypeError(`The parameter 'instance' for function 'auto' is ${typeof instance}.`)

  instance.interceptors.request.use((config) => mergeHeaders(config, instance, lodashGet(options, 'default', options)))

  return instance
}
