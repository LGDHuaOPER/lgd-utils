/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-10-28 14:16:21
 * @LastEditTime: 2021-10-28 16:49:36
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\types\middleware.d.ts
 */

declare interface ContentTypeDefaultsOptions {
  custom?: string | ((v: string, k: string, col: Record<string, string>) => string) | Record<string, string>
  headerKey?: string
  [propName: string]: unknown
}

declare interface ContentTypeRequestOptions {
  headerKey?: string
  type?: string
  fallbackConfigHeaders?:
    | boolean
    | ((
        headers: AxiosRequestHeaders,
        config: AxiosRequestConfig,
        instance?: AxiosInstance,
        options?: ContentTypeRequestOptions,
      ) => AxiosRequestHeaders)
  [propName: string]: unknown
}

declare interface LodashTemplateUrlOptions {
  disable?:
    | boolean
    | null
    | ((
        config: AxiosRequestConfig,
        instance?: AxiosInstance,
        options?: LodashTemplateUrlOptions,
      ) => boolean | null | undefined)
  enable?:
    | boolean
    | null
    | ((
        config: AxiosRequestConfig,
        instance?: AxiosInstance,
        options?: LodashTemplateUrlOptions,
      ) => boolean | null | undefined)
  enabledByDefault?: boolean | null
  urlParams?: Record<string, string>
  [propName: string]: unknown
}

declare type MergeHeadersMergeCustomizerSrcValueFn = (
  customHandlerMetaData: unknown,
  ...params: Parameters<MergeHeadersMergeCustomizer>
) => unknown

declare type MergeHeadersMergeCustomizer = (
  objValue: unknown,
  srcValue: MergeHeadersMergeCustomizerSrcValueFn | unknown,
  key: string,
  object: Record<string, unknown>,
  source: Record<string, unknown>,
  stack: unknown,
) => unknown

declare interface MergeHeadersOptions {
  mergeCustomizer?: MergeHeadersMergeCustomizer
  customHandlerMetaData?: unknown
  mergeWithUnShiftArg?: Record<string | unknown> | unknown
  customHeaders?: AxiosRequestHeaders
  omitOwnDeepByArgPredicate?: ((v: unknown, k: string) => boolean) | Array<unknown> | string | unknown
  omitOwnDeepByArgOptions?: {
    assertObject?: ((value?: unknown) => boolean) | undefined
    enableEmptyObject?: boolean | undefined
    validEmptyObjectIteratee?:
      | {
          <T>(value: T): T
          (): undefined
        }
      | undefined
    assertEmpty?: ((value?: any) => boolean) | undefined
  }
  [propName: string]: unknown
}

declare interface ParamsSerializerOptions {
  disable?:
    | boolean
    | null
    | ((
        config: AxiosRequestConfig,
        instance?: AxiosInstance,
        options?: ParamsSerializerOptions,
      ) => boolean | null | undefined)
  enable?:
    | boolean
    | null
    | ((
        config: AxiosRequestConfig,
        instance?: AxiosInstance,
        options?: ParamsSerializerOptions,
      ) => boolean | null | undefined)
  enabledByDefault?: boolean | null
  force?:
    | boolean
    | ((config: AxiosRequestConfig, instance?: AxiosInstance, options?: ParamsSerializerOptions) => boolean | undefined)
  [propName: string]: unknown
}

declare interface PruneConfigPropOptions {
  disable?:
    | boolean
    | null
    | ((
        config: AxiosRequestConfig,
        instance?: AxiosInstance,
        options?: PruneConfigPropOptions,
      ) => boolean | null | undefined)
  enable?:
    | boolean
    | null
    | ((
        config: AxiosRequestConfig,
        instance?: AxiosInstance,
        options?: PruneConfigPropOptions,
      ) => boolean | null | undefined)
  enabledByDefault?: boolean | null
  force?:
    | boolean
    | ((config: AxiosRequestConfig, instance?: AxiosInstance, options?: PruneConfigPropOptions) => boolean | undefined)
  [propName: string]: unknown
}

declare type RuntimeInterceptorFn = (config: AxiosRequestConfig) => AxiosRequestConfig

declare type RuntimeInterceptorFns = RuntimeInterceptorFn | RuntimeInterceptorFn[]

declare interface RuntimeInterceptorRequestFulfilledOptions {
  disable?:
    | boolean
    | null
    | ((
        config: AxiosRequestConfig,
        instance?: AxiosInstance,
        options?: RuntimeInterceptorRequestFulfilledOptions,
      ) => boolean | null | undefined)
  enable?:
    | boolean
    | null
    | ((
        config: AxiosRequestConfig,
        instance?: AxiosInstance,
        options?: RuntimeInterceptorRequestFulfilledOptions,
      ) => boolean | null | undefined)
  enabledByDefault?: boolean | null
  interceptor?: RuntimeInterceptorFns
  [propName: string]: unknown
}

