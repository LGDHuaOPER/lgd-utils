/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-12-10 15:13:35
 * @LastEditTime: 2021-12-20 18:30:58
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\polling\types\polling.d.ts
 */

declare interface PollingConstructorOptions {
  apiConfig?: string | Record<string, unknown>
  destroyHook?: () => unknown
  destroyWhenError?: boolean
  errorHook?: (value: unknown) => unknown
  finallyHook?: () => unknown
  id?: string
  immediate?: boolean
  interval?: number | (() => number)
  maxTimes?: number
  request?: () => Promise<unknown>
  requestAdapter?: (apiConfig: string | Record<string, unknown>) => Promise<unknown>
  successHook?: (value: unknown) => unknown
  type?: number
}
