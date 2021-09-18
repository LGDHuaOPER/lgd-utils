/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 11:29:56
 * @LastEditTime: 2021-09-18 11:33:17
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\html\src\encode.ts
 */

export default function encode(html?: string): string | unknown {
  if (!html) return html

  let temp: HTMLDivElement | null = document.createElement('div')
  temp.textContent != null ? (temp.textContent = html) : (temp.innerText = html)
  const output = temp.innerHTML
  temp = null

  return output
}
