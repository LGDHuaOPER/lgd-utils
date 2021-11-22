/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 22:15:20
 * @LastEditTime: 2021-11-22 14:54:31
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\src\axios.default.ts
 */

import adapterCacheWrapper from './adapter/cacheWrapper'
import * as middlewareContentType from './middleware/contentType'
import middlewareLodashTemplateUrl from './middleware/lodashTemplateUrl'
import middlewareMergeHeaders from './middleware/mergeHeaders'
import middlewareParamsSerializer from './middleware/paramsSerializer'
import middlewarePruneConfigProp from './middleware/pruneConfigProp'
import * as middlewareRuntimeInterceptor from './middleware/runtimeInterceptor'

export default {
  adapterCacheWrapper,
  middlewareContentType,
  middlewareLodashTemplateUrl,
  middlewareMergeHeaders,
  middlewareParamsSerializer,
  middlewarePruneConfigProp,
  middlewareRuntimeInterceptor,
}
