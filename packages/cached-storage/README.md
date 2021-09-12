<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-08-30 19:45:52
 * @LastEditTime: 2021-09-12 11:42:57
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\cached-storage\README.md
-->
# `@lgd-utils/cached-storage`

<div align="center">

[![Bundle size](https://img.shields.io/bundlephobia/minzip/@lgd-utils/cached-storage.svg)](https://bundlephobia.com/result?p=@lgd-utils/cached-storage)
[![MIT](https://img.shields.io/badge/license-MIT-000000.svg)](https://opensource.org/licenses/MIT/)
[![NPM downloads](https://img.shields.io/npm/dm/@lgd-utils/cached-storage.svg?style=flat)](https://npmjs.org/package/@lgd-utils/cached-storage)
[![NPM version](https://img.shields.io/npm/v/@lgd-utils/cached-storage.svg?style=flat)](https://npmjs.org/package/@lgd-utils/cached-storage)
[![lodash](https://img.shields.io/badge/lodash-4-green.svg)](https://github.com/lodash/lodash)
[![npm](https://img.shields.io/npm/dt/@lgd-utils/cached-storage)](https://www.npmjs.com/package/@lgd-utils/cached-storage)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

</div>

> 一个具有失效功能的缓存存储

## Usage

```
const CachedStorage = require('@lgd-utils/cached-storage').default;

const cachedStorage = new CachedStorage();

cachedStorage.setItem('__TEST_KEY__', '__TEST_VALUE__', 2);

cachedStorage.getItem('__TEST_KEY__'); // '__TEST_VALUE__'
setTimeout (function () {
  cachedStorage.getItem('__TEST_KEY__'); // null
}, 1000 * 60 * 2)
```

## Thanks
灵感来源于 [lscache](http://github.com/pamelafox/lscache)，原库只有 localStorage，现扩展支持 localStorage / sessionStorage / memoryStorage

## Contribute

- [LGD.HuaFEEng(LGD.HuaOPER)][blog]

## Documentation

- [Quick tutorial](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/cached-storage#readme)
- [Issue](https://github.com/LGDHuaOPER/lgd-utils/issues)

## Related

- [@lgd-utils/array](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/array) - A front-end array tool
- [@lgd-utils/utils](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/utils) - A front-end utils tool
- [@lgd-utils/validate](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/validate) - A front-end verification tool
- [More…](https://github.com/LGDHuaOPER/lgd-utils)

[blog]: https://lgdhuaoper.github.io/ '敬昭的博客'
