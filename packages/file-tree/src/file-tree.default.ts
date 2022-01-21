/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2022-01-21 18:14:23
 * @LastEditTime: 2022-01-21 18:18:22
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/file-tree/src/file-tree.default.ts
 */

import fileTree from './fileTree'

export default function fileTreeDefault(...args: Parameters<typeof fileTree>): ReturnType<typeof fileTree> {
  return fileTree(...args)
}
