/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2022-01-14 16:58:50
 * @LastEditTime: 2022-01-14 17:17:23
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/file-tree/src/fileTree.ts
 */

import filterBlackWhite from './filterBlackWhite'
import filterDirectory from './filterDirectory'
import genFileInfo from './genFileInfo'

export default function fileTree(curPath?: string, options?: FileTreeOptions): FileInfo {
  if (Object.prototype.toString.call(curPath) === '[object Object]') {
    options = curPath as FileTreeOptions
    curPath = options.curPath
  }
  if (curPath === void 0) curPath = '.'
  if (Object.prototype.toString.call(options) !== '[object Object]') options = {}
  const curPathType = Object.prototype.toString.call(curPath)
  if (curPathType !== '[object String]')
    throw new TypeError(
      `The parameter 'curPath' for function 'fileTree' or the property 'curPath' for parameter 'options' is ${curPathType}.`,
    )

  const {
    enableAll = false,
    enableDirectoryOnly = false,
    cwd,
    initCwd,
    blackList,
    whiteList,
  } = options as FileTreeOptions

  let fileInfo = genFileInfo(curPath, cwd, initCwd)

  if (enableAll) return fileInfo

  if (enableDirectoryOnly) {
    const _fileInfo = filterDirectory(fileInfo) as FileInfo | null
    fileInfo = _fileInfo === null ? fileInfo : _fileInfo
  }
  fileInfo = filterBlackWhite(fileInfo, {
    blackList,
    whiteList,
  }) as FileInfo

  return fileInfo
}
