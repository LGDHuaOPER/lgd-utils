<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-19 22:59:53
 * @LastEditTime: 2021-11-18 15:16:30
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\number\README.md
-->
# `@lgd-utils/number`

<div align="center">

[![Bundle size](https://img.shields.io/bundlephobia/minzip/@lgd-utils/number.svg)](https://bundlephobia.com/result?p=@lgd-utils/number)
[![MIT](https://img.shields.io/badge/license-MIT-000000.svg)](https://opensource.org/licenses/MIT/)
[![NPM downloads](https://img.shields.io/npm/dm/@lgd-utils/number.svg?style=flat)](https://npmjs.org/package/@lgd-utils/number)
[![NPM version](https://img.shields.io/npm/v/@lgd-utils/number.svg?style=flat)](https://npmjs.org/package/@lgd-utils/number)
[![lodash](https://img.shields.io/badge/lodash-4-green.svg)](https://github.com/lodash/lodash)
[![npm](https://img.shields.io/npm/dt/@lgd-utils/number)](https://www.npmjs.com/package/@lgd-utils/number)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

</div>

> A front-end number tool

## Usage

```
import number from '@lgd-utils/number';

const { convertDataSize, convertLargeNumber } = number;
console.log(convertDataSize(1024, 'KB')); // ['1', 'MB', 1, 1024, 'KB']
console.log(convertLargeNumber(100000000)); // ['1.00', '亿', 1, 100000000, '']
```

## Contribute

- [LGD.HuaFEEng(LGD.HuaOPER)][blog]

## Documentation

- [Quick tutorial](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/number#readme)
- [Issue](https://github.com/LGDHuaOPER/lgd-utils/issues)

## Related

- [@lgd-utils/array](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/array) - A front-end array tool
- [@lgd-utils/axios](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/axios) - A axios adapter and middleware tool
- [@lgd-utils/cached-storage](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/cached-storage) - 一个具有失效功能的缓存存储库
- [@lgd-utils/collection](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/collection) - A front-end collection tool
- [@lgd-utils/error](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/error) - A front-end error tool
- [@lgd-utils/html](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/html) - A front-end html tool
- [@lgd-utils/object](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/object) - A front-end object tool
- [@lgd-utils/regexp](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/regexp) - A front-end regexp tool
- [@lgd-utils/symbol](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/symbol) - A front-end symbol tool
- [@lgd-utils/utils](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/utils) - A front-end utils tool
- [@lgd-utils/validate](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/validate) - A front-end verification tool
- [More…](https://github.com/LGDHuaOPER/lgd-utils)

[blog]: https://lgdhuaoper.github.io/ '敬昭的博客'
