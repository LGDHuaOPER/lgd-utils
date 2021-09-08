/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-06 20:32:35
 * @LastEditTime: 2021-09-06 20:41:38
 * @LastEditors: shiconghua
 * @Description: file content
 * @FilePath: \lgd-utils\scripts\dev.js
 */
/*
Run Rollup in watch mode for development.

To specific the package to watch, simply pass its name and the desired build
formats to watch (defaults to "global"):

```
# name supports fuzzy match. will watch all packages with name containing "dom"
yarn dev dom

# specify the format to output
yarn dev core --formats cjs

# Can also drop all __DEV__ blocks with:
__DEV__=false yarn dev
```
*/

const chalk = require('chalk')
const execa = require('execa')

const { fuzzyMatchTarget } = require('./utils')
const args = require('minimist')(process.argv.slice(2))

const target = args._.length ? fuzzyMatchTarget(args._)[0] : null
const formats = args.formats || args.f
const sourceMap = args.sourcemap || args.s
const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7)

if (target == null) {
  console.log(chalk.bold(chalk.yellow(`Rolling up type definitions for ${target}...`)))
  console.log(chalk.bold(chalk.yellow(`The target can not be empty`)))
  console.log(chalk.bold(chalk.yellow(`Please exec dev script by 'npm run/yarn dev -- <packageName>'`)))
  process.exit(1)
}

execa(
  'rollup',
  [
    '-wc',
    '--environment',
    [
      `COMMIT:${commit}`,
      `TARGET:${target}`,
      `FORMATS:${formats || 'global'}`,
      sourceMap ? `SOURCE_MAP:true` : ``
    ]
      .filter(Boolean)
      .join(',')
  ],
  {
    stdio: 'inherit'
  }
)
