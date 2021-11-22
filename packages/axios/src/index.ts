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
 * @LastEditTime: 2021-11-22 15:10:58
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\collection\src\index.ts
 */

import * as middlewareContentType from './middleware/contentType'
import * as middlewareRuntimeInterceptor from './middleware/runtimeInterceptor'

export { default as adapterCacheWrapper } from './adapter/cacheWrapper'
export { middlewareContentType }
export { default as middlewareLodashTemplateUrl } from './middleware/lodashTemplateUrl'
export { default as middlewareMergeHeaders } from './middleware/mergeHeaders'
export { default as middlewareParamsSerializer } from './middleware/paramsSerializer'
export { default as middlewarePruneConfigProp } from './middleware/pruneConfigProp'
export { middlewareRuntimeInterceptor }

export { default } from './axios.default'
