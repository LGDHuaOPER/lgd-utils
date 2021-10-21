/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-21 10:39:44
 * @LastEditTime: 2021-10-21 11:16:54
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\types\axios.d.ts
 */

declare interface CacheWrapperOptions {
  cacheDelWhenErrorPath?: string | string[]
  cacheKeyPath?: string | string[]
  cacheSetArgMaxAgePath?: string | string[]
  defaultUseCache?: CacheLike<AxiosPromise>
  disableCachePath?: string | string[]
  enableCachePath?: string | string[]
  enabledByDefault?: boolean | ((options: CacheWrapperOptions, config: AxiosRequestConfig) => boolean)
  forceUpdateCachePath?: string | string[]
  onCacheAddPath?: string | string[]
  useCachePath?: string | string[]
}

declare module 'axios/lib/helpers/buildURL' {
  export as namespace buildURL
  export = buildURL
  declare function buildURL(
    url: string,
    params?: Record<string, unknown>,
    paramsSerializer?: (params: Record<string, unknown>) => string,
  ): string
}

declare module 'axios/lib/core/buildFullPath' {
  export as namespace buildFullPath
  export = buildFullPath
  declare function buildFullPath(baseURL?: string, requestedURL?: string): string
}
