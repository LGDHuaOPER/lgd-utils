<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-10 20:12:33
 * @LastEditTime: 2021-11-22 16:02:12
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\packages\axios\README.md
-->
# `@lgd-utils/axios`

<div align="center">

[![Bundle size](https://img.shields.io/bundlephobia/minzip/@lgd-utils/axios.svg)](https://bundlephobia.com/result?p=@lgd-utils/axios)
[![MIT](https://img.shields.io/badge/license-MIT-000000.svg)](https://opensource.org/licenses/MIT/)
[![NPM downloads](https://img.shields.io/npm/dm/@lgd-utils/axios.svg?style=flat)](https://npmjs.org/package/@lgd-utils/axios)
[![NPM version](https://img.shields.io/npm/v/@lgd-utils/axios.svg?style=flat)](https://npmjs.org/package/@lgd-utils/axios)
[![lodash](https://img.shields.io/badge/lodash-4-green.svg)](https://github.com/lodash/lodash)
[![npm](https://img.shields.io/npm/dt/@lgd-utils/axios)](https://www.npmjs.com/package/@lgd-utils/axios)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

</div>

> A axios adapter and middleware tool

## Usage

```
import axios from 'axios';
import { adapterCacheWrapper } from '@lgd-utils/axios';

const http = axios.create({
	baseURL: '/',
	// cache will be enabled by default when http method is get
	adapter: adapterCacheWrapper(axios.defaults.adapter)
});

http.get('/api/userInfo'); // make real http request
http.get('/api/userInfo'); // use the response from the cache of previous request, without real http request made
http.get('/api/userInfo', { forceUpdateCache: true }); // will forceUpdate the cache and the the real http request invoked
http.get('/api/userInfo', { disableCache: true }); // disable cache manually and the the real http request invoked
```

#### 注意
- 如果使用 dist/axios.global.prod.js，需要先引入 axios 和 qs
```
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.bootcss.com/qs/6.10.1/qs.min.js"></script> 或
<script src="https://cdn.bootcdn.net/ajax/libs/qs/6.10.1/qs.js"></script>
```

## Contribute

- [LGD.HuaFEEng(LGD.HuaOPER)][blog]

## Documentation

- [Quick tutorial](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/axios#readme)
- [Issue](https://github.com/LGDHuaOPER/lgd-utils/issues)

## Related

- [@lgd-utils/array](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/array) - A front-end array tool
- [@lgd-utils/cached-storage](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/cached-storage) - 一个具有失效功能的缓存存储库
- [@lgd-utils/collection](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/collection) - A front-end collection tool
- [@lgd-utils/error](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/error) - A front-end error tool
- [@lgd-utils/html](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/html) - A front-end html tool
- [@lgd-utils/number](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/number) - A front-end number tool
- [@lgd-utils/object](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/object) - A front-end object tool
- [@lgd-utils/regexp](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/regexp) - A front-end regexp tool
- [@lgd-utils/symbol](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/symbol) - A front-end symbol tool
- [@lgd-utils/utils](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/utils) - A front-end utils tool
- [@lgd-utils/validate](https://github.com/LGDHuaOPER/lgd-utils/tree/main/packages/validate) - A front-end verification tool
- [More…](https://github.com/LGDHuaOPER/lgd-utils)

[blog]: https://lgdhuaoper.github.io/ '敬昭的博客'
