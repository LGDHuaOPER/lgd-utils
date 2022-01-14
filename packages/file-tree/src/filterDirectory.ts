/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2022-01-14 14:35:37
 * @LastEditTime: 2022-01-14 15:11:35
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/file-tree/src/filterDirectory.ts
 */

function baseFilterDirectory(fileInfo: FileInfo): FileInfo {
  const children = filterDirectory(fileInfo.children || []) as FileChildren
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

export default function filterDirectory(fileInfo: FileInfo | FileChildren): FileInfo | FileChildren | null {
  if (!fileInfo) {
    throw new TypeError(
      `The parameter 'fileInfo' for function 'filterDirectory' is ${Object.prototype.toString.call(fileInfo)}.`,
    )
  }

  if (Array.isArray(fileInfo)) {
    return fileInfo
      .filter((_fileInfo) => {
        if (!_fileInfo) return false
        if (!_fileInfo['fs.stat']) return false
        if (!_fileInfo['fs.stat'].isDirectory) return false
        return true
      })
      .map((_fileInfo) => baseFilterDirectory(_fileInfo))
  } else {
    if (!fileInfo['fs.stat']) return null
    if (!fileInfo['fs.stat'].isDirectory) return null

    return baseFilterDirectory(fileInfo)
  }
}
