/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-08-31 14:42:47
 * @LastEditTime: 2021-09-04 12:49:27
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\cached-storage\types\cached-storage.d.ts
 */

declare type CachedStorageInstanceCompressTypeFunction = (uncompressed: string) => string
declare type CachedStorageInstanceDecompressTypeFunction = (compressed: string) => null | string
declare type CachedStorageInstanceCompressTypeObject = { [propName: string]: CachedStorageInstanceCompressTypeFunction }
declare type CachedStorageInstanceDecompressTypeObject = {
  [propName: string]: CachedStorageInstanceDecompressTypeFunction
}
declare type CachedStorageInstanceCompress =
  | CachedStorageInstanceCompressTypeFunction
  | CachedStorageInstanceCompressTypeObject
declare type CachedStorageInstanceDecompress =
  | CachedStorageInstanceDecompressTypeFunction
  | CachedStorageInstanceDecompressTypeObject

declare interface CachedStorageConstructorOptions {
  bucket?: string

  cachePrefix?: string

  cacheSuffix?: string

  compress?: CachedStorageInstanceCompress

  decompress?: CachedStorageInstanceDecompress

  expiryMilliseconds?: number

  expiryRadix?: number

  expiryToStringKeys?: string[]

  keySeparator?: string

  maxDate?: number

  storage?: Storage | string

  warnings?: boolean
}