declare interface RuntimeInterceptorResponseFulfilledOptions {
  disable?:
    | boolean
    | null
    | ((
        responseOrError: AxiosResponse | unknown,
        instance?: AxiosInstance,
        options?: RuntimeInterceptorResponseFulfilledOptions,
      ) => boolean | null | undefined)
  enable?:
    | boolean
    | null
    | ((
        responseOrError: AxiosResponse | unknown,
        instance?: AxiosInstance,
        options?: RuntimeInterceptorResponseFulfilledOptions,
      ) => boolean | null | undefined)
  enabledByDefault?: boolean | null
  interceptor?: RuntimeInterceptorFns
  [propName: string]: unknown
}

declare interface RuntimeInterceptorResponseFulfilledWrapperOptions {
  disable?:
    | boolean
    | null
    | ((
        responseOrError: AxiosResponse,
        instance?: AxiosInstance,
        options?: RuntimeInterceptorResponseFulfilledWrapperOptions,
      ) => boolean | null | undefined)
  enable?:
    | boolean
    | null
    | ((
        responseOrError: AxiosResponse,
        instance?: AxiosInstance,
        options?: RuntimeInterceptorResponseFulfilledWrapperOptions,
      ) => boolean | null | undefined)
  enabledByDefault?: boolean | null
  assertSuccess?: boolean | ((responseOrError: AxiosResponse, config?: AxiosRequestConfig) => boolean)
  config?: AxiosRequestConfig
  defaultResponseDataKey?: string | string[]
  interceptor?: {
    fulfilled?: RuntimeInterceptorFns
    rejected?: RuntimeInterceptorFns
  }
  responseDataDefaultValue?:
    | unknown
    | ((responseOrError: AxiosResponse, config?: AxiosRequestConfig) => undefined | unknown)
  responseDataKey?:
    | boolean
    | null
    | string
    | string[]
    | undefined
    | ((responseOrError: AxiosResponse, config?: AxiosRequestConfig) => boolean | null | string | string[] | undefined)
  defaultErrorMessage?: string
  defaultErrorMessageKey?: string | string[]
  errorMessageKey?:
    | string
    | string[]
    | ((responseOrError: AxiosResponse, config?: AxiosRequestConfig) => string | string[] | undefined)
  reject4error?:
    | boolean
    | ((responseOrError: AxiosResponse | unknown) => AxiosResponse | unknown | Promise<AxiosResponse | unknown>)
  [propName: string]: unknown
}

declare interface RuntimeInterceptorResponseRejectedOptions {
  disable?:
    | boolean
    | null
    | ((
        responseOrError: AxiosResponse | AxiosError | unknown,
        instance?: AxiosInstance,
        options?: RuntimeInterceptorResponseRejectedOptions,
      ) => boolean | null | undefined)
  enable?:
    | boolean
    | null
    | ((
        responseOrError: AxiosResponse | AxiosError | unknown,
        instance?: AxiosInstance,
        options?: RuntimeInterceptorResponseRejectedOptions,
      ) => boolean | null | undefined)
  enabledByDefault?: boolean | null
  interceptor?: RuntimeInterceptorFns
  [propName: string]: unknown
}

declare interface RuntimeInterceptorResponseRejectedWrapper {
  emptyErrorHook?: (responseOrError: unknown) => unknown | Promise<unknown>
  isAxiosErrorHook?: (
    response: AxiosResponse,
    responseOrError: AxiosError,
    done: (
      rejectedInterceptor: RuntimeInterceptorFns,
      reject4error:
        | boolean
        | ((responseOrError: AxiosError | unknown) => AxiosError | unknown | Promise<AxiosError | unknown>),
    ) => AxiosError | unknown | Promise<AxiosError | unknown>,
  ) => AxiosError | unknown | Promise<AxiosError | unknown>
  hasResponseNotAxiosErrorHook?: (
    response: AxiosResponse,
    responseOrError: AxiosError,
  ) => AxiosError | unknown | Promise<AxiosError | unknown>
  hasRequestHook?: (
    request: Pick<AxiosResponse, 'request'>,
    responseOrError: AxiosError,
  ) => AxiosError | unknown | Promise<AxiosError | unknown>
  otherErrorHook?: (responseOrError: unknown) => unknown | Promise<unknown>
  assertUseDefaultHook?: boolean | ((returnV: unknown, hookNames: string[]) => boolean | undefined)
  defaultHook?: (responseOrError: unknown) => unknown | Promise<unknown>
  [propName: string]: unknown
}
