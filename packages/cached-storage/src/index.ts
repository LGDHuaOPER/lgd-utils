/**
 * CachedStorage
 *
 * @remarks
 * 具有失效功能的缓存存储
 *
 * @packageDocumentation
 */

/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-06-09 21:04:24
 * @LastEditTime: 2021-09-15 18:20:21
 * @LastEditors: shiconghua
 * @Description: 具有失效功能的缓存存储
 * @FilePath: \lgd-utils\packages\cached-storage\src\index.ts
 */

import globalthis from 'globalthis'
import lodashFilter from 'lodash/filter'
import lodashFlatten from 'lodash/flatten'
import lodashForEach from 'lodash/forEach'
import lodashIncludes from 'lodash/includes'
import lodashKeys from 'lodash/keys'
import lodashMap from 'lodash/map'
import lodashReduce from 'lodash/reduce'
import lodashUniq from 'lodash/uniq'
import MemoryStorage from 'memorystorage'

import { validToStringType } from '@lgd-utils/validate'

const globalThis: ReturnType<typeof globalthis> & {
  [propName: string]: unknown
} = globalthis()
// will default to a globally shared storage object.
const memoryStorage = MemoryStorage()

export { CachedStorage, MemoryStorage, memoryStorage }

/**
 * Class CachedStorage
 * @public
 */
export default class CachedStorage {
  static buildKey(instance: CachedStorage, ...keys: string[]): string {
    const resultKey = lodashReduce(
      keys,
      function (_result: string, _key: string) {
        if (_key !== '') _result += `${instance.keySeparator}${_key}`

        return _result
      },
      '',
    )

    return CachedStorage.compressHandler(instance, resultKey.replace(/^::/, ''))
  }

  static calculateMaxDate(instance: CachedStorage, expiryMilliseconds: number): number {
    return Math.floor(8.64e15 / expiryMilliseconds)
  }

  static compressHandler(instance: CachedStorage, string: string): string {
    if (!validToStringType(string, 'String') || string === '') return ''
    const _compressHandler = function (
      compressHandler: CachedStorageInstanceCompressTypeFunction,
      string: string,
    ): string {
      if (validToStringType(compressHandler, 'Function'))
        return (compressHandler as CachedStorageInstanceCompressTypeFunction)(string)
      return string
    }

    if (validToStringType(instance.compress, 'Object'))
      return _compressHandler((instance.compress as CachedStorageInstanceCompressTypeObject)[instance.bucket], string)
    return _compressHandler(<CachedStorageInstanceCompressTypeFunction>instance.compress, string)
  }

  static decompressHandler(instance: CachedStorage, string: string): null | string {
    if (!validToStringType(string, 'String') || string === '') return ''
    const _decompressHandler = function (
      decompressHandler: CachedStorageInstanceDecompressTypeFunction,
      string: string,
    ): null | string {
      if (validToStringType(decompressHandler, 'Function'))
        return (decompressHandler as CachedStorageInstanceDecompressTypeFunction)(string)
      return string
    }

    if (validToStringType(instance.decompress, 'Object'))
      return _decompressHandler(
        (instance.decompress as CachedStorageInstanceDecompressTypeObject)[instance.bucket],
        string,
      )
    return _decompressHandler(<CachedStorageInstanceDecompressTypeFunction>instance.decompress, string)
  }

  /**
   * Returns the number of minutes since the epoch.
   * @returns number
   */
  static currentTime(instance: CachedStorage): number {
    return Math.floor(new Date().getTime() / instance.expiryMilliseconds)
  }

  /**
   * Returns a string where all RegExp special characters are escaped with a \.
   * @typeParam text - string
   * @returns string
   */
  static escapeRegExpSpecialCharacters(instance: CachedStorage, text: string): string {
    return text.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&')
  }

