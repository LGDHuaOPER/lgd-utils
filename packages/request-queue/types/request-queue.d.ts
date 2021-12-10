/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-12-10 15:13:35
 * @LastEditTime: 2021-12-10 17:20:27
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\request-queue\types\request-queue.d.ts
 */

declare interface RequestQueueRequestObjectTypeCustomData {
  retry?: number
  [propName: string]: unknown | undefined
}

declare interface RequestQueueRequestObjectType {
  _request?: () => Promise<unknown>
  _customData?: RequestQueueRequestObjectTypeCustomData
}

declare type RequestQueueRequest = (() => Promise<unknown>) | string | RequestQueueRequestObjectType

declare interface RequestQueueRequestItem {
  request: () => Promise<unknown>
  retryTimes: number
  originalRetryTimes: number
  [propName: string]: unknown | undefined
}

declare interface RequestQueueConstructorOptions {
  completeHooks?:
    | ((values: unknown[], curProgress: number) => unknown)
    | Array<(values: unknown[], curProgress: number) => unknown>
  destroyWhenError?: boolean
  destroyWhenErrorHooks?:
    | ((reason: unknown, curProgress: number, type: 'ERROR') => unknown)
    | Array<(reason: unknown, curProgress: number, type: 'ERROR') => unknown>
  enableAwaitWhenRetry?: boolean
  enableContinueRetryWhenStop?: boolean
  limit?: number
  maxConcurrent?: number
  onAlways?: () => unknown
  onError?: (reason?: unknown, curProgress?: number) => unknown
  onSuccess?: (value?: unknown, curProgress?: number) => unknown
  requestAdapter?: (apiConfig: string | Record<string, unknown>) => Promise<unknown>
  requestAdapterApiConfig?: string | Record<string, unknown>
  requestList?: Array<unknown>
  retry?: number
  retryTimes?: number
}

declare interface RequestQueueRequestResultItem {
  key: number
  type: 'SUCCESS' | 'ERROR'
  requestItem: RequestQueueRequestItem
  data: unknown
  isRequestQueue: boolean
}
