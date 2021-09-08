// @ts-check
import _ from 'lodash'
import fs from 'fs-extra'
import json from '@rollup/plugin-json'
import path from 'path'
import replace from '@rollup/plugin-replace'
import ts from 'rollup-plugin-typescript2'

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.')
}

const masterVersion = require('./package.json').version
const packagesDir = path.resolve(__dirname, 'packages')
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = (p) => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const pkgBuildOptions = pkg.buildOptions || {}
const name = pkgBuildOptions.filename || path.basename(packageDir)
const isCjsBuildReg = /^cjs/
const isEsmBuildReg = /^esm/
const isGlobalBuildReg = /^global/

// ensure TS checks only once for each build
let hasTSChecked = false

const outputConfigs = {
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`,
  },
  esm: {
    file: resolve(`dist/${name}.esm.js`),
    format: `es`,
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: `iife`,
  },
}

const defaultFormats = Object.keys(outputConfigs)
const inlineFormats = process.env.FORMATS && process.env.FORMATS.split(',')
const packageFormats = inlineFormats || pkgBuildOptions.formats || defaultFormats
const packageConfigs = process.env.PROD_ONLY
  ? []
  : packageFormats.map((format) => createConfig(format, outputConfigs[format]))

if (process.env.NODE_ENV === 'production') {
  packageFormats.forEach((format) => {
    if (pkgBuildOptions.prod === false) {
      return
    }
    if (isCjsBuildReg.test(format)) {
      packageConfigs.push(createProductionConfig(format))
    }
    if (isEsmBuildReg.test(format) || isGlobalBuildReg.test(format)) {
      packageConfigs.push(createMinifiedConfig(format))
    }
  })
}

export default packageConfigs

function getProp4PkgBuildOptions(prop, format, defaultV) {
  return _.get(pkgBuildOptions, `_${format}.${prop}`, _.get(pkgBuildOptions, `${prop}`, defaultV))
}

function createConfig(format, output, plugins = []) {
  if (!output) {
    // @ts-ignore
    console.log(require('chalk').yellow(`invalid format: "${format}"`))
    process.exit(1)
  }

  output.exports = getProp4PkgBuildOptions('output.exports', format, 'named')
  output.sourcemap = getProp4PkgBuildOptions('output.sourcemap', format, !!process.env.SOURCE_MAP)
  output.externalLiveBindings = getProp4PkgBuildOptions('output.externalLiveBindings', format, false)

  if (isGlobalBuildReg.test(format)) {
    output.name = getProp4PkgBuildOptions('output.name', format)
  }

  const shouldEmitDeclarations = pkg.types && process.env.TYPES != null && !hasTSChecked

  const tsPlugin = ts({
    check: process.env.NODE_ENV === 'production' && !hasTSChecked,
    tsconfig: fs.existsSync(resolve('tsconfig.json'))
      ? resolve('tsconfig.json')
      : path.resolve(__dirname, 'tsconfig.json'),
    cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: output.sourcemap,
        declaration: shouldEmitDeclarations,
        declarationMap: shouldEmitDeclarations,
        // emitDeclarationOnly: shouldEmitDeclarations,
      },
      exclude: ['**/__tests__', 'test-dts'],
      ...getProp4PkgBuildOptions('rollupPluginTypescript2.tsconfigOverride', format, {}),
    },
  })
  // we only need to check TS and generate declarations once for each build.
  // it also seems to run into weird issues when checking multiple times
  // during a single build.
  hasTSChecked = true

  const entryFile = getProp4PkgBuildOptions('input', format, `src/index.ts`)

  let external = []
  const pkgBuildOptionsExternal = getProp4PkgBuildOptions('external', format)

  if (isGlobalBuildReg.test(format)) {
    external = ['source-map', '@babel/parser', 'estree-walker'].concat(
      Array.isArray(pkgBuildOptionsExternal) ? pkgBuildOptionsExternal : [],
    )
  } else {
    // Node / esm builds.
    // externalize all deps unless it's the compat build.
    external = Array.isArray(pkgBuildOptionsExternal)
      ? pkgBuildOptionsExternal
      : [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]
  }

  output.globals = getProp4PkgBuildOptions('output.globals', format, {})

  return {
    // Global and Browser ESM builds inlines everything so that they can be used alone.
    external,
    input: resolve(entryFile),
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    },
    output,
    plugins: [
      json({
        namedExports: false,
      }),
      tsPlugin,
      createReplacePlugin(format, output),
      // @ts-ignore
      isEsmBuildReg.test(format) && require('rollup-plugin-polyfill-node')(),
      !isCjsBuildReg.test(format) && require('@rollup/plugin-node-resolve').default(),
      !isCjsBuildReg.test(format) &&
        // @ts-ignore
        require('@rollup/plugin-commonjs')({
          sourceMap: false,
        }),
      // !isEsmBuildReg.test(format) && require('@rollup/plugin-babel').default({ babelHelpers: 'bundled' }),
      !isEsmBuildReg.test(format) &&
        require('@rollup/plugin-babel').getBabelOutputPlugin({
          allowAllFormats: true,
          configFile: path.resolve(__dirname, 'babel.config.json'),
        }),
      ...plugins,
    ].filter(Boolean),
    treeshake: {
      moduleSideEffects: getProp4PkgBuildOptions('treeshake.moduleSideEffects', format, true),
    },
  }
}

function createReplacePlugin(format, output) {
  const replacements = {
    __COMMIT__: `"${process.env.COMMIT}"`,
    __DEV__: !(process.env.__DEV__ === 'false' || /\.prod\.js$/.test(output.file)),
    __ESM__: isEsmBuildReg.test(format),
    __GLOBAL__: isGlobalBuildReg.test(format),
    // is targeting Node (SSR)?
    __NODE_JS__: isCjsBuildReg.test(format),
    // this is only used during Vue's internal tests
    __TEST__: false,
    __VERSION__: `"${masterVersion === '' ? pkg.version : masterVersion}"`,
  }
  // allow inline overrides like
  //__RUNTIME_COMPILE__=true yarn build runtime-core
  Object.keys(replacements).forEach((key) => {
    if (key in process.env) {
      replacements[key] = process.env[key]
    }
  })
  return replace({
    // @ts-ignore
    values: replacements,
    preventAssignment: true,
  })
}

function createProductionConfig(format) {
  return createConfig(format, {
    file: resolve(`dist/${name}.${format}.prod.js`),
    format: outputConfigs[format].format,
  })
}

function createMinifiedConfig(format) {
  const { terser } = require('rollup-plugin-terser')
  return createConfig(
    format,
    {
      file: outputConfigs[format].file.replace(/\.js$/, '.prod.js'),
      format: outputConfigs[format].format,
    },
    [
      terser({
        module: isEsmBuildReg.test(format),
        compress: {
          ecma: 2015,
          pure_getters: true,
        },
        safari10: true,
      }),
    ],
  )
}