  /**
   * Returns the full string for the localStorage/sessionStorage/memoryStorage expiration item.
   * @typeParam key - string
   * @returns string
   */
  static expirationKey(instance: CachedStorage, key: string): string {
    return CachedStorage.buildKey(instance, key, instance.cacheSuffix)
  }

  static eachKey(instance: CachedStorage, fn: (key: string, exprKey?: string) => void, bucket?: string): void {
    const prefixRegExp = new RegExp(
      '^' +
        CachedStorage.buildKey(
          instance,
          instance.cachePrefix,
          CachedStorage.escapeRegExpSpecialCharacters(instance, CachedStorage.getBucket(instance, bucket)),
        ) +
        instance.keySeparator +
        '(.*)',
    )
    // Loop in reverse as removing items will change indices of tail
    for (let i = instance.storage.length - 1; i >= 0; --i) {
      let key: string | null | undefined | RegExpMatchArray = instance.key(i)
      key = key && key.match(prefixRegExp)
      key = key && key[1]
      if (key && key.indexOf(instance.cacheSuffix) < 0) {
        fn(key, CachedStorage.expirationKey(instance, key))
      }
    }
  }

  static flushExpiredItem(instance: CachedStorage, key: string, bucket?: string): boolean | void {
    const exprKey = CachedStorage.expirationKey(instance, key)
    const expr = CachedStorage.getObjectItem(instance, exprKey, bucket)

    if (expr && (expr as Record<string, string | unknown>).value) {
      const expirationTime = parseInt((expr as Record<string, string>).value, instance.expiryRadix)

      // Check if we should actually kick item out of storage
      if (CachedStorage.currentTime(instance) >= expirationTime) {
        CachedStorage.removeItem(instance, key, bucket)
        CachedStorage.removeItem(instance, exprKey, bucket)

        return true
      }
    }
  }

  static flushItem(instance: CachedStorage, key: string, bucket?: string): boolean {
    const exprKey = CachedStorage.expirationKey(instance, key)
    CachedStorage.removeItem(instance, key, bucket)
    CachedStorage.removeItem(instance, exprKey, bucket)

    return true
  }

  static getAvailableBuckets(instance: CachedStorage, buckets?: boolean | string | string[]): string[] {
    const bucketHistory: string[] = lodashUniq(instance.bucketHistory)
    if (buckets === true) return bucketHistory

    let _buckets = [instance.bucket]
    if (Array.isArray(buckets))
      _buckets = lodashFilter(buckets, function (_bucket: string) {
        return validToStringType(_bucket, 'String')
      })
    if (validToStringType(buckets, 'String')) _buckets = [buckets as string]

    return lodashFilter(_buckets, function (_bucket: string) {
      return lodashIncludes(bucketHistory, _bucket)
    })
  }

  static getBucket(instance: CachedStorage, bucket?: string): string {
    return validToStringType(bucket, 'String') ? <string>bucket : instance.bucket
  }

  /**
   * Wrapper functions for localStorage/sessionStorage/memoryStorage methods
   */
  static getItem(instance: CachedStorage, key: string, bucket?: string): null | string {
    if (instance.storage.getItem) {
      const valueStr = instance.storage.getItem(
        CachedStorage.buildKey(instance, instance.cachePrefix, CachedStorage.getBucket(instance, bucket), key),
      )

      if (valueStr == null) return null

      return CachedStorage.decompressHandler(instance, valueStr)
    }

    return null
  }

  static getObjectItem(instance: CachedStorage, key: string, bucket?: string): Record<string, unknown> | null | string {
    const valueStr = CachedStorage.getItem(instance, key, bucket)
    let value = valueStr
    if (valueStr && CachedStorage.supportJSON(instance)) {
      try {
        value = valueStr === 'null' ? valueStr : JSON.parse(valueStr)
      } catch (e) {
        globalThis.console.log(e)
      }
    }

    return value
  }

