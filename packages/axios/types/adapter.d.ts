/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-21 10:39:44
 * @LastEditTime: 2021-11-11 14:06:19
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

declare interface RequestManagerOptions {
  debug?: boolean | ((message: string) => unknown)
}

declare interface RequestManagerLike {
  add?: () => unknown
  set?: () => unknown
  remove?: () => unknown
  delete?: () => unknown
  del?: () => unknown
  cancel: () => unknown
  cancelAll?: () => unknown
  clear?: () => unknown
  get?: () => unknown
  has?: () => unknown
}

declare interface CancelWrapperOptions {
  /**
   * @remarks
   *
   * 生成 key 的方法
   */
  cancelKey?:
    | string
    | null
    | ((
        metaData: Partial<Pick<AxiosRequestConfig, 'baseURL' | 'data' | 'method' | 'params' | 'url'>>,
        key: string,
        requestManager: RequestManagerLike,
        options: CancelWrapperOptions,
        config: AxiosRequestConfig,
      ) => string | null | undefined)
  /**
   * @remarks
   *
   * 生成 key 的方法，在 config 中的 PropertyPath
   */
  cancelKeyPath?: string | string[]
  /**
   * @remarks
   *
   * 禁用缓存
   */
  disableCancel?: boolean | null
  /**
   * @remarks
   *
   * 禁用缓存，在 config 中的 PropertyPath
   */
  disableCancelPath?: string | string[]
  /**
   * @remarks
   *
   * 启用缓存
   */
  enableCancel?: boolean | null
  /**
   * @remarks
   *
   * 启用缓存，在 config 中的 PropertyPath
   */
  enableCancelPath?: string | string[]
  /**
   * @remarks
   *
   * 默认启用
   */
  enabledByDefault?: boolean | ((options: CacheWrapperOptions, config: AxiosRequestConfig) => boolean)
  /**
   * @remarks
   *
   * 缓存添加时的回调函数
   */
  onCancelerCreate?: (
    metaData: [string, (reason?: string) => void],
    requestManager: RequestManagerLike,
    options: CancelWrapperOptions,
    config: AxiosRequestConfig,
  ) => void
  /**
   * @remarks
   *
   * 缓存添加时的回调函数，在 config 中的 PropertyPath
   */
  onCancelerCreatePath?: string | string[]
  /**
   * @remarks
   *
   * 自定义使用的 cache
   */
  requestManager?: RequestManagerLike
  /**
   * @remarks
   *
   * 自定义使用的 cache，在 config 中的 PropertyPath
   */
  requestManagerPath?: string | string[]
  /**
   * @remarks
   *
   * 自定义使用的 cache
   */
  requestManagerOptions?: RequestManagerOptions
  /**
   * @remarks
   *
   * 自定义使用的 cache，在 config 中的 PropertyPath
   */
  requestManagerOptionsPath?: string | string[]
}
