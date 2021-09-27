<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 17:04:33
 * @LastEditTime: 2021-09-27 14:10:41
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\README.md
-->
# `@lgd-utils/validate`

<div align="center">

[![Bundle size](https://img.shields.io/bundlephobia/minzip/@lgd-utils/validate.svg)](https://bundlephobia.com/result?p=@lgd-utils/validate)
[![MIT](https://img.shields.io/badge/license-MIT-000000.svg)](https://opensource.org/licenses/MIT/)
[![NPM downloads](https://img.shields.io/npm/dm/@lgd-utils/validate.svg?style=flat)](https://npmjs.org/package/@lgd-utils/validate)
[![NPM version](https://img.shields.io/npm/v/@lgd-utils/validate.svg?style=flat)](https://npmjs.org/package/@lgd-utils/validate)
[![lodash](https://img.shields.io/badge/lodash-4-green.svg)](https://github.com/lodash/lodash)
[![npm](https://img.shields.io/npm/dt/@lgd-utils/validate)](https://www.npmjs.com/package/@lgd-utils/validate)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

</div>

> A front-end verification tool

## Usage

```
import validate from '@lgd-utils/validate';
import lodashTrim from 'lodash/trim';

validate.validToStringType(1, 'Number'); // true
validate.validToStringType(undefined, 'Null'); // false
validate.validToStringType(void 0, 'Undefined'); // true
validate.validToStringType(function () {}, 'Object'); // false

validate.validEmptyString(1); // false
validate.validEmptyString('  '); // false
validate.validEmptyString(''); // true
validate.validEmptyString('  ', lodashTrim); // true
```

## Contribute

- [LGD.HuaFEEng(LGD.HuaOPER)][blog]

## Documentation

- [Quick tutorial](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/validate#readme)
- [Issue](https://github.com/LGDHuaOPER/lgd-utils/issues)

## Related

- [@lgd-utils/array](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/array) - A front-end array tool
- [@lgd-utils/cached-storage](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/cached-storage) - 一个具有失效功能的缓存存储
- [@lgd-utils/collection](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/collection) - A front-end collection tool
- [@lgd-utils/error](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/error) - A front-end error tool
- [@lgd-utils/html](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/html) - A front-end html tool
- [@lgd-utils/number](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/number) - A front-end number tool
- [@lgd-utils/object](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/object) - A front-end object tool
- [@lgd-utils/regexp](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/regexp) - A front-end regexp tool
- [@lgd-utils/utils](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/utils) - A front-end utils tool
- [More…](https://github.com/LGDHuaOPER/lgd-utils)

[blog]: https://lgdhuaoper.github.io/ '敬昭的博客'
