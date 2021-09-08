/*
 * @Author: shiconghua
 * @Alias: LGD.HuaFEEng
 * @Date: 2021-09-02 00:18:59
 * @LastEditTime: 2021-09-05 20:06:13
 * @LastEditors: shiconghua
 * @Description: cz-customizable 配置文件
 * @FilePath: \lgd-utils\.cz-config.js
 */

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
