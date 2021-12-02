/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-12-02 09:50:36
 * @LastEditTime: 2021-12-02 10:06:09
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\screenlog\types\screenlog.d.ts
 */

declare type ScreenLogOptions = {
  bgColor: string
  logColor: string
  infoColor: string
  warnColor: string
  errorColor: string
  fontSize: string
  proxyConsole: Array<'clear' | 'error' | 'info' | 'log' | 'warn'>
  css: string
  autoScroll: boolean
}
