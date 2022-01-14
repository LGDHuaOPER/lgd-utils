/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2022-01-14 17:07:58
 * @LastEditTime: 2022-01-14 18:18:28
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/file-tree/src/filterBlackWhite.ts
 */

function baseFilterBlackWhite(fileInfo: FileInfo, options?: FilterBlackWhiteOptions): FileInfo {
  const children = filterBlackWhite(fileInfo.children || [], options) as FileChildren
  return {
    ...fileInfo,
    ['fs.stat']: {
      ...fileInfo['fs.stat'],
    },
    ['path.parse']: {
      ...fileInfo['path.parse'],
    },
    children: children.length === 0 ? void 0 : children,
  }
}

export default function filterBlackWhite(
  fileInfo: FileInfo | FileChildren,
  options?: FilterBlackWhiteOptions,
): FileInfo | FileChildren | null {
  if (!fileInfo) {
    throw new TypeError(
      `The parameter 'fileInfo' for function 'filterBlackWhite' is ${Object.prototype.toString.call(fileInfo)}.`,
    )
  }
  if (Object.prototype.toString.call(options) !== '[object Object]') options = {}

  let blackList: string[] = []
  let whiteList: string[] = []
  const { blackList: _blackList, whiteList: _whiteList } = options as FilterBlackWhiteOptions
  if (Object.prototype.toString.call(_blackList) === '[object String]') blackList = [_blackList as string]
  if (!Array.isArray(blackList)) blackList = []
  if (Object.prototype.toString.call(_whiteList) === '[object String]') whiteList = [_whiteList as string]
  if (!Array.isArray(whiteList)) whiteList = []
  options = {
    ...options,
    blackList,
    whiteList,
  }

  if (blackList.length === 0 && whiteList.length === 0) return fileInfo

  if (Array.isArray(fileInfo)) {
    return fileInfo
      .filter((_fileInfo) => {
        if (!_fileInfo) return false
        if (!_fileInfo['path.parse']) return false
        if (!_fileInfo['path.parse'].base) return false

        const base = _fileInfo['path.parse'].base
        if (blackList.length !== 0 && whiteList.length !== 0) {
          if (blackList.includes(base) && whiteList.includes(base)) return true
          if (!blackList.includes(base) && !whiteList.includes(base)) return true
          if (blackList.includes(base)) return false
          if (whiteList.includes(base)) return true
        }
        if (blackList.length !== 0) return !blackList.includes(base)
        if (whiteList.length !== 0) return whiteList.includes(base)
      })
      .map((_fileInfo) => baseFilterBlackWhite(_fileInfo, options))
  } else {
    if (!fileInfo['path.parse']) return null
    if (!fileInfo['path.parse'].base) return null

    return baseFilterBlackWhite(fileInfo, options)
  }
}
