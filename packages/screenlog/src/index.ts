/**
 * ScreenLog
 *
 * @remarks
 * Bring console.log and so on, on the screen
 *
 * @packageDocumentation
 */

/**
 * Class ScreenLog
 * @public
 */
export default class ScreenLog {
  static createElement(instance: ScreenLog, tag: string, css: string): HTMLElement {
    const element = document.createElement(tag)
    element.style.cssText = css
    element.id = instance.logElId
    return element
  }

  static createPanel(instance: ScreenLog): HTMLElement {
    const div = ScreenLog.createElement(
      instance,
      'div',
      'z-index: 2147483647; font-family: Helvetica,Arial,sans-serif; font-size: ' +
        instance._options.fontSize +
        '; padding: 5px; text-align: left; opacity: 0.8; position: fixed; right: 0; top: 0; min-width: 200px; max-width: 90vw; max-height: 50vh; overflow: auto; background:' +
        instance._options.bgColor +
        ';' +
        instance._options.css,
    )
    return div
  }

  static genericLogger(instance: ScreenLog, color: string): (...args: unknown[]) => void {
    return function (...args) {
      const el = ScreenLog.createElement(
        instance,
        'div',
        'line-height: 1.7em; min-height: 1.7em; background:' +
          ((instance.logEl as HTMLElement).children.length % 2 ? 'rgba(255,255,255,0.1)' : '') +
          '; color:' +
          color,
      )
      const val = [...args].reduce(function (prev, arg) {
        if (typeof arg !== 'object') return prev + ' ' + arg
        let objectArgStr
        try {
          objectArgStr = JSON.stringify(arg)
        } catch (error) {
          objectArgStr = ''
        }
        return prev + ' ' + objectArgStr
      }, '') as string
      el.textContent = val
      ;(instance.logEl as HTMLElement).appendChild(el)

      // Scroll to last element, if autoScroll option is set.
      if (instance._options.autoScroll) {
        ;(instance.logEl as HTMLElement).scrollTop =
          (instance.logEl as HTMLElement).scrollHeight - (instance.logEl as HTMLElement).clientHeight
      }
    }
  }

  static clear(instance: ScreenLog): void {
    ;(instance.logEl as HTMLElement).innerHTML = ''
  }

  static log(instance: ScreenLog, ...args: unknown[]): void {
    return ScreenLog.genericLogger(instance, instance._options.logColor).call(null, ...args)
  }

  static info(instance: ScreenLog, ...args: unknown[]): void {
    return ScreenLog.genericLogger(instance, instance._options.infoColor).call(null, ...args)
  }

  static warn(instance: ScreenLog, ...args: unknown[]): void {
    return ScreenLog.genericLogger(instance, instance._options.warnColor).call(null, ...args)
  }

  static error(instance: ScreenLog, ...args: unknown[]): void {
    return ScreenLog.genericLogger(instance, instance._options.errorColor).call(null, ...args)
  }

  static setOptions(instance: ScreenLog, options: Partial<ScreenLogOptions>): void {
    for (const i in options) {
      if (
        Object.prototype.hasOwnProperty.call(options, i) &&
        Object.prototype.hasOwnProperty.call(instance._options, i)
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        instance._options[i] = options[i]
      }
    }
  }

  static init(instance: ScreenLog, options?: Partial<ScreenLogOptions>): void {
    if (instance.isInitialized) {
      return
    }

    instance.isInitialized = true

    if (options) {
      ScreenLog.setOptions(instance, options)
    }

    instance.logEl = ScreenLog.createPanel(instance)
    document.body.appendChild(instance.logEl)

    if (instance._options.proxyConsole) {
      const proxyConsole = Array.isArray(instance._options.proxyConsole)
        ? instance._options.proxyConsole
        : [...instance.availableProxyConsoleFnNames]
      instance._options.proxyConsole = proxyConsole
      for (const i in proxyConsole) {
        const consoleFnName = proxyConsole[i]
        if (instance.availableProxyConsoleFnNames.indexOf(consoleFnName) > -1) {
          instance._console[consoleFnName] = console[consoleFnName]
          console[consoleFnName] = ScreenLog.originalFnCallDecorator(instance, ScreenLog[consoleFnName], consoleFnName)
        }
      }
    }

    function addEventListeners(ele: HTMLElement, type: string, callback: EventListenerOrEventListenerObject): void {
      try {
        // Chrome、FireFox、Opera、Safari、IE9.0及其以上版本
        ele.addEventListener(type, callback, false)
      } catch (e) {
        try {
          // IE8.0及其以下版本
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ele.attachEvent('on' + type, callback)
        } catch (ee) {
          // 早期浏览器
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ele['on' + type] = callback
        }
      }
    }
    addEventListeners(document.getElementById(instance.logElId) as HTMLElement, 'dblclick', function () {
      ScreenLog.clear(instance)
    })
  }

