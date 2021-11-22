/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-11-22 14:09:32
 * @LastEditTime: 2021-11-22 14:39:14
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\array\types\array.d.ts
 */

declare type WaterfallParameterFn = (result: unknown, i?: number, arr?: WaterfallParameterFn[]) => unknown

declare type WaterfallParameterFns = WaterfallParameterFn | WaterfallParameterFn[]

declare type WaterfallsParameterFn = (result: unknown[], i?: number, arr?: WaterfallsParameterFn[]) => unknown[]

declare type WaterfallsParameterFns = WaterfallsParameterFn | WaterfallsParameterFn[]
