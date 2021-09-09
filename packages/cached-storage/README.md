<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-08-30 19:45:52
 * @LastEditTime: 2021-09-09 23:22:32
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\cached-storage\README.md
-->
# `@lgd-utils/cached-storage`

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
