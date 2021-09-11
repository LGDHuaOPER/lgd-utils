<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 17:04:33
 * @LastEditTime: 2021-09-11 16:26:24
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

validate.validToStringType(1, 'Number'); // true
validate.validToStringType(undefined, 'Null'); // false
validate.validToStringType(void 0, 'Undefined'); // true
validate.validToStringType(function () {}, 'Object'); // false
```

## Contribute

- [LGD.HuaFEEng(LGD.HuaOPER)][blog]

## Documentation

- [Quick tutorial](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/validate#readme)
- [Issue](https://github.com/LGDHuaOPER/lgd-utils/issues)

[blog]: https://lgdhuaoper.github.io/ '敬昭的博客'
