/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-11-12 00:26:14
 * @LastEditTime: 2021-11-12 00:33:13
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\object\src\attemptInvoke.ts
 */

import lodashInvoke from 'lodash/invoke'

/**
 * @remarks
 * 尝试调用 object 对象 path 上的方法，返回 调用结果 或者 捕捉到的错误对象
 *
 * @param object - 要检索的对象
 * @param path - PropertyPath
 * @param args - 调用方法时传递的参数
 * @typeParam object - Record\<string, unknown\>
 * @typeParam path - string | string[]
 * @typeParam args - unknown[]
 * @returns 返回 调用结果 或者 捕捉到的错误对象 - unknown
 */
export default function attemptInvoke(
  object: Record<string, unknown>,
  path: string | string[],
  ...args: unknown[]
): unknown {
  try {
    return lodashInvoke(object, path, ...args)
  } catch (e) {
    return e
  }
}
