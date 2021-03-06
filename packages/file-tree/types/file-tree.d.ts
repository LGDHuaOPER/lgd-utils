/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2022-01-13 11:23:40
 * @LastEditTime: 2022-01-17 18:10:21
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/file-tree/types/file-tree.d.ts
 */

declare interface FileInfoFsStat {
  dev: number
  ino: number
  mode: number
  nlink: number
  uid: number
  gid: number
  rdev: number
  size: number
  blksize: number
  blocks: number
  atimeMs: number
  mtimeMs: number
  ctimeMs: number
  birthtimeMs: number
  atime: Date
  mtime: Date
  ctime: Date
  birthtime: Date
  isBlockDevice: boolean
  isCharacterDevice: boolean
  isDirectory: boolean
  isFIFO: boolean
  isFile: boolean
  isSocket: boolean
  isSymbolicLink: boolean
}

declare interface FileInfoPathParse {
  base: string
  dir: string
  ext: string
  name: string
  root: string
}

declare interface FileInfo {
  'fs.stat': FileInfoFsStat
  'path.parse': FileInfoPathParse
  absolutePath: string
  children?: FileChildren
  cwd?: string
  relativePath: string
}

declare type FileChildren = Array<FileInfo>

declare interface FileTreeOptions {
  blackList?: string | string[]
  curPath?: string
  cwd?: string
  enableAll?: boolean
  enableDirectoryOnly?: boolean
  initCwd?: string
  order?: OrderHandlerOptions | null
  whiteList?: string | string[]
}

declare interface FilterBlackWhiteOptions {
  blackList?: string | string[]
  whiteList?: string | string[]
}

declare type OrderHandlerOptions = Required<OrderHandlerOptionsObjectType>['iteratees'] | OrderHandlerOptionsObjectType

declare type OrderHandlerOptionsIterateesNotArrayType = boolean | string | ((value: unknown) => unknown)

declare type OrderHandlerOptionsOrdersStringType = 'asc' | 'desc'

declare interface OrderHandlerOptionsObjectType {
  iteratees?: OrderHandlerOptionsIterateesNotArrayType | Array<string | string[] | ((value: unknown) => unknown)>
  orders?: OrderHandlerOptionsOrdersStringType | Array<OrderHandlerOptionsOrdersStringType>
}
