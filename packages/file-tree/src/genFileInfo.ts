/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2022-01-13 11:18:48
 * @LastEditTime: 2022-01-14 14:41:09
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/file-tree/src/genFileInfo.ts
 */

import * as fs from 'fs'
import * as path from 'path'

import genFileChildren from './genFileChildren'

export default function genFileInfo(curPath?: string, cwd?: string, initCwd?: string, _isNotRoot?: boolean): FileInfo {
  if (curPath === void 0) curPath = '.'
  const curPathType = Object.prototype.toString.call(curPath)
  if (curPathType !== '[object String]')
    throw new TypeError(`The parameter 'curPath' for function 'genFileInfo' is ${curPathType}.`)
  if (path.isAbsolute(curPath)) {
    initCwd = curPath
    cwd = curPath
    curPath = '.'
  }
  cwd = cwd === void 0 ? process.cwd() : cwd
  initCwd = initCwd === void 0 ? cwd : initCwd

  const absolutePath = path.resolve(cwd as string, curPath)
  const stats = fs.statSync(absolutePath)
  const isDirectory = stats.isDirectory()
  const pathParse = path.parse(absolutePath)
  let relativePath = path.relative(initCwd, absolutePath)
  relativePath = relativePath === '' ? '.' : relativePath
  const fileInfo: FileInfo = {
    'fs.stat': {
      dev: stats.dev,
      ino: stats.ino,
      mode: stats.mode,
      nlink: stats.nlink,
      uid: stats.uid,
      gid: stats.gid,
      rdev: stats.rdev,
      size: stats.size,
      blksize: stats.blksize,
      blocks: stats.blocks,
      atimeMs: stats.atimeMs,
      mtimeMs: stats.mtimeMs,
      ctimeMs: stats.ctimeMs,
      birthtimeMs: stats.birthtimeMs,
      atime: stats.atime,
      mtime: stats.mtime,
      ctime: stats.ctime,
      birthtime: stats.birthtime,
      isBlockDevice: stats.isBlockDevice(),
      isCharacterDevice: stats.isCharacterDevice(),
      isDirectory,
      isFIFO: stats.isFIFO(),
      isFile: stats.isFile(),
      isSocket: stats.isSocket(),
      isSymbolicLink: stats.isSymbolicLink(),
    },
    'path.parse': {
      base: pathParse.base,
      dir: pathParse.dir,
      ext: pathParse.ext,
      name: pathParse.name,
      root: pathParse.root,
    },
    absolutePath,
    relativePath,
  }

  if (isDirectory) {
    fileInfo.children = genFileChildren(curPath, cwd, initCwd)
  }

  if (_isNotRoot !== true) {
    fileInfo.cwd = initCwd
  }

  return fileInfo
}
