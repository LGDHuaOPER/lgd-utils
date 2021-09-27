<!--
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 23:55:10
 * @LastEditTime: 2021-09-27 20:53:20
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\README.md
-->
<h1 align="center">@lgd-utils</h1>

<h3 align="center">The utils for lgd.</h3>

- @lgd-utils/array [![npm](https://img.shields.io/npm/dt/@lgd-utils/array)](https://www.npmjs.com/package/@lgd-utils/array)
- @lgd-utils/cached-storage [![npm](https://img.shields.io/npm/dt/@lgd-utils/cached-storage)](https://www.npmjs.com/package/@lgd-utils/cached-storage)
- @lgd-utils/collection [![npm](https://img.shields.io/npm/dt/@lgd-utils/collection)](https://www.npmjs.com/package/@lgd-utils/collection)
- @lgd-utils/error [![npm](https://img.shields.io/npm/dt/@lgd-utils/error)](https://www.npmjs.com/package/@lgd-utils/error)
- @lgd-utils/html [![npm](https://img.shields.io/npm/dt/@lgd-utils/html)](https://www.npmjs.com/package/@lgd-utils/html)
- @lgd-utils/number [![npm](https://img.shields.io/npm/dt/@lgd-utils/number)](https://www.npmjs.com/package/@lgd-utils/number)
- @lgd-utils/object [![npm](https://img.shields.io/npm/dt/@lgd-utils/object)](https://www.npmjs.com/package/@lgd-utils/object)
- @lgd-utils/regexp [![npm](https://img.shields.io/npm/dt/@lgd-utils/regexp)](https://www.npmjs.com/package/@lgd-utils/regexp)
- @lgd-utils/utils [![npm](https://img.shields.io/npm/dt/@lgd-utils/utils)](https://www.npmjs.com/package/@lgd-utils/utils)
- @lgd-utils/validate [![npm](https://img.shields.io/npm/dt/@lgd-utils/validate)](https://www.npmjs.com/package/@lgd-utils/validate)

## 1. 项目准备
### 1.1 全局安装 lerna 和 typescript
```
npm install lerna typescript -g
```

### 1.2 git 初始化项目目录
```
git init lgd-utils
```

### 1.3 git 本地配置
```
git config --local user.name LGDHuaOPER
git config --local user.email lgd.huaoper@gmail.com
```

### 1.4 npm 配置
```
npm config set registry=https://r.npm.taobao.org
```

### 1.5 lerna 初始化项目
```
cd lgd-utils/
lerna init / lerna init -i / lerna init --independent #是否使用独立的版本控制模式
```

### 1.6 创建两个 package
```
lerna create @lgd-utils/cached-storage --es-module
lerna create @lgd-utils/validate --es-module
```

### 1.7 给 package 安装依赖
```
lerna add @lgd-utils/validate --scope @lgd-utils/cached-storage
lerna add globalthis --scope @lgd-utils/cached-storage
lerna add lodash --scope @lgd-utils/cached-storage
lerna add memorystorage --scope @lgd-utils/cached-storage
lerna add @types/globalthis --dev --scope @lgd-utils/cached-storage
lerna add @types/lodash --dev --scope @lgd-utils/cached-storage
lerna add lodash --scope @lgd-utils/validate
lerna add @types/lodash --dev --scope @lgd-utils/validate
```

### 1.8 整个项目安装开发环境依赖
#### 1.8.1 安装和初始化 typescript
```
npm i -D typescript
npx tsc --init
```

#### 1.8.2 配置 tsconfig.json
```
{
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig.json to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Enable incremental compilation */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./",                          /* Specify the folder for .tsbuildinfo incremental compilation files. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    "lib": [
      "esnext",
      "dom"
    ] /* Specify a set of bundled library declaration files that describe the target runtime environment. */,
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    "experimentalDecorators": true /* Enable experimental support for TC39 stage 2 draft decorators. */,
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h' */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using `jsx: react-jsx*`.` */
    // "reactNamespace": "",                             /* Specify the object invoked for `createElement`. This only applies when targeting `react` JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    "useDefineForClassFields": false /* Emit ECMAScript-standard-compliant class fields. */,

    /* Modules */
    // "module": "commonjs",                                /* Specify what module code is generated. */
    "module": "esnext" /* Specify what module code is generated. */,
    // "rootDir": "./" /* Specify the root folder within your source files. */,
    "rootDir": "." /* Specify the root folder within your source files. */,
    "moduleResolution": "node" /* Specify how TypeScript looks up a file from a given module specifier. */,
    // "baseUrl": "./" /* Specify the base directory to resolve non-relative module names. */,
    "baseUrl": "." /* Specify the base directory to resolve non-relative module names. */,
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    "paths": {
      "@lgd-utils/*": ["packages/*/src"]
    } /* Specify a set of entries that re-map imports to additional lookup locations. */,
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like `./node_modules/@types`. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    "types": [
      "globalthis",
      "jest",
      "lodash",
      "node"
    ] /* Specify type package names to be included without being referenced in a source file. */,
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    "resolveJsonModule": true /* Enable importing .json files */,
    // "noResolve": true,                                /* Disallow `import`s, `require`s or `<reference>`s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files. */
    "allowJs": false /* Allow JavaScript files to be a part of your program. Use the `checkJS` option to get errors from these files. */,
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from `node_modules`. Only applicable with `allowJs`. */

    /* Emit */
    "declaration": true /* Generate .d.ts files from TypeScript and JavaScript files in your project. */,
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    "sourceMap": false /* Create source map files for emitted JavaScript files. */,
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If `declaration` is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    "outDir": "dist" /* Specify an output folder for all emitted files. */,
    // "removeComments": true,                           /* Disable emitting comments. */
    "removeComments": false /* Disable emitting comments. */,
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "importsNotUsedAsValues": "remove",               /* Specify emit/checking behavior for imports that are only used for types */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have `@internal` in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like `__extends` in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing `const enum` declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */,
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

    /* Type Checking */
    "strict": true /* Enable all strict type-checking options. */,
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied `any` type.. */
    // "strictNullChecks": true,                         /* When type checking, take into account `null` and `undefined`. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for `bind`, `call`, and `apply` methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "noImplicitThis": true,                           /* Enable error reporting when `this` is given the type `any`. */
    // "useUnknownInCatchVariables": true,               /* Type catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    "noUnusedLocals": true /* Enable error reporting when a local variables aren't read. */,
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Include 'undefined' in index signature results */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  },
  "include": [
    "packages/built-in.d.ts",
    "packages/global.d.ts",
    "packages/*/__tests__",
    "packages/*/src",
    "packages/*/types",
    "test-dts"
  ]
}
```

#### 1.8.3 安装和初始化 eslint
```
npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npx eslint --init
```

#### 1.8.4 配置 .eslintrc.yml
```
root: true
env:
  browser: true
  es2021: true
  node: true
extends:
  - 'eslint:recommended'
  - 'plugin:@typescript-eslint/recommended'
parser: '@typescript-eslint/parser'
parserOptions:
  ecmaVersion: 12
  sourceType: module
plugins:
  - '@typescript-eslint'
```

#### 1.8.5 配置 .eslintignore
```
test/**
lib/**
types/**
__tests__/**
dist/**

*.js
.*.js
*.config.js

packages/*/test/**
packages/*/lib/**
packages/*/types/**
packages/*/__tests__/**
packages/*/dist/**
```

#### 1.8.6 安装和初始化 prettier
```
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

#### 1.8.7 配置 .prettierrc
```
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 120
}
```

#### 1.8.8 配置 .prettierignore
```
{
  "ignored": false,
  "inferredParser": "typescript"
}
```

#### 1.8.9 修改 .eslintrc.yml，添加如下代码
```
extends:
  - 'plugin:prettier/recommended'
```

### 1.9 配置 .editorconfig
```
touch .editorconfig
```

```
// 在根目录创建 .editorconfig 文件，添加以下代码
root = true

[*]
# 设置字符集
charset = utf-8
# 缩进风格
indent_style = space
# 缩进空格
indent_size = 2
# 结尾换行
end_of_line = crlf
# 文件末尾换行符
insert_final_newline = true
# 删除代码前后空格
trim_trailing_whitespace = true

[*.md]
insert_final_newline = false
trim_trailing_whitespace = false

[.husky/**]
end_of_line = lf
```

### 1.10 安装和初始化 husky lint-staged commitlint commitizen standard-version cross-env
```
npm i -D husky lint-staged @commitlint/cli @commitlint/config-conventional commitizen cz-customizable @commitlint/config-lerna-scopes commitlint-config-gitmoji standard-version cross-env
```

#### 1.10.1 生成 commitlint.config.js
```
touch commitlint.config.js
```

#### 1.10.2 配置 commitlint.config.js
```
const czConfig = require('./.cz-config.js')

module.exports = {
  extends: ['@commitlint/config-lerna-scopes', 'gitmoji'],
  // parserPreset: {
  //   parserOpts: {
  //     headerPattern: /^(:\w*:)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
  //     headerCorrespondence: ['type', 'scope', 'subject', 'ticket'],
  //   },
  // },
  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {
    // 'type-enum': [
    //   1,
    //   'always',
    //   ['docs', 'build', 'chore', 'ci', 'feat', 'fix', 'init', 'perf', 'refactor', 'revert', 'style', 'test'],
    // ],
    'type-enum': [
      1,
      'always',
      czConfig.types
        .map((v) => {
          const valueMatches = v.value.match(/^\:\w+\:\s(\w+)$/)
          if (valueMatches && valueMatches[1]) return valueMatches[1]
          return null
        })
        .filter(Boolean),
    ],
    // lerna version 时关闭一些校验，只 warn
    ...(process.env.GIT_COMMIT_TYPE === 'CZ'
      ? null
      : {
          'start-with-gitmoji': [1, 'always'],
          'subject-empty': [1, 'always'],
          'type-empty': [1, 'always'],
        }),
  },
}
```

#### 1.10.3 在 package.json 中 scripts 中添加如下脚本
"scripts": {
  "commit": "cross-env GIT_COMMIT_TYPE=CZ cz"
}

#### 1.10.4 在 package.json 中添加以下代码，这里用的自定义 commitizen，使用 git-cz 执行命令
"config": {
  "commitizen": {
    "path": "./node_modules/cz-customizable"
  }
}

#### 1.10.5 生成 .cz-config.js
```
touch .cz-config.js
```

#### 1.10.6 配置 .cz-config.js
```
module.exports = {
  types: [
    { value: ':pencil2: docs', name: '✏️ docs:  文档变更' },
    { value: ':package: build', name: '📦‍ build:  打包构建' },
    { value: ':rocket: chore', name: '🚀 chore:  构建过程或辅助工具的变动' },
    { value: ':construction_worker: ci', name: '👷 ci:  CI 相关的变动' },
    { value: ':sparkles: feat', name: '✨ feat:  新功能' },
    { value: ':bug: fix', name: '🐛 fix:  Bug 修复' },
    { value: ':tada: init', name: '🎉 init:  初始化' },
    { value: ':zap: perf', name: '⚡️ perf:  性能优化' },
    { value: ':recycle: refactor', name: '♻️ refactor:  代码重构(既不是增加feature，也不是修复bug)' },
    { value: ':rewind: revert', name: '⏪️ revert:  回退' },
    { value: ':art: style', name: '🎨 style:  代码风格(不影响代码运行的变动)' },
    { value: ':white_check_mark: test', name: '✅ test:  增加、更新或通过测试' },
  ],
  // override the messages, defaults are as follows
  messages: {
    body: '请输入详细描述(可选):',
    breaking: '列出任何BREAKING CHANGES(可选):',
    confirmCommit: '确认使用以上信息提交吗？(y/n/e/h)',
    // used if allowCustomScopes is true
    customScope: '请输入文件修改范围(可选):',
    footer: '请输入要关闭的issue(可选):',
    scope: '请输入文件修改范围(可选):',
    subject: '请简要描述提交(必填):',
    type: '请选择提交类型(必填):',
  },
  allowCustomScopes: true,
  // allowBreakingChanges: ['feat', 'fix'],
  allowBreakingChanges: [':sparkles: feat', ':bug: fix'],
  // skipQuestions: ['body', 'footer'],
  // limit subject length, commitlint默认是72
  subjectLimit: 72,
}
```

#### 1.10.7 初始化 husky 配置
```
npx husky-init
npx husky add .husky/commit-msg
```

#### 1.10.8 在 .husky 文件夹中的 pre-commit 中添加如下代码
```
npx --no-install lint-staged
```

#### 1.10.9 在 .husky 文件夹中的 commit-msg 中添加如下代码
```
npx --no-install commitlint --edit "$1"
```

#### 1.10.10 在 package.json 中的 scripts 添加如下脚本
```
{
  "scripts": {
    "release": "standard-version"
  }
}
```

#### 1.10.11 生成 versionrc.js
```
touch versionrc.js
```

#### 1.10.12 配置 versionrc.js
```
module.exports = {
  types: [
    { type: 'build', section: '📦‍ Build System | 打包构建' },
    { type: 'chore', section: '🚀 Chore | 构建/工程依赖/工具' },
    { type: 'ci', section: '👷 Continuous Integration | CI 配置' },
    { type: 'docs', section: '✏️ Documentation | 文档' },
    { type: 'feat', section: '✨ Features | 新功能' },
    { type: 'fix', section: '🐛 Bug Fixes | Bug 修复' },
    { type: 'init', section: '🎉 Init | 初始化' },
    { type: 'perf', section: '⚡ Performance Improvements | 性能优化' },
    { type: 'refactor', section: '♻️ Code Refactoring | 代码重构' },
    { type: 'revert', section: '⏪ Revert | 回退' },
    { type: 'style', section: '💄 Styles | 风格' },
    { type: 'test', section: '✅ Tests | 测试' },
  ],
}
```

#### 1.10.13 gitmoji 使用FAQ
```
https://github.com/arvinxx/gitmoji-commit-workflow/tree/master/packages/commitlint-plugin#fetch-error

https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json
```

### 1.11 安装和初始化 babel
```
npm i -D @babel/core @babel/plugin-transform-runtime @babel/preset-env @rollup/plugin-babel
```

#### 1.11.1 生成 babel.config.json
```
touch babel.config.json
```

#### 1.11.2 配置 babel.config.json
```
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 设置为 false，否则 Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS ，导致 Rollup 的一些处理失败。
        "modules": false
      }
    ]
  ],
  "env": {
    "test": {
      "plugins": ["@babel/plugin-transform-runtime"],
      "presets": [["@babel/preset-env", { "targets": { "node": "current" } }]]
    }
  }
}
```

### 1.12 安装和初始化 jest
```
npm i -D jest ts-jest @types/jest ts-node jest-chain jest-extended
npx jest --init
```

#### 1.12.1 配置 jest.config.ts
```
export default {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  // bail: 0,

  // The directory where Jest should store its cached dependency information
  // cacheDirectory: "C:\\Users\\HuaFEEng\\AppData\\Local\\Temp\\jest",

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // collectCoverageFrom: undefined,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  // coveragePathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],

  // Indicates which provider should be used to instrument code for coverage
  // coverageProvider: "babel",

  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,

  // A path to a custom dependency extractor
  // dependencyExtractor: undefined,

  // Make calling deprecated APIs throw helpful error messages
  // errorOnDeprecated: false,

  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A path to a module which exports an async function that is triggered once before all test suites
  // globalSetup: undefined,

  // A path to a module which exports an async function that is triggered once after all test suites
  // globalTeardown: undefined,

  // A set of global variables that need to be available in all test environments
  // globals: {},

  // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
  // maxWorkers: "50%",

  // An array of directory names to be searched recursively up from the requiring module's location
  // moduleDirectories: [
  //   "node_modules"
  // ],

  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "json",
  //   "node"
  // ],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  // moduleNameMapper: {},
  moduleNameMapper: { '^@lgd-utils/(.*?)$': '<rootDir>/packages/$1/src' },

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // Activates notifications for test results
  // notify: false,

  // An enum that specifies notification mode. Requires { notify: true }
  // notifyMode: "failure-change",

  // A preset that is used as a base for Jest's configuration
  // preset: undefined,

  // Run tests from one or more projects
  // projects: undefined,

  // Use this configuration option to add custom reporters to Jest
  // reporters: undefined,

  // Automatically reset mock state between every test
  // resetMocks: false,

  // Reset the module registry before running each individual test
  // resetModules: false,

  // A path to a custom resolver
  // resolver: undefined,

  // Automatically restore mock state between every test
  // restoreMocks: false,

  // The root directory that Jest should scan for tests and modules within
  // rootDir: undefined,

  // A list of paths to directories that Jest should use to search for files in
  // roots: [
  //   "<rootDir>"
  // ],

  // Allows you to use a custom runner instead of Jest's default test runner
  // runner: "jest-runner",

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // setupFilesAfterEnv: [],
  // setupFilesAfterEnv: ['jest-extended', 'jest-chain'],
  setupFilesAfterEnv: ['jest-extended'],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  // slowTestThreshold: 5,

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  // snapshotSerializers: [],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // Options that will be passed to the testEnvironment
  // testEnvironmentOptions: {},

  // Adds a location field to test results
  // testLocationInResults: false,

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  // testPathIgnorePatterns: [
  //   "\\\\node_modules\\\\"
  // ],
  testPathIgnorePatterns: ['node_modules[\\\\/]', '\\.history[\\\\/].+$'],

  // The regexp pattern or array of patterns that Jest uses to detect test files
  // testRegex: [],
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',

  // This option allows the use of a custom results processor
  // testResultsProcessor: undefined,

  // This option allows use of a custom test runner
  // testRunner: "jest-circus/runner",

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  // testURL: "http://localhost",

  // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
  // timers: "real",

  // A map from regular expressions to paths to transformers
  // transform: undefined,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  // transformIgnorePatterns: [
  //   "\\\\node_modules\\\\",
  //   "\\.pnp\\.[^\\\\]+$"
  // ],
  transformIgnorePatterns: ['node_modules[\\\\/](?!(_?(@babel|lodash).*)[\\\\/])', '\\.history[\\\\/].+$'],

  // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
  // unmockedModulePathPatterns: undefined,

  // Indicates whether each individual test should be reported during the run
  // verbose: undefined,

  // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
  // watchPathIgnorePatterns: [],
  watchPathIgnorePatterns: [
    '.git[\\\\/]',
    '.history[\\\\/]',
    '.husky[\\\\/]',
    'coverage[\\\\/]',
    'dist[\\\\/]',
    'node_modules[\\\\/]',
    'temp[\\\\/]',
  ],

  // Whether to use watchman for file crawling
  // watchman: true,
  extensionsToTreatAsEsm: ['.tsx?', '.jsx?'],
}
```

### 1.13 安装和初始化 api-extractor
```
npm i -D @microsoft/api-extractor
```

#### 1.13.1 生成 api-extractor.json
```
touch api-extractor.json
```

#### 1.13.2 配置 api-extractor.json
```
{
  "$schema": "https://developer.microsoft.com/json-schemas/api-extractor/v7/api-extractor.schema.json",

  "apiReport": {
    "enabled": true,
    "reportFolder": "<projectFolder>/temp/"
  },

  "docModel": {
    "enabled": true
  },

  "dtsRollup": {
    "enabled": true
  },

  "tsdocMetadata": {
    "enabled": false
  },

  "messages": {
    "compilerMessageReporting": {
      "default": {
        "logLevel": "warning"
      }
    },

    "extractorMessageReporting": {
      "default": {
        "logLevel": "warning",
        "addToApiReportFile": true
      },

      "ae-missing-release-tag": {
        "logLevel": "none"
      }
    },

    "tsdocMessageReporting": {
      "default": {
        "logLevel": "warning"
      },

      "tsdoc-undefined-tag": {
        "logLevel": "none"
      }
    }
  }
}
```

#### 1.13.3 在 packages/* 下配置 api-extractor.json
```
{
  "extends": "../../api-extractor.json",
  "mainEntryPointFilePath": "./dist/packages/<unscopedPackageName>/src/index.d.ts",
  "dtsRollup": {
    "publicTrimmedFilePath": "./dist/<unscopedPackageName>.d.ts"
  }
}
```

#### 1.13.4 生成 tsdoc.json
```
touch tsdoc.json
```

#### 1.13.5 配置 tsdoc.json
```
{
  "$schema": "https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json",

  "extends": ["@microsoft/api-extractor/extends/tsdoc-base.json"],

  "tagDefinitions": [
    {
      "tagName": "@typeReturns",
      "syntaxKind": "block",
      "allowMultiple": false
    }
  ],

  "supportForTags": {
    "@typeReturns": true
  }
}
```

#### 1.13.6 修改 .eslintrc.yml，添加如下代码
```
plugins:
  - 'eslint-plugin-tsdoc'
rules:
  'tsdoc/syntax': warn
```

## 2. 项目运行
### 2.1 项目开发
```
npm run dev -- <packageName>
```

### 2.2 项目构建
```
npm run build / npm run build:t
```

### 2.3 项目测试
```
npm run test
```

### 2.4 项目提交
```
npm run commit
```

## 3. 项目协作
### 3.1 克隆仓库
```
git clone git@github.com:LGDHuaOPER/lgd-utils.git
```

### 3.2 安装依赖
```
npm run setup / npm run setup:cnpm
```

### 3.3 新增 package 后链接各个包
```
lerna link
```

### 3.4 在各个包中安装自己的依赖
```
lerna exec -- npm i
```

## 4. 项目发布
发布前可以先使用以下命令进行可用性测试：
```
npm run available
```

### 4.1 lerna version 方式
```
lerna version

npm config set registry https://registry.npmjs.org/

cd packages/<packageName>/

npm login

npm publish --access=public

cd ../../

npm run release

git push --follow-tags origin main
```

或

```
npm run lerna-version

npm config set registry https://registry.npmjs.org/

cd packages/<packageName>/

npm login

npm publish --access=public

cd ../../

npm run release

git push --follow-tags origin main
```

### 4.2 lerna publish 方式
```
lerna publish

npm run release

git push --follow-tags origin main
```

或

```
npm run lerna-publish

npm run release

git push --follow-tags origin main
```
