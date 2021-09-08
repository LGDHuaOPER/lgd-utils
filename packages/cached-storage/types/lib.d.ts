/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 10:31:09
 * @LastEditTime: 2021-09-04 12:20:23
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\cached-storage\types\lib.d.ts
 */

/* // 对于 global 导出的包
declare namespace MemoryStorage {} */

/* // 对于 umd/commonjs 导出的包
declare module 'memorystorage' {
  namespace MemoryStorage {}

  export = MemoryStorage;
} */

/* // 对于 ES Module 导出的包
declare module 'memorystorage' {
  class MemoryStorage {}

  export default MemoryStorage;
} */

declare module 'memorystorage' {
  export as namespace MemoryStorage
  export = MemoryStorage
  declare function MemoryStorage(id?: string): Storage
}