  // Check to set if the error is us dealing with being out of space
  static isOutOfSpace(instance: CachedStorage, e?: Error | unknown): boolean {
    if (!e) return false
    return lodashIncludes(['QUOTA_EXCEEDED_ERR', 'NS_ERROR_DOM_QUOTA_REACHED', 'QuotaExceededError'], (e as Error).name)
  }

  /**
   * Wrapper functions for localStorage/sessionStorage/memoryStorage methods
   */
  static removeItem(instance: CachedStorage, key: string, bucket?: string): boolean {
    if (!instance.storage.removeItem) return false

    const _key = CachedStorage.buildKey(instance, instance.cachePrefix, CachedStorage.getBucket(instance, bucket), key)
    let step = 1

    if (instance.storage.getItem(_key) == null) step = 0
    instance.storage.removeItem(_key)
    instance.length -= step
    if (instance.length < 0) instance.length = 0

    return true
  }

  /**
   * Wrapper functions for localStorage/sessionStorage/memoryStorage methods
   */
  static setItem(instance: CachedStorage, key: string, value: string, bucket?: string): boolean {
    if (!instance.storage.getItem || !instance.storage.removeItem || !instance.storage.setItem) return false
    const _key = CachedStorage.buildKey(instance, instance.cachePrefix, CachedStorage.getBucket(instance, bucket), key)
    let step = 1
    if (instance.storage.getItem(_key) != null) step = 0
    // Fix for iPad issue - sometimes throws QUOTA_EXCEEDED_ERR on setItem.
    instance.storage.removeItem(_key)
    instance.storage.setItem(_key, CachedStorage.compressHandler(instance, value))
    instance.length += step

    return true
  }

  // Determines if native JSON (de-)serialization is supported in the browser.
  static supportJSON(instance: CachedStorage): boolean | void {
    if (instance.isSupportJSON === undefined) {
      instance.isSupportJSON = globalThis.JSON != null
    }

    return instance.isSupportJSON
  }

  // Determines if localStorage/sessionStorage/memoryStorage is supported in the browser;
  // result is cached for better performance instead of being run each time.
  // Feature detection is based on how Modernizr does it;
  // it's not straightforward due to FF4 issues.
  // It's not run at parse-time as it takes 200ms in Android.
  static supportStorage(instance: CachedStorage): boolean {
    const key = '__CachedStorageTestKey__'
    const value = key

    if (instance.isSupportStorage !== undefined) {
      return instance.isSupportStorage as boolean
    }

    // some browsers will throw an error if you try to access local storage (e.g. brave browser)
    // hence check is inside a try/catch
    try {
      if (!instance.storage) {
        return false
      }
    } catch (ex) {
      return false
    }

    try {
      instance.storage.setItem(key, value)
      instance.storage.removeItem(key)
      instance.isSupportStorage = true
    } catch (e) {
      // If we hit the limit, and we don't have an empty localStorage/sessionStorage/memoryStorage then it means we have support
      if (CachedStorage.isOutOfSpace(instance, e) && instance.storage.length) {
        instance.isSupportStorage = true // just maxed it out and even the set test failed.
      } else {
        instance.isSupportStorage = false
      }
    }

    return instance.isSupportStorage
  }

  static warn(instance: CachedStorage, message: string, err?: Error | unknown): void {
    if (!instance.warnings) return
    if (!('console' in globalThis) || typeof globalThis.console.warn !== 'function') return
    globalThis.console.warn(`CachedStorage - ${message}`)
    if (err) globalThis.console.warn(`CachedStorage - The error was: ${(err as Error).message}`)
  }

  constructor(options: CachedStorageConstructorOptions = {}) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    const initAttrsKeys: Array<keyof CachedStorageConstructorOptions> = [
      'bucket',
      'cachePrefix',
      'cacheSuffix',
      'compress',
      'decompress',
      'expiryMilliseconds',
      'expiryRadix',
      'expiryToStringKeys',
      'keySeparator',
      'warnings',
    ]
    lodashForEach(initAttrsKeys, function (_initAttrsKey) {
      if (options[_initAttrsKey] == null) return
      ;(_this[_initAttrsKey] as ValueOf<CachedStorageConstructorOptions>) = options[_initAttrsKey]
    })

