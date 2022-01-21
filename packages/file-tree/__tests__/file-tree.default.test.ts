/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2022-01-12 17:59:33
 * @LastEditTime: 2022-01-21 18:25:47
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: /lgd-utils/packages/file-tree/__tests__/file-tree.default.test.ts
 */

import fileTreeDefault from '../src/file-tree.default'

describe('@lgd-utils/file-tree default', () => {
  const fileInfo = fileTreeDefault()

  it(`fileInfo['fs.stat'].isFile is to be true`, () => {
    expect(fileInfo['fs.stat'].isFile).toBeTruthy()
  })

  it(`fileInfo['fs.stat'].isDirectory is to be false`, () => {
    expect(fileInfo['fs.stat'].isDirectory).toBeFalsy()
  })

  it(`fileInfo['path.parse'].base is to be 'file-tree.default.test.ts'`, () => {
    expect(fileInfo['path.parse'].base).toBe('file-tree.default.test.ts')
  })
})
