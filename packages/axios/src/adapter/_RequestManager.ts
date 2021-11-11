/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-11-11 11:26:51
 * @LastEditTime: 2021-11-11 15:01:10
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\src\adapter\_RequestManager.ts
 */

import { Canceler } from 'axios'

export default class RequestManager {
  static validate(requestManager?: RequestManagerLike): boolean {
    const isFunction = (val: (() => unknown) | unknown) => typeof val === 'function'
    return !!(
      requestManager &&
      (isFunction(requestManager.add) || isFunction(requestManager.set)) &&
      (isFunction(requestManager.remove) || isFunction(requestManager.delete) || isFunction(requestManager.del)) &&
      isFunction(requestManager.cancel) &&
      (isFunction(requestManager.cancelAll) || isFunction(requestManager.clear)) &&
      (isFunction(requestManager.get) || isFunction(requestManager.has))
    )
  }

  options: RequestManagerOptions = {}

  pendingRequests: {
    [propName: string]: Canceler
  } = {}

  constructor(options: RequestManagerOptions | undefined = {}) {
    this.options = options
    this.pendingRequests = {}
  }

  add(requestId: string, canceler: Canceler): void {
    this.log(`adding request \`${requestId}\``)

    if (this.has(requestId)) {
      this.cancel(
        requestId,
        `\`cancel(${requestId})\` from \`RequestManager.add\`.
      Found duplicate pending request.`,
      )
      this.pendingRequests[requestId] = canceler
    } else {
      this.pendingRequests[requestId] = canceler
    }
  }

  set(requestId: string, canceler: Canceler): void {
    return this.add(requestId, canceler)
  }

  remove(requestId: string): void {
    this.log(`removing request \`${requestId}\``)

    delete this.pendingRequests[requestId]
  }

  delete(requestId: string): void {
    return this.remove(requestId)
  }

  del(requestId: string): void {
    return this.remove(requestId)
  }

  cancel(requestId: string, reason = `\`cancel(${requestId})\` from \`RequestManager.cancel\``): void {
    this.log(`cancelling request \`${requestId}\``)

    if (this.has(requestId) && typeof this.pendingRequests[requestId] === 'function') {
      this.pendingRequests[requestId](reason)
      this.remove(requestId)

      this.log(`request \`${requestId}\` cancelled`)
    }
  }

  cancelAll(reason?: string): void {
    for (const requestId in this.pendingRequests) {
      this.cancel(requestId, reason || `\`cancel(${requestId})\` from \`RequestManager.cancelAll\``)
    }
  }

  clear(reason?: string): void {
    return this.cancelAll(reason)
  }

  get(requestId: string): Canceler {
    return this.pendingRequests[requestId]
  }

  has(requestId: string): boolean {
    return !!this.pendingRequests[requestId]
  }

  log(message: string): void {
    if (this.options.debug === true) {
      console.log(message)
    } else if (typeof this.options.debug === 'function') {
      this.options.debug(message)
    }
  }
}
