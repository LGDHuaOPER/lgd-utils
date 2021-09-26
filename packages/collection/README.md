<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-26 00:25:18
 * @LastEditTime: 2021-09-26 22:44:07
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\collection\README.md
-->
# `@lgd-utils/collection`

<div align="center">

[![Bundle size](https://img.shields.io/bundlephobia/minzip/@lgd-utils/collection.svg)](https://bundlephobia.com/result?p=@lgd-utils/collection)
[![MIT](https://img.shields.io/badge/license-MIT-000000.svg)](https://opensource.org/licenses/MIT/)
[![NPM downloads](https://img.shields.io/npm/dm/@lgd-utils/collection.svg?style=flat)](https://npmjs.org/package/@lgd-utils/collection)
[![NPM version](https://img.shields.io/npm/v/@lgd-utils/collection.svg?style=flat)](https://npmjs.org/package/@lgd-utils/collection)
[![lodash](https://img.shields.io/badge/lodash-4-green.svg)](https://github.com/lodash/lodash)
[![npm](https://img.shields.io/npm/dt/@lgd-utils/collection)](https://www.npmjs.com/package/@lgd-utils/collection)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

</div>

> A front-end collection tool

## Usage

```
import collection from '@lgd-utils/collection';

const array = [];
collection.forEach([1, 2, 3], (v, k) => {
  array.push(v + 1)
});
console.log(array); // [2, 3, 4]
```
