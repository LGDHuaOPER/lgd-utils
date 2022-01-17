/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2022-01-14 16:58:50
 * @LastEditTime: 2022-01-17 16:51:44
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/file-tree/src/fileTree.ts
 */

import filterBlackWhite from './filterBlackWhite'
import filterDirectory from './filterDirectory'
import genFileInfo from './genFileInfo'
import orderHandler from './orderHandler'

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
    blackList,
    cwd,
    enableAll = false,
    enableDirectoryOnly = false,
    initCwd,
    order,
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

  if (![void 0, null].includes(order as undefined | null))
    fileInfo = orderHandler(fileInfo, order as OrderHandlerOptions) as FileInfo

  return fileInfo
}
