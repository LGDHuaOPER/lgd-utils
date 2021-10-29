/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-21 10:39:44
 * @LastEditTime: 2021-10-29 10:10:42
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\types\adapter.d.ts
 */

declare interface CacheWrapperOptions {
  /**
   * @remarks
   *
   * 当 reject 时删除缓存的行为
   */
  cacheDelWhenError?:
    | boolean
    | ((
        reason: unknown,
        key: string,
        cache: CacheLike<AxiosPromise>,
        options: CacheWrapperOptions,
        config: AxiosRequestConfig,
      ) => void)
    | string
    | unknown
  /**
   * @remarks
   *
   * 当 reject 时删除缓存的行为，在 config 中的 PropertyPath
   */
  cacheDelWhenErrorPath?: string | string[]
  /**
   * @remarks
   *
   * 生成 key 的方法
   */
  cacheKey?:
    | string
    | null
    | ((
        metaData: Partial<Pick<AxiosRequestConfig, 'baseURL' | 'data' | 'method' | 'params' | 'url'>>,
        key: string,
        cache: CacheLike<AxiosPromise>,
        options: CacheWrapperOptions,
        config: AxiosRequestConfig,
      ) => string | null | undefined)
  /**
   * @remarks
   *
   * 生成 key 的方法，在 config 中的 PropertyPath
   */
  cacheKeyPath?: string | string[]
  /**
   * @remarks
   *
   * 设置缓存时的 maxAge 参数
   */
  cacheSetArgMaxAge?:
    | number
    | ((
        key: string,
        cache: CacheLike<AxiosPromise>,
        options: CacheWrapperOptions,
        config: AxiosRequestConfig,
      ) => number | undefined)
  /**
   * @remarks
   *
   * 设置缓存时的 maxAge 参数，在 config 中的 PropertyPath
   */
  cacheSetArgMaxAgePath?: string | string[]
  /**
   * @remarks
   *
   * 默认使用的 cache
   */
  defaultUseCache?: CacheLike<AxiosPromise>
  /**
   * @remarks
   *
   * 禁用缓存
   */
  disableCache?: boolean | null
  /**
   * @remarks
   *
   * 禁用缓存，在 config 中的 PropertyPath
   */
  disableCachePath?: string | string[]
  /**
   * @remarks
   *
   * 启用缓存
   */
  enableCache?: boolean | null
  /**
   * @remarks
   *
   * 启用缓存，在 config 中的 PropertyPath
   */
  enableCachePath?: string | string[]
  /**
   * @remarks
   *
   * 默认启用
   */
  enabledByDefault?: boolean | ((options: CacheWrapperOptions, config: AxiosRequestConfig) => boolean)
  /**
   * @remarks
   *
   * 强制刷新缓存
   */
  forceUpdateCache?: boolean
  /**
   * @remarks
   *
   * 强制刷新缓存，在 config 中的 PropertyPath
   */
  forceUpdateCachePath?: string | string[]
  /**
   * @remarks
   *
   * 缓存添加时的回调函数
   */
  onCacheAdd?: (
    metaData: [string, () => void],
    cache: CacheLike<AxiosPromise>,
    options: CacheWrapperOptions,
    config: AxiosRequestConfig,
  ) => void
  /**
   * @remarks
   *
   * 缓存添加时的回调函数，在 config 中的 PropertyPath
   */
  onCacheAddPath?: string | string[]
  /**
   * @remarks
   *
   * 自定义使用的 cache
   */
  useCache?: CacheLike<AxiosPromise>
  /**
   * @remarks
   *
   * 自定义使用的 cache，在 config 中的 PropertyPath
   */
  useCachePath?: string | string[]
}
