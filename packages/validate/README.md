<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 17:04:33
 * @LastEditTime: 2021-09-09 23:27:17
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\validate\README.md
-->
# `@lgd-utils/validate`

> A front-end verification tool

## Usage

```
import validate from '@lgd-utils/validate';

validate.validToStringType(1, 'Number'); // true
validate.validToStringType(undefined, 'Null'); // false
validate.validToStringType(void 0, 'Undefined'); // true
validate.validToStringType(function () {}, 'Object'); // false
```
