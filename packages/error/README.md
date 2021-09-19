<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-19 22:59:53
 * @LastEditTime: 2021-09-20 00:07:38
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\error\README.md
-->
# `@lgd-utils/error`

<div align="center">

[![Bundle size](https://img.shields.io/bundlephobia/minzip/@lgd-utils/error.svg)](https://bundlephobia.com/result?p=@lgd-utils/error)
[![MIT](https://img.shields.io/badge/license-MIT-000000.svg)](https://opensource.org/licenses/MIT/)
[![NPM downloads](https://img.shields.io/npm/dm/@lgd-utils/error.svg?style=flat)](https://npmjs.org/package/@lgd-utils/error)
[![NPM version](https://img.shields.io/npm/v/@lgd-utils/error.svg?style=flat)](https://npmjs.org/package/@lgd-utils/error)
[![lodash](https://img.shields.io/badge/lodash-4-green.svg)](https://github.com/lodash/lodash)
[![npm](https://img.shields.io/npm/dt/@lgd-utils/error)](https://www.npmjs.com/package/@lgd-utils/error)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

</div>

> A front-end error tool

## Usage

```
import error from '@lgd-utils/error';

const { CustomError } = error;
CustomError.isCustomError === true; // true
const customError = new CustomError('CustomError test', { key: 'value' })
customError.isCustomError === true; // true
console.log(customError.message); // 'CustomError test'
console.log(customError.key); // 'value'
```

## Contribute

- [LGD.HuaFEEng(LGD.HuaOPER)][blog]

## Documentation

- [Quick tutorial](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/error#readme)
- [Issue](https://github.com/LGDHuaOPER/lgd-utils/issues)

## Related

- [@lgd-utils/array](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/array) - A front-end array tool
- [@lgd-utils/cached-storage](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/cached-storage) - 一个具有失效功能的缓存存储
- [@lgd-utils/html](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/html) - A front-end html tool
- [@lgd-utils/number](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/number) - A front-end number tool
- [@lgd-utils/object](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/object) - A front-end object tool
- [@lgd-utils/utils](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/utils) - A front-end utils tool
- [@lgd-utils/validate](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/validate) - A front-end verification tool
- [More…](https://github.com/LGDHuaOPER/lgd-utils)

[blog]: https://lgdhuaoper.github.io/ '敬昭的博客'
