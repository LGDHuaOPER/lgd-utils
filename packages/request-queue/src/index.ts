/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-06-26 23:25:35
 * @LastEditTime: 2021-12-20 19:31:09
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\request-queue\src\index.ts
 */

import lodashBind from 'lodash/bind'
import lodashIsBoolean from 'lodash/isBoolean'
import lodashIsFunction from 'lodash/isFunction'
import lodashIsNumber from 'lodash/isNumber'
import lodashIsPlainObject from 'lodash/isPlainObject'
import lodashIsString from 'lodash/isString'
import lodashOmit from 'lodash/omit'

// 请求队列，控制请求并发
export default class RequestQueue {
  // 全部完成时执行的钩子函数
  public completeHooks: Array<(values: unknown[], curProgress: number) => unknown>

  // 是否在请求出错时destroy
  public destroyWhenError: boolean

  // 实例destroyWhenError前执行的钩子函数
  public destroyWhenErrorHooks: Array<(reason: unknown, curProgress: number, type: 'ERROR') => unknown>

  // 在重试时，是否开启await。开启await将会使得当前特征请求的越外层的finally越靠后执行（洋葱）
  public enableAwaitWhenRetry: boolean

  // 当实例停止时，是否开启重试功能
  public enableContinueRetryWhenStop: boolean

  // 最大并发
  public maxConcurrent: number

  // 每次finally执行函数
  public onAlways: () => unknown

  // 每次失败执行函数
  public onError: (reason?: unknown, curProgress?: number) => unknown

  // 每次成功执行函数
  public onSuccess: (value?: unknown, curProgress?: number) => unknown

  // 请求List
  public requestList: Array<unknown>

  // 请求器
  public requestAdapter: (apiConfig: string | Record<string, unknown>) => Promise<unknown>

  // 请求器基本配置
  public requestAdapterApiConfig: string | Record<string, unknown>

  // 重试次数
  public retryTimes: number

  public _resolve: (value: unknown) => unknown

  public _reject: (reason: unknown) => unknown

  // List特征请求完成总数
  public complete = 0

  // 实例是否销毁
  public destroyed = false

  // 失败的Key
  public errorKeys: Array<{ key: unknown; index: number } | number> = []

  // List特征请求完成进度，表示当前位置
  public progress = 0

  // 请求结果
  public requestResult: Array<RequestQueueRequestResultItem> = []

  // 总请求数，所有发送的请求总数
  public requests = 0

  // 是否正在运行
  public running = false

  // 成功的key
  public successKeys: Array<{ key: unknown; index: number } | number> = []

  // List特征请求总数
  public total = 0

  constructor({
    completeHooks,
    destroyWhenError,
    destroyWhenErrorHooks,
    enableAwaitWhenRetry,
    enableContinueRetryWhenStop,
    limit,
    maxConcurrent,
    onAlways,
    onError,
    onSuccess,
    requestAdapter,
    requestAdapterApiConfig,
    requestList,
    retry,
    retryTimes,
  }: RequestQueueConstructorOptions = {}) {
    const noop = function () {
      return void 0
    }

    this.completeHooks = Array.isArray(completeHooks)
      ? completeHooks.filter(lodashIsFunction)
      : lodashIsFunction(completeHooks)
      ? [completeHooks]
      : []

    this.destroyWhenError = lodashIsBoolean(destroyWhenError) ? destroyWhenError : false

    this.destroyWhenErrorHooks = Array.isArray(destroyWhenErrorHooks)
      ? destroyWhenErrorHooks.filter(lodashIsFunction)
      : lodashIsFunction(destroyWhenErrorHooks)
      ? [destroyWhenErrorHooks]
      : []

    this.enableAwaitWhenRetry = lodashIsBoolean(enableAwaitWhenRetry) ? enableAwaitWhenRetry : false

    this.enableContinueRetryWhenStop = lodashIsBoolean(enableContinueRetryWhenStop) ? enableContinueRetryWhenStop : true

    this.maxConcurrent = lodashIsNumber(maxConcurrent) ? maxConcurrent : lodashIsNumber(limit) ? limit : 6

    this.onAlways = onAlways || noop

    this.onError = onError || noop

    this.onSuccess = onSuccess || noop

    this.requestAdapter =
      requestAdapter || ((apiConfig: string | Record<string, unknown>) => Promise.resolve(apiConfig))

    this.requestAdapterApiConfig = requestAdapterApiConfig || {}

    this.requestList = [...(Array.isArray(requestList) ? requestList : [])]

    this.retryTimes = lodashIsNumber(retryTimes) ? retryTimes : lodashIsNumber(retry) ? retry : 1

    this.total = this.requestList.length

    this._resolve = noop

    this._reject = noop
  }

  _assertPromisify(): boolean {
    if (this.completeHooks.length || this.destroyWhenErrorHooks.length) return false
    return true
  }

  _concurrent(limit?: number): RequestQueue {
    if (this._assertDisabled()) return this
    // 当请求队列为空时，直接done
    if (this.progress === 0 && this.complete === 0 && this.total === 0 && this.requests === 0) {
      if (this._assertPromisify()) {
        this._resolve([])
      } else {
        this.completeHooks.forEach((fn) => fn([], this.progress))
      }
      return this
    }

    if (limit === void 0) limit = this.maxConcurrent
    while (limit--) {
      this._next()
    }

    return this
  }

  _assertDisabled(): boolean {
    if (this.destroyed || !this.running) return true
    return false
  }

  _next(): RequestQueue | void {
    const curProgress = this.progress
    if (curProgress >= this.total || this._assertDisabled()) return this

    this.progress++
    this._runRequestItem(curProgress)
  }

