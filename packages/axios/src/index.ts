/**
 * axios
 *
 * @remarks
 * A axios adapter and middleware tool
 *
 * @packageDocumentation
 */

/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-19 11:38:09
 * @LastEditTime: 2021-11-22 14:52:04
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\collection\src\index.ts
 */

export { default as adapterCacheWrapper } from './adapter/cacheWrapper'
export * as middlewareContentType from './middleware/contentType'
export { default as middlewareLodashTemplateUrl } from './middleware/lodashTemplateUrl'
export { default as middlewareMergeHeaders } from './middleware/mergeHeaders'
export { default as middlewareParamsSerializer } from './middleware/paramsSerializer'
export { default as middlewarePruneConfigProp } from './middleware/pruneConfigProp'
export * as middlewareRuntimeInterceptor from './middleware/runtimeInterceptor'

export { default } from './axios.default'
