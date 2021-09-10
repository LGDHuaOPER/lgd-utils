<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-10 20:12:33
 * @LastEditTime: 2021-09-10 21:54:25
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\array\README.md
-->
# `@lgd-utils/array`

> A front-end array tool

<div align="center">

[![MIT](https://img.shields.io/badge/license-MIT-000000.svg)](https://opensource.org/licenses/MIT/)
[![lodash](https://img.shields.io/badge/lodash-4-green.svg)](https://github.com/lodash/lodash)
[![npm](https://img.shields.io/npm/dt/@lgd-utils/array)](https://www.npmjs.com/package/@lgd-utils/array)

</div>

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

[blog]: https://lgdhuaoper.github.io/ '敬昭的博客'