  async _runRequestItem(
    curProgress: number,
    item?: null | RequestQueueRequestItem | unknown,
  ): Promise<RequestQueue | void> {
    if (this.destroyed) return this
    const requestItem = item || this._getRequestItem()
    if (!requestItem) return this
    const _requestItem = requestItem as RequestQueueRequestItem
    try {
      const res = await Promise.resolve((requestItem as RequestQueueRequestItem).request())

      this.requestResult[curProgress] = {
        key: curProgress,
        type: 'SUCCESS',
        requestItem: _requestItem,
        data: (this.onSuccess && this.onSuccess(res, curProgress)) || res,
        isRequestQueue: true,
      }
      this.successKeys.push(
        _requestItem && _requestItem._key !== void 0
          ? {
              key: _requestItem._key,
              index: curProgress,
            }
          : curProgress,
      )

      this.complete++
      if (this.complete < this.total) {
        this._next()
      }
    } catch (e) {
      if (_requestItem.retryTimes > 0 && (this.running || (!this.running && this.enableContinueRetryWhenStop))) {
        _requestItem.retryTimes--
        if (this.enableAwaitWhenRetry) {
          await this._runRequestItem(curProgress, requestItem)
        } else {
          this._runRequestItem(curProgress, requestItem)
        }
      } else {
        const data = (this.onError && this.onError(e, curProgress)) || e
        this.requestResult[curProgress] = {
          key: curProgress,
          type: 'ERROR',
          requestItem: _requestItem,
          data,
          isRequestQueue: true,
        }
        this.errorKeys.push(
          _requestItem && _requestItem._key !== void 0
            ? {
                key: _requestItem._key,
                index: curProgress,
              }
            : curProgress,
        )

        this.complete++
        if (this.destroyWhenError) {
          if (this._assertPromisify()) {
            this._reject(this.requestResult[curProgress])
          } else {
            this.destroyWhenErrorHooks.forEach((fn) => fn(data, curProgress, 'ERROR'))
          }
          this.destroy()
        } else {
          if (this.complete < this.total) {
            this._next()
          }
        }
      }
    } finally {
      this.requests++
      if (this.complete >= this.total && !this.destroyed) {
        if (this._assertPromisify()) {
          this._resolve([...this.requestResult])
        } else {
          this.completeHooks.forEach((fn) => fn([...this.requestResult], curProgress))
        }
        this.destroy()
      }
    }
  }

  _getRequestItem(): null | RequestQueueRequestItem | unknown {
    if (this._assertDisabled()) return null
    const request = this.requestList.shift()
    if (!request) return request
    if (lodashIsFunction(request)) {
      return {
        request,
        retryTimes: this.retryTimes,
        originalRetryTimes: this.retryTimes,
      }
    }

    if (lodashIsPlainObject(request)) {
      const _request = lodashIsFunction((request as RequestQueueRequestObjectType)._request)
        ? (request as RequestQueueRequestObjectType)._request
        : null
      const _customData = lodashIsPlainObject((request as RequestQueueRequestObjectType)._customData)
        ? (request as RequestQueueRequestObjectType)._customData
        : {}
      const retryTimes =
        (_customData as RequestQueueRequestObjectTypeCustomData).retry === void 0
          ? this.retryTimes
          : (_customData as RequestQueueRequestObjectTypeCustomData).retry

      return {
        request:
          _request ||
          lodashBind(function (this: RequestQueue) {
            return this.requestAdapter(
              Object.assign(
                {},
                lodashIsPlainObject(this.requestAdapterApiConfig)
                  ? this.requestAdapterApiConfig
                  : {
                      url: this.requestAdapterApiConfig,
                    },
                lodashOmit(request as RequestQueueRequestObjectType, ['_request', '_customData']),
              ),
            )
          }, this),
        retryTimes,
        originalRetryTimes: retryTimes,
        ..._customData,
      }
    }

    if (lodashIsString(request)) {
      return {
        request: lodashBind(function (this: RequestQueue) {
          return this.requestAdapter(
            lodashIsString(this.requestAdapterApiConfig)
              ? request
              : Object.assign({}, this.requestAdapterApiConfig, { url: request }),
          )
        }, this),
        retryTimes: this.retryTimes,
        originalRetryTimes: this.retryTimes,
      }
    }

    return {
      request: lodashBind(function () {
        return Promise.resolve(request)
      }, this),
      retryTimes: this.retryTimes,
      originalRetryTimes: this.retryTimes,
    }
  }

  add(request?: RequestQueueRequest): RequestQueue {
    if (this.destroyed || request === void 0) return this
    this.requestList.push(request)
    this.total++
    return this
  }

  start(
    onComplete?: () => unknown,
    onDestroyWhenError?: (reason: unknown, curProgress: number, type: 'ERROR') => unknown,
  ): RequestQueue | Promise<unknown> {
    if (this.destroyed || this.running) return this
    this.running = true

    if (lodashIsFunction(onComplete)) this.completeHooks.push(onComplete)
    if (lodashIsFunction(onDestroyWhenError)) this.destroyWhenErrorHooks.push(onDestroyWhenError)

    if (this._assertPromisify()) {
      return new Promise((resolve, reject) => {
        this._resolve = resolve
        this._reject = reject
        this._concurrent()
      })
    }

    return this._concurrent()
  }

  stop(): RequestQueue {
    if (this._assertDisabled()) return this
    this.running = false
    return this
  }

  restart(): RequestQueue {
    if (this.destroyed || this.running) return this
    this.running = true

    return this._concurrent()
  }

  destroy(): RequestQueue {
    if (this.destroyed) return this
    this.running = false
    this.destroyed = true
    return this
  }
}
