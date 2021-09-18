/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-18 11:33:36
 * @LastEditTime: 2021-09-18 11:34:16
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\html\src\decode.ts
 */

export default function decode(text?: string): string | unknown {
  if (!text) return text

  let temp: HTMLDivElement | null = document.createElement('div')
  temp.innerHTML = text
  const output = temp.innerText || temp.textContent
  temp = null

  return output
}
