<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-09 20:46:45
 * @LastEditTime: 2021-10-21 13:59:35
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\README.md
-->
# `@lgd-utils/utils`

<div align="center">

[![Bundle size](https://img.shields.io/bundlephobia/minzip/@lgd-utils/utils.svg)](https://bundlephobia.com/result?p=@lgd-utils/utils)
[![MIT](https://img.shields.io/badge/license-MIT-000000.svg)](https://opensource.org/licenses/MIT/)
[![NPM downloads](https://img.shields.io/npm/dm/@lgd-utils/utils.svg?style=flat)](https://npmjs.org/package/@lgd-utils/utils)
[![NPM version](https://img.shields.io/npm/v/@lgd-utils/utils.svg?style=flat)](https://npmjs.org/package/@lgd-utils/utils)
[![lodash](https://img.shields.io/badge/lodash-4-green.svg)](https://github.com/lodash/lodash)
[![npm](https://img.shields.io/npm/dt/@lgd-utils/utils)](https://www.npmjs.com/package/@lgd-utils/utils)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

</div>

> A front-end utils tool

## Usage

```
import utils from '@lgd-utils/utils';

utils.assertValue(1, 1); // true
utils.assertValue('str', [3, null, /^\w+$/]); // true

utils.normalizeValue(2, 'String'); // '2'
utils.normalizeValue('3kb', 'Number', 4); // 4

utils.undefinedTo(1, 2); // 1
utils.undefinedTo(undefined, 4); // 4

utils.partialEq('true')(true); // false
utils.partialEq('false')('false'); // true
```

## Contribute

- [LGD.HuaFEEng(LGD.HuaOPER)][blog]

## Documentation

- [Quick tutorial](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/utils#readme)
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
- [@lgd-utils/regexp](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/regexp) - A front-end regexp tool
- [@lgd-utils/utils](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/utils) - A front-end utils tool
- [@lgd-utils/validate](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/validate) - A front-end verification tool
- [More…](https://github.com/LGDHuaOPER/lgd-utils)

[blog]: https://lgdhuaoper.github.io/ '敬昭的博客'
