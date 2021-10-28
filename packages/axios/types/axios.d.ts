/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-21 10:39:44
 * @LastEditTime: 2021-10-28 14:16:57
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\types\axios.d.ts
 */

declare module 'axios/lib/helpers/buildURL' {
  export as namespace buildURL
  export = buildURL
  declare function buildURL(
    url: string,
    params?: Record<string, unknown>,
    paramsSerializer?: (params: Record<string, unknown>) => string,
  ): string
}

declare module 'axios/lib/core/buildFullPath' {
  export as namespace buildFullPath
  export = buildFullPath
  declare function buildFullPath(baseURL?: string, requestedURL?: string): string
}
