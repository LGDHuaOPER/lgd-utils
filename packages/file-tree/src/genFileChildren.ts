/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2022-01-13 14:06:07
 * @LastEditTime: 2022-01-13 15:23:47
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/file-tree/src/genFileChildren.ts
 */

import * as fs from 'fs'
import * as path from 'path'

import genFileInfo from './genFileInfo'

export default function genFileChildren(curPath: string, cwd: string, initCwd: string): FileChildren {
  const absolutePath = path.resolve(cwd, curPath)
  const readdir = fs.readdirSync(absolutePath)
  const fileChildren: FileChildren = readdir.map((_fileOrFolder) =>
    genFileInfo(_fileOrFolder, absolutePath, initCwd, true),
  )

  return fileChildren
}
