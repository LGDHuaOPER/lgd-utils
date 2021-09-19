<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-10 20:12:33
 * @LastEditTime: 2021-09-20 00:04:53
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\array\README.md
-->
# `@lgd-utils/array`

<div align="center">

[![Bundle size](https://img.shields.io/bundlephobia/minzip/@lgd-utils/array.svg)](https://bundlephobia.com/result?p=@lgd-utils/array)
[![MIT](https://img.shields.io/badge/license-MIT-000000.svg)](https://opensource.org/licenses/MIT/)
[![NPM downloads](https://img.shields.io/npm/dm/@lgd-utils/array.svg?style=flat)](https://npmjs.org/package/@lgd-utils/array)
[![NPM version](https://img.shields.io/npm/v/@lgd-utils/array.svg?style=flat)](https://npmjs.org/package/@lgd-utils/array)
[![lodash](https://img.shields.io/badge/lodash-4-green.svg)](https://github.com/lodash/lodash)
[![npm](https://img.shields.io/npm/dt/@lgd-utils/array)](https://www.npmjs.com/package/@lgd-utils/array)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

</div>

> A front-end array tool

## Usage

```
import array from '@lgd-utils/array';
import lodashIsUndefined from 'lodash/isUndefined';

array.reduceWrap(['11', 22, undefined, void 0, null], null, lodashIsUndefined); // '11'
array.reduceWrap([undefined, void 0, 33], null, lodashIsUndefined); // 33
array.reduceWrap(
  [
    (_result: number) => _result + 1,
    (_result: number) => _result + 2,
    (_result: number) => _result + 3,
    (_result: number) => _result + 4,
    (_result: number) => _result + 5,
  ],
  (_result: number, fn: (_result: number) => number) => fn(_result),
  true,
  0
); // 15
```

## Contribute

- [LGD.HuaFEEng(LGD.HuaOPER)][blog]

## Documentation

- [Quick tutorial](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/array#readme)
- [Issue](https://github.com/LGDHuaOPER/lgd-utils/issues)

## Related

- [@lgd-utils/cached-storage](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/cached-storage) - 一个具有失效功能的缓存存储
- [@lgd-utils/error](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/error) - A front-end error tool
- [@lgd-utils/html](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/html) - A front-end html tool
- [@lgd-utils/number](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/number) - A front-end number tool
- [@lgd-utils/object](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/object) - A front-end object tool
- [@lgd-utils/utils](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/utils) - A front-end utils tool
- [@lgd-utils/validate](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/validate) - A front-end verification tool
- [More…](https://github.com/LGDHuaOPER/lgd-utils)

[blog]: https://lgdhuaoper.github.io/ '敬昭的博客'
