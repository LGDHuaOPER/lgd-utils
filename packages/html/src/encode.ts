/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 11:29:56
 * @LastEditTime: 2021-09-28 14:13:15
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\html\src\encode.ts
 */

/**
 * @remarks
 * 转义字符串中的 HTML 实体字符
 *
 * @param html - 字符串
 * @typeParam html - string | undefined
 * @returns 返回结果 - string | unknown
 */
export default function encode(html?: string): string | unknown {
  if (!html) return html

  let temp: HTMLDivElement | null = document.createElement('div')
  temp.textContent != null ? (temp.textContent = html) : (temp.innerText = html)
  const output = temp.innerHTML
  temp = null

  return output
}
