<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-09 20:46:45
 * @LastEditTime: 2021-09-09 23:24:18
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\utils\README.md
-->
# `@lgd-utils/utils`

> A front-end utils tool

## Usage

```
import utils from '@lgd-utils/utils';

utils.regexpTest(1, 2); // false
utils.regexpTest(/^\d+$/, '45'); // true
utils.undefinedTo(1, 2); // 1
utils.undefinedTo(undefined, 4); // 4
```
