<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-19 22:59:53
 * @LastEditTime: 2021-12-10 17:40:12
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\request-queue\README.md
-->
# `@lgd-utils/request-queue`

<div align="center">

[![Bundle size](https://img.shields.io/bundlephobia/minzip/@lgd-utils/request-queue.svg)](https://bundlephobia.com/result?p=@lgd-utils/request-queue)
[![MIT](https://img.shields.io/badge/license-MIT-000000.svg)](https://opensource.org/licenses/MIT/)
[![NPM downloads](https://img.shields.io/npm/dm/@lgd-utils/request-queue.svg?style=flat)](https://npmjs.org/package/@lgd-utils/request-queue)
[![NPM version](https://img.shields.io/npm/v/@lgd-utils/request-queue.svg?style=flat)](https://npmjs.org/package/@lgd-utils/request-queue)
[![lodash](https://img.shields.io/badge/lodash-4-green.svg)](https://github.com/lodash/lodash)
[![npm](https://img.shields.io/npm/dt/@lgd-utils/request-queue)](https://www.npmjs.com/package/@lgd-utils/request-queue)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

</div>

> A front-end request-queue tool

## Usage

```
import RequestQueue from '@lgd-utils/request-queue';

const requestQueue = new RequestQueue({
  requestList: [/* the requestList */]
})
requestQueue
  .start()
  .then(value => { /* the resolve */ })
  .catch(reason => { /* the reject */ })
```

## Contribute

- [LGD.HuaFEEng(LGD.HuaOPER)][blog]

## Documentation

- [Quick tutorial](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/request-queue#readme)
- [Issue](https://github.com/LGDHuaOPER/lgd-utils/issues)

## Related

- [@lgd-utils/array](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/array) - A front-end array tool
- [@lgd-utils/axios](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/axios) - A axios adapter and middleware tool
- [@lgd-utils/cached-storage](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/cached-storage) - 一个具有失效功能的缓存存储库
- [@lgd-utils/collection](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/collection) - A front-end collection tool
- [@lgd-utils/error](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/error) - A front-end error tool
- [@lgd-utils/html](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/html) - A front-end html tool
- [@lgd-utils/number](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/number) - A front-end number tool
- [@lgd-utils/object](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/object) - A front-end object tool
- [@lgd-utils/polling](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/polling) - A front-end polling tool
- [@lgd-utils/regexp](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/regexp) - A front-end regexp tool
- [@lgd-utils/symbol](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/symbol) - A front-end symbol tool
- [@lgd-utils/utils](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/utils) - A front-end utils tool
- [@lgd-utils/validate](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/validate) - A front-end verification tool
- [More…](https://github.com/LGDHuaOPER/lgd-utils)

[blog]: https://lgdhuaoper.github.io/ '敬昭的博客'
