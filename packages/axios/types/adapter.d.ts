/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-21 10:39:44
 * @LastEditTime: 2021-10-28 14:16:49
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\types\adapter.d.ts
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
