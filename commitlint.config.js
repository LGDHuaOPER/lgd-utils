/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-01 23:25:59
 * @LastEditTime: 2021-09-09 23:41:53
 * @LastEditors: shiconghua
 * @Description: commitlint 配置文件
 * @FilePath: \lgd-utils\commitlint.config.js
 */

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
