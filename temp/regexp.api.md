## API Report File for "@lgd-utils/regexp"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

// @public (undocumented)
const _default: {
    nodeModuleMultiPath: typeof nodeModuleMultiPath;
    nodeModulePath: typeof nodeModulePath;
    nodeModuleScopeMultiPath: typeof nodeModuleScopeMultiPath;
    nodeModuleScopePath: typeof nodeModuleScopePath;
    test: typeof test_2;
};
export default _default;

// @public (undocumented)
export function nodeModuleMultiPath(packageNames: string | string[], suffix?: number | string): RegExp;

// @public (undocumented)
export function nodeModulePath(packageName: string, suffix?: number | string): RegExp;

// @public (undocumented)
export function nodeModuleScopeMultiPath(scope: string, packageNames: string | string[], suffix?: number | string): RegExp;

// @public (undocumented)
export function nodeModuleScopePath(scope: string, packageName: string, suffix?: number | string): RegExp;

// @public (undocumented)
function test_2(regexp?: RegExp | unknown, value?: number | string | unknown): boolean;
export { test_2 as test }

```
