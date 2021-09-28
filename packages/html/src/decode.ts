/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 11:33:36
 * @LastEditTime: 2021-09-28 14:12:53
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\html\src\decode.ts
 */

/**
 * @remarks
 * 反转义字符串中的 HTML 实体字符
 *
 * @param text - 字符串
 * @typeParam text - string | undefined
 * @returns 返回结果 - string | unknown
 */
export default function decode(text?: string): string | unknown {
  if (!text) return text

  let temp: HTMLDivElement | null = document.createElement('div')
  temp.innerHTML = text
  const output = temp.innerText || temp.textContent
  temp = null

  return output
}