  static destroy(instance: ScreenLog): void {
    instance.isInitialized = false
    console.log = instance._console.log
    console.clear = instance._console.clear
    console.info = instance._console.info
    console.warn = instance._console.warn
    console.error = instance._console.error
    ;(instance.logEl as HTMLElement).remove()
  }

  /**
   * Checking if isInitialized is set
   */
  static checkInitialized(instance: ScreenLog): void {
    if (!instance.isInitialized) {
      throw new Error('You need to call "screenLog.init()" first.')
    }
  }

  /**
   * Decorator for checking if isInitialized is set
   */
  static checkInitDecorator(
    instance: ScreenLog,
    fn: (instance: ScreenLog, ...args: unknown[]) => unknown,
  ): (...args: unknown[]) => unknown {
    return function (...args: unknown[]) {
      ScreenLog.checkInitialized(instance)
      return fn.call(ScreenLog, instance, ...args)
    }
  }

  /**
   * Decorator for calling the original console's fn at the end of our overridden fn definitions.
   */
  static originalFnCallDecorator(
    instance: ScreenLog,
    fn: (instance: ScreenLog, ...args: unknown[]) => unknown,
    fnName: string,
  ): (...args: unknown[]) => unknown {
    return function (...args) {
      fn.call(ScreenLog, instance, ...args)
      if (typeof instance._console[fnName] === 'function') {
        instance._console[fnName].call(console, ...args)
      }
    }
  }

  public _options: ScreenLogOptions = {
    bgColor: 'black',
    logColor: 'lightgreen',
    infoColor: 'blue',
    warnColor: 'orange',
    errorColor: 'red',
    fontSize: '1em',
    proxyConsole: ['clear', 'error', 'warn'],
    css: '',
    autoScroll: true,
  }

  // backup console obj to contain references of overridden fns.
  public _console: Record<string, (...args: unknown[]) => unknown> = {}

  public availableProxyConsoleFnNames: Array<'clear' | 'error' | 'info' | 'log' | 'warn'> = [
    'clear',
    'error',
    'info',
    'log',
    'warn',
  ]

  public isInitialized = false

  public logEl?: HTMLElement = void 0

  public logElId: string = '__screen_log_instance_id_' + Math.random() + '__'

  constructor(availableProxyConsoleFnNames?: Array<'clear' | 'error' | 'info' | 'log' | 'warn'>) {
    if (Array.isArray(availableProxyConsoleFnNames)) this.availableProxyConsoleFnNames = availableProxyConsoleFnNames
  }

  init(...args: Array<Partial<ScreenLogOptions>>): void {
    return ScreenLog.init(this, ...args)
  }

  log(...args: unknown[]): unknown {
    return ScreenLog.originalFnCallDecorator(this, ScreenLog.checkInitDecorator(this, ScreenLog.log), 'log')(...args)
  }

  clear(...args: unknown[]): unknown {
    return ScreenLog.originalFnCallDecorator(
      this,
      ScreenLog.checkInitDecorator(this, ScreenLog.clear),
      'clear',
    )(...args)
  }

  info(...args: unknown[]): unknown {
    return ScreenLog.originalFnCallDecorator(this, ScreenLog.checkInitDecorator(this, ScreenLog.info), 'info')(...args)
  }

  warn(...args: unknown[]): unknown {
    return ScreenLog.originalFnCallDecorator(this, ScreenLog.checkInitDecorator(this, ScreenLog.warn), 'warn')(...args)
  }

  error(...args: unknown[]): unknown {
    return ScreenLog.originalFnCallDecorator(
      this,
      ScreenLog.checkInitDecorator(this, ScreenLog.error),
      'error',
    )(...args)
  }

  destroy(...args: unknown[]): unknown {
    return ScreenLog.checkInitDecorator(this, ScreenLog.destroy)(...args)
  }
}