    this.bucketHistory.push(this.bucket)

    this.maxDate =
      options.maxDate == null ? new.target.calculateMaxDate(this, this.expiryMilliseconds) : (options.maxDate as number)

    if (validToStringType(options.storage, 'String')) {
      switch ((options.storage as string).toUpperCase()) {
        case 'LOCALSTORAGE':
          this.storage = globalThis.localStorage
          break
        case 'SESSIONSTORAGE':
          this.storage = globalThis.sessionStorage
          break
        case 'MEMORYSTORAGE':
          this.storage = memoryStorage
          break
        default:
          void 0
      }
      if (globalThis[options.storage as string] != null) this.storage = globalThis[options.storage as string] as Storage
    } else {
      if (options.storage != null) this.storage = options.storage as Storage
    }
  }

  /* 不做初始化的部分 */
  /**
   * 桶名和 keys 的记录
   *
   * @public
   */
  public bucketsKeysRecord: Record<string, string[]> = {}

  /**
   * 桶名历史
   *
   * @public
   */
  public bucketHistory: string[] = []

  /**
   * 所选的存储是否支持
   *
   * @public
   */
  public isSupportStorage: boolean | undefined = void 0

  /**
   * 是否支持 JSON
   *
   * @public
   */
  public isSupportJSON: boolean | undefined = void 0

  /**
   * 长度
   *
   * @public
   */
  public length = 0

  /* 可做初始化的部分 */
  /**
   * 桶名
   *
   * @public
   */
  public bucket = ''

  /**
   * Prefix for all CachedStorage keys
   *
   * @public
   */
  public cachePrefix = 'CachedStorage::Common'

  /**
   * Suffix for the key name on the expiration items in localStorage/sessionStorage/memoryStorage
   *
   * @public
   */
  public cacheSuffix = 'CachedStorageExpiration'

  /**
   * 压缩行为
   *
   * @public
   */
  public compress: CachedStorageInstanceCompress = function (str) {
    return str
  }

  /**
   * 解压行为
   *
   * @public
   */
  public decompress: CachedStorageInstanceDecompress = function (str) {
    return str
  }

  /**
   * time resolution in milliseconds
   *
   * @public
   */
  public expiryMilliseconds = 60 * 1000

  /**
   * expiration date radix (set to Base-36 for most space savings)
   *
   * @public
   */
  public expiryRadix = 10

  /**
   * @public
   */
  public expiryToStringKeys = ['toISOString', 'toString', 'valueOf']

  /**
   * 分隔符
   *
   * @public
   */
  public keySeparator = '::'

  /**
   * ECMAScript max Date (epoch + 1e8 days)
   *
   * @public
   */
  public maxDate: number = Math.floor(8.64e15 / (60 * 1000))

  /**
   * 所要使用的存储
   *
   * @public
   */
  public storage: Storage = globalThis.localStorage

  /**
   * 开启 warning
   *
   * @public
   */
  public warnings = false

  /**
   * @remarks
   * 清除
   * @param buckets - 要做清除操作的桶
   * @typeParam buckets - boolean | string | string[] | undefined
   * @param onlyExpired - 是否只清除超期的
   * @typeParam onlyExpired - boolean | undefined
   * @returns 执行操作后的成功与否 - boolean
   */
  public clear(buckets?: boolean | string | string[], onlyExpired?: boolean): boolean {
    return onlyExpired ? this.flushExpired(buckets) : this.flush(buckets)
  }

  /**
   * @remarks
   * Flushes all CachedStorage items and expiry markers without affecting rest of localStorage/sessionStorage/memoryStorage
   * @param buckets - 要做 flush 操作的桶
   * @typeParam buckets - boolean | string | string[] | undefined
   * @returns 执行操作后的成功与否 - boolean
   */
  public flush(buckets?: boolean | string | string[]): boolean {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this

    if (!CachedStorage.supportStorage(_this)) return false

    lodashForEach(CachedStorage.getAvailableBuckets(_this, buckets), function (_bucket) {
      CachedStorage.eachKey(
        _this,
        function (key) {
          CachedStorage.flushItem(_this, key, _bucket)
        },
        _bucket,
      )
    })

    return true
  }

  /**
   * @remarks
   * Flushes expired CachedStorage items and expiry markers without affecting rest of localStorage/sessionStorage/memoryStorage
   * @param buckets - 要做 flush 操作的桶
   * @typeParam buckets - boolean | string | string[] | undefined
   * @returns 执行操作后的成功与否 - boolean
   */
  public flushExpired(buckets?: boolean | string | string[]): boolean {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this

    if (!CachedStorage.supportStorage(_this)) return false

    lodashForEach(CachedStorage.getAvailableBuckets(_this, buckets), function (_bucket: string) {
      CachedStorage.eachKey(
        _this,
        function (key) {
          CachedStorage.flushExpiredItem(_this, key, _bucket)
        },
        _bucket,
      )
    })

    return true
  }

  /**
   * @remarks
   * The currently set number of milliseconds each time unit represents in the set() function's "time" argument.
   * @returns expiryMilliseconds - number
   */
  public getExpiryMilliseconds(): number {
    return this.expiryMilliseconds
  }

  /**
   * @remarks
   * Retrieves specified value from localStorage/sessionStorage/memoryStorage, if not expired.
   * @param key - the key for the item
   * @typeParam key - string
   * @param bucket - bucket
   * @typeParam bucket - string | undefined
   * @returns item - Record\<string, unknown\> | null | string
   */
  public getItem(key: string, bucket?: string): Record<string, unknown> | null | string {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this

    if (!CachedStorage.supportStorage(_this)) return null

    // Return the de-serialized item if not expired
    if (CachedStorage.flushExpiredItem(_this, key, bucket)) return null

    return CachedStorage.getObjectItem(_this, key, bucket)
  }

  /**
   * @remarks
   * Retrieves specified value from localStorage/sessionStorage/memoryStorage, if not expired.
   * @param keys - the keys for the items
   * @typeParam keys - boolean | string | string[] | undefined
   * @param buckets - buckets
   * @typeParam buckets - boolean | string | string[] | undefined
   * @param returnType - 返回类型，未传时作为 List 处理
   * @typeParam returnType - string | undefined
   * @returns items - Record\<string, Record\<string, unknown\>\> | Array\<Record\<string, unknown\>\>
   */
  public getItems(
    keys?: boolean | string | string[],
    buckets?: boolean | string | string[],
    returnType?: string,
  ): Record<string, Record<string, unknown>> | Array<Record<string, unknown>> {
    if (Array.isArray(keys)) {
      keys = lodashFilter(keys, function (_key: string) {
        return validToStringType(_key, 'String')
      })
    } else if (validToStringType(keys, 'String')) {
      keys = [keys as string]
    } else if (keys === true) {
      keys = true
    } else {
      keys = []
    }
    if (Array.isArray(buckets)) {
      buckets = lodashFilter(buckets, function (_bucket: string) {
        return validToStringType(_bucket, 'String')
      })
    } else if (validToStringType(buckets, 'String')) {
      buckets = [buckets as string]
    } else if (buckets === true) {
      buckets = lodashKeys(this.bucketsKeysRecord)
    } else {
      buckets = []
    }

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    switch (returnType) {
      case 'Mapping': {
        const _returnV: Record<string, Record<string, unknown>> = {}
        lodashForEach(buckets, function (_bucket: string) {
          if (!_returnV[_bucket]) _returnV[_bucket] = {}
          lodashForEach(
            (keys === true ? _this.bucketsKeysRecord[_bucket] || [] : keys) as string[],
            function (_key: string) {
              _returnV[_bucket][_key] = _this.getItem(_key, _bucket)
            },
          )
        })

        return _returnV
      }
      case 'List':
      default: {
        const _returnV = lodashMap(buckets, function (_bucket: string) {
          return lodashMap(
            (keys === true ? _this.bucketsKeysRecord[_bucket] || [] : keys) as string[],
            function (_key: string) {
              return {
                bucket: _bucket,
                key: _key,
                value: _this.getItem(_key, _bucket),
              }
            },
          )
        })

        return lodashFlatten(_returnV)
      }
    }
  }

  /**
   * @remarks
   * Returns the name of the nth key in the list, or null if n is greater than or equal to the number of key/value pairs in the object.
   * @param key - key
   * @typeParam key - number | string
   * @returns key or null - null | string
   */
  public key(key: number | string): null | string {
    if (this.storage.key) return this.storage.key(key as number)
    return null
  }

  /**
   * @remarks
   * Removes a value from localStorage/sessionStorage/memoryStorage. Equivalent to 'delete' in memcache, but that's a keyword in JS.
   * @param key - key
   * @typeParam key - string
   * @param bucket - bucket
   * @typeParam bucket - string | undefined
   * @returns 执行操作后的成功与否  - boolean
   */
  public removeItem(key: string, bucket?: string): boolean {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this

    if (!CachedStorage.supportStorage(_this)) return false

    CachedStorage.flushItem(_this, key, bucket)

    return true
  }

  /**
   * @remarks
   * Resets the string being appended to cachePrefix so CachedStorage will use the default storage behavior.
   * @returns void - void
   */
  public resetBucket(): void {
    this.bucket = ''
    this.bucketHistory.push(this.bucket)
  }

  /**
   * @remarks
   * Appends cachePrefix so CachedStorage will partition data in to different buckets.
   * @param bucket - bucket
   * @typeParam bucket - string | undefined
   * @returns 执行操作后的成功与否 - boolean
   */
  setBucket(bucket?: string): boolean {
    if (!validToStringType(bucket, 'String')) return false
    if (this.bucket === bucket) return false

    this.bucket = bucket as string
    this.bucketHistory.push(this.bucket)

    return true
  }

  /**
   * @remarks
   * Sets the number of milliseconds each time unit represents in the set() function's "time" argument.
   * @example
   * Sample values:
   * ```
   * 1: each time unit = 1 millisecond
   * 1000: each time unit = 1 second
   * 60000: each time unit = 1 minute (Default value)
   * 360000: each time unit = 1 hour
   * ```
   * @param milliseconds - milliseconds
   * @typeParam milliseconds - number
   * @returns void - void
   */
  public setExpiryMilliseconds(milliseconds: number): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this

    this.expiryMilliseconds = milliseconds
    this.maxDate = CachedStorage.calculateMaxDate(_this, this.expiryMilliseconds)
  }

  /**
   * @remarks
   * Stores the value in localStorage/sessionStorage/memoryStorage. Expires after specified number of minutes.
   * @param key - key
   * @typeParam key - string
   * @param value - value
   * @typeParam value - unknown
   * @param time - time
   * @typeParam time - number | undefined
   * @param bucket - bucket
   * @typeParam bucket - string | undefined
   * @returns 执行操作后的成功与否 - boolean
   */
  public setItem(key: string, value: unknown, time?: number, bucket?: string): boolean {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this

    // set bucket if transfer bucket argument
    _this.setBucket(bucket)

    if (!CachedStorage.supportStorage(_this)) return false

    // If we don't get a string value, try to stringify
    // In future, localStorage/sessionStorage/memoryStorage may properly support storing non-strings
    // and this can be removed.

    if (!CachedStorage.supportJSON(_this)) return false
    try {
      value = JSON.stringify(value)
    } catch (e) {
      // Sometimes we can't stringify due to circular refs
      // in complex objects, so we won't bother storing then.
      return false
    }

    try {
      CachedStorage.setItem(_this, key, value as string)
    } catch (e) {
      if (CachedStorage.isOutOfSpace(_this, e)) {
        // If we exceeded the quota, then we will sort
        // by the expire time, and then remove the N oldest
        const storedKeys: Array<Record<string, string | number>> = []
        let storedKey
        CachedStorage.eachKey(_this, function (key, exprKey) {
          const expiryStorageValue = CachedStorage.getObjectItem(_this, exprKey as string)
          let expiration: number
          if (expiryStorageValue && (expiryStorageValue as Record<string, string | unknown>).value) {
            expiration = parseInt((expiryStorageValue as Record<string, string>).value, _this.expiryRadix)
          } else {
            // TODO: Store date added for non-expiring items for smarter removal
            expiration = _this.maxDate
          }
          storedKeys.push({
            key: key,
            size: (CachedStorage.getItem(_this, key) || '').length,
            expiration: expiration,
          })
        })
        // Sorts the keys with oldest expiration time last
        storedKeys.sort(function (a, b) {
          return (b.expiration as number) - (a.expiration as number)
        })

        let targetSize = ((value as string) || '').length
        while (storedKeys.length && targetSize > 0) {
          storedKey = storedKeys.pop()
          CachedStorage.warn(_this, `Cache is full, removing item with key ${key}`)
          CachedStorage.flushItem(_this, (storedKey as Record<string, string | number>).key as string)
          targetSize -= (storedKey as Record<string, string | number>).size as number
        }
        try {
          CachedStorage.setItem(_this, key, value as string)
        } catch (e) {
          // value may be larger than total quota
          CachedStorage.warn(_this, `Could not add item with key ${key}, perhaps it's too big?`, e)

          return false
        }
      } else {
        // If it was some other error, just give up.
        CachedStorage.warn(_this, `Could not add item with key ${key}`, e)

        return false
      }
    }

    // If a time is specified, store expiration info in localStorage/sessionStorage/memoryStorage
    if (time) {
      const expire = CachedStorage.currentTime(_this) + time
      const expiryDate = new Date(expire * _this.expiryMilliseconds)
      const expiryToStringMapping: Record<string, number | string> = {
        toGMTString: expiryDate.toGMTString(),
        toISOString: expiryDate.toISOString(),
        toLocaleString: expiryDate.toLocaleString(),
        toString: expiryDate.toString(),
        toUTCString: expiryDate.toUTCString(),
        valueOf: expiryDate.valueOf(),
      }
      const value = expire.toString(_this.expiryRadix)
      const expiryStorageValue: Record<string, number | string> = {
        expire,
        expiryMilliseconds: _this.expiryMilliseconds,
        value,
      }
      lodashForEach(_this.expiryToStringKeys, function (_expiryToStringKey: string) {
        if (expiryToStringMapping[_expiryToStringKey])
          expiryStorageValue[_expiryToStringKey] = expiryToStringMapping[_expiryToStringKey]
      })

      CachedStorage.setItem(_this, CachedStorage.expirationKey(_this, key), JSON.stringify(expiryStorageValue))
    } else {
      // In case they previously set a time, remove that info from localStorage/sessionStorage/memoryStorage.
      CachedStorage.removeItem(_this, CachedStorage.expirationKey(_this, key))
    }

    // record the key for the bucket
    ;(this.bucketsKeysRecord[this.bucket] || (this.bucketsKeysRecord[this.bucket] = [])).push(key)

    return true
  }

  /**
   * @remarks
   * Returns whether local storage is supported. Currently exposed for testing purposes.
   * @returns 是否支持 Storage - boolean
   */
  public supported(): boolean {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this

    return CachedStorage.supportStorage(_this)
  }

  /**
   * Sets whether to display warnings when an item is removed from the cache or not.
   */
  public switchWarnings = function (this: CachedStorage, enabled: boolean): void {
    this.warnings = enabled
  }
}
