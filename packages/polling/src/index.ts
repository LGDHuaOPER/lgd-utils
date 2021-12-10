import { validToStringPromise } from '@lgd-utils/validate'
import { attemptFunc, attemptFuncWithLazyDefault, typeDefaultTo } from '@lgd-utils/utils'

export default class Polling {
  // api config
  public apiConfig: string | Record<string, unknown>

  // destroy时的钩子函数
  public destroyHook: () => unknown

  // 在api出错时是否destroy
  public destroyWhenError: boolean

  // 失败钩子函数
  public errorHook: (value: unknown) => unknown

  // finally钩子函数
  public finallyHook: () => unknown

  // id
  public id: string

  // 是否立即执行一次
  public immediate: boolean

  // 时间间隔
  public interval: number | (() => number)

  // 最大次数
  public maxTimes: number

  // 请求
  public request: () => Promise<unknown>

  // 请求适配器
  public requestAdapter: (apiConfig: string | Record<string, unknown>) => Promise<unknown>

  // 成功钩子函数
  public successHook: (value: unknown) => unknown

  // 串行, 并行 -> serial, parallel -> 0, 1
  public type: number

  // 当前次数
  public times = 0

  // 定时器
  public timer: number | null = null

  // 是否使用了 immediate 特性
  public hasExeImmediate: boolean

  // 是否处于running状态
  public running = false

  /* 退出码
    0 - 主动退出
    1 - Promise reject
    2 - Api reject
    3 - MaxTimes */
  public exitCode: number | null = null

  constructor(config?: PollingConstructorOptions) {
    const noop = function () {
      return void 0
    }
    config = typeDefaultTo.not(config, {}, { assertTypes: ['PlainObject'] }) as PollingConstructorOptions

    this.apiConfig = typeDefaultTo.not(config.apiConfig, {}, { assertTypes: ['PlainObject', 'String'] }) as
      | string
      | Record<string, unknown>

    this.destroyHook = typeDefaultTo.not(config.destroyHook, noop, {
      assertTypes: ['Function'],
    }) as () => unknown

    this.destroyWhenError = typeDefaultTo.not(config.destroyWhenError, false, {
      assertTypes: ['Boolean'],
    }) as boolean

    this.errorHook = typeDefaultTo.not(config.errorHook, noop, { assertTypes: ['Function'] }) as (
      value: unknown,
    ) => unknown

    this.finallyHook = typeDefaultTo.not(config.finallyHook, noop, {
      assertTypes: ['Function'],
    }) as () => unknown

    this.id = typeDefaultTo.not(config.id, `${Date.now()}-${Math.random()}-${Math.random()}`, {
      assertTypes: ['String'],
    }) as string

    this.immediate = typeDefaultTo.not(config.immediate, false, { assertTypes: ['Boolean'] }) as boolean

    this.interval = typeDefaultTo.not(config.interval, 1000 * 10, {
      assertTypes: ['Function', 'Number'],
    }) as number | (() => number)

    this.maxTimes = typeDefaultTo.not(config.maxTimes, 60, { assertTypes: ['Number'] }) as number

    this.request = config.request

    this.requestAdapter =
      config.requestAdapter || ((apiConfig: string | Record<string, unknown>) => Promise.resolve(apiConfig))

    this.successHook = typeDefaultTo.not(config.successHook, noop, { assertTypes: ['Function'] }) as (
      val: unknown,
    ) => unknown

    this.type = [0, 1].includes(config.type) ? config.type : 0

    this.hasExeImmediate = !this.immediate
  }

  _base(flag?: boolean): Polling | void {
    if (!this.running) return this
    if (flag === false) {
      this.exitCode = 0
      this._destroy()
      return this
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    if (this.type === 0) {
      const cbLogic = function (cb: (val: unknown) => unknown, val: unknown) {
        if (that.running && cb) {
          const result = cb(val)
          if (result === false) {
            that.exitCode = 0
            that._destroy()
          } else if (validToStringPromise(result)) {
            ;(result as Promise<boolean | undefined>)
              .then(function (value1?: boolean) {
                that._base(value1)
              })
              .catch(function () {
                that.exitCode = 1
                that._destroy()
              })
          } else {
            that._base()
          }
        } else {
          that._base()
        }
      }
      const fn = function () {
        if (!that.running) return
        that.times++
        if (that.times > that.maxTimes) {
          that.exitCode = 3
          that._destroy()
          return
        }

        const executedRequest = attemptFuncWithLazyDefault(that.request, () =>
          that.requestAdapter(that.apiConfig),
        ) as Promise<unknown>
        executedRequest
          .then(function (value: unknown) {
            cbLogic(that.successHook, value)
          })
          .catch(function (reason) {
            if (that.destroyWhenError) {
              that.running && that.errorHook && that.errorHook(reason)
              that.exitCode = 2
              that._destroy()
            } else {
              cbLogic(that.errorHook, reason)
            }
          })
          .finally(function () {
            that.running && that.finallyHook && that.finallyHook()
          })
      }
      if (!this.hasExeImmediate && this.immediate) {
        this.hasExeImmediate = true
        fn()
      }
      this._clearTimer()
      this.timer = window.setTimeout(fn, attemptFunc(this.interval) as number)
    } else if (this.type === 1) {
      const cbLogic = function (cb: (val: unknown) => unknown, val: unknown) {
        if (that.running && cb) {
          const result = cb(val)
          if (result === false) {
            that.exitCode = 0
            that._destroy()
          } else if (validToStringPromise(result)) {
            ;(result as Promise<boolean | undefined>).then().catch(function () {
              that.exitCode = 1
              that._destroy()
            })
          }
        }
      }
      const fn = function () {
        if (!that.running) return
        that.times++
        if (that.times > that.maxTimes) {
          that.exitCode = 3
          that._destroy()
          return
        }
        const executedRequest = attemptFuncWithLazyDefault(that.request, () =>
          that.requestAdapter(that.apiConfig),
        ) as Promise<unknown>
        executedRequest
          .then(function (value) {
            cbLogic(that.successHook, value)
          })
          .catch(function (reason) {
            if (that.destroyWhenError) {
              that.running && that.errorHook && that.errorHook(reason)
              that.exitCode = 2
              that._destroy()
            } else {
              cbLogic(that.errorHook, reason)
            }
          })
          .finally(function () {
            that.running && that.finallyHook && that.finallyHook()
          })
      }
      if (!this.hasExeImmediate && this.immediate) {
        this.hasExeImmediate = true
        fn()
      }
      this._clearTimer()
      this.timer = window.setInterval(fn, attemptFunc(this.interval) as number)
    }
  }

  _clearTimer(): void {
    if (this.type === 0) {
      if (this.timer) {
        window.clearTimeout(this.timer)
        this.timer = null
      }
    } else if (this.type === 1) {
      if (this.timer) {
        window.clearInterval(this.timer)
        this.timer = null
      }
    } else {
      try {
        if (this.timer) {
          window.clearInterval(this.timer)
          window.clearTimeout(this.timer)
          this.timer = null
        }
      } catch (e) {
        // eslint-disable-next-line no-empty
      }
    }
  }

  _destroy(): Polling {
    this.running && this.destroyHook && this.destroyHook()
    this._clearTimer()
    this.running = false
    return this
  }

  start(): Polling {
    if (this.running) return this
    this.running = true
    this._base()
    return this
  }

  destroy(): Polling {
    this._clearTimer()
    this.running = false
    return this
  }
}
