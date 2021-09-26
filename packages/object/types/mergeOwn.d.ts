/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-25 23:26:10
 * @LastEditTime: 2021-09-25 23:30:22
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\types\mergeOwn.d.ts
 */

declare interface mergeOwnOptions {
  customizer?: (
    objValue: unknown,
    srcValue: unknown,
    key: string,
    object: Record<string, unknown> | unknown,
    source: Record<string, unknown> | unknown,
    stack: unknown,
  ) => undefined | unknown
  dropPropsSymbol?: unknown
  enableTargetEmptyObject?: boolean
  enableTargetDropInherited?: boolean
  objectValidator?: (value?: unknown) => boolean
}
