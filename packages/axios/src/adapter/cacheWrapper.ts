/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-21 10:20:25
 * @LastEditTime: 2021-10-21 14:53:50
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\src\adapter\cacheWrapper.ts
 */

import LRU from 'lru-cache'
import buildFullPath from 'axios/lib/core/buildFullPath'
import buildURL from 'axios/lib/helpers/buildURL'
import lodashGet from 'lodash/get'
import lodashIsFunction from 'lodash/isFunction'
import lodashIsString from 'lodash/isString'
import { AxiosAdapter, AxiosRequestConfig, default as axios } from 'axios'

import { disableEnable, nilTo, attemptFunc, assertValue } from '@lgd-utils/utils'
import { validCacheLike } from '@lgd-utils/validate'
import { omitNil, sortObjectByProp } from '@lgd-utils/object'

export default function cacheWrapper(
  adapter: AxiosAdapter | undefined = axios.defaults.adapter,
  options: CacheWrapperOptions | undefined = {},
): AxiosAdapter {
  const {
    cacheDelWhenErrorPath = 'cacheDelWhenError',
    cacheKeyPath = 'cacheKey',
    cacheSetArgMaxAgePath = 'cacheSetArgMaxAge',
    defaultUseCache = new LRU({
      max: 100,
      maxAge: 1000 * 60 * 5,
    }),
    disableCachePath = 'disableCache',
    enableCachePath = 'enableCache',
    enabledByDefault,
    forceUpdateCachePath = 'forceUpdateCache',
    onCacheAddPath = 'onCacheAdd',
    useCachePath = 'useCache',
  } = options

  return (config: AxiosRequestConfig) => {
    const { baseURL, data, method, params, paramsSerializer, url } = config
    const cacheDelWhenError = lodashGet(config, cacheDelWhenErrorPath, true)
    const cacheKey = lodashGet(config, cacheKeyPath)
    const cacheSetArgMaxAge = lodashGet(config, cacheSetArgMaxAgePath)
    const disableCache = lodashGet(config, disableCachePath)
    const enableCache = lodashGet(config, enableCachePath)
    const forceUpdateCache = lodashGet(config, forceUpdateCachePath)
    const onCacheAdd = lodashGet(config, onCacheAddPath)
    const useCache = lodashGet(config, useCachePath)
    const _enabledByDefault = attemptFunc(enabledByDefault, options, config)
    const _enableCache = ['get', void 0].includes(method)
      ? disableEnable(disableCache, enableCache, nilTo(_enabledByDefault as boolean | undefined, true) as boolean, {
          firstAssert: 'DISABLE',
        })
      : disableEnable(disableCache, enableCache, nilTo(_enabledByDefault as boolean | undefined, false) as boolean)

    if (_enableCache) {
      const cache = validCacheLike(useCache) ? useCache : defaultUseCache

      const _key = buildURL(buildFullPath(baseURL, url), sortObjectByProp(params), paramsSerializer)
      const key = nilTo(
        attemptFunc(
          cacheKey,
          omitNil({
            baseURL,
            data,
            method,
            params,
            url,
          }),
          _key,
          cache,
          options,
          config,
        ),
        _key,
      )

      let responsePromise = cache.get(key)

      if (!responsePromise || forceUpdateCache) {
        responsePromise = (async () => {
          try {
            return await (adapter as AxiosAdapter)(config)
          } catch (reason) {
            if (cacheDelWhenError === true) {
              cache.del(key)
            } else if (lodashIsFunction(cacheDelWhenError)) {
              cacheDelWhenError(reason, key, cache, options, config)
            } else if (lodashIsString(cacheDelWhenError)) {
              cache.del(cacheDelWhenError)
            } else {
              cache.keys().forEach((_k: string) => {
                if (assertValue(_k, cacheDelWhenError)) {
                  cache.del(_k)
                }
              })
            }

            throw reason
          }
        })()

        const maxAge = attemptFunc(cacheSetArgMaxAge, key, cache, options, config)
        cache.set(key, responsePromise, maxAge)
        attemptFunc(onCacheAdd, [key, () => cache.del(key)], cache, options, config)

        return responsePromise
      }

      return responsePromise
    }

    return (adapter as AxiosAdapter)(config)
  }
}
