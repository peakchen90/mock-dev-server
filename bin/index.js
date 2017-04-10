#! /usr/bin/env node
const argv = require('yargs')
  .option('m', {
    alias: 'mock',
    describe: '设置mock数据目录',
    default: 'mock',
    type: 'string'
  })
  .option('w', {
    alias: 'watch',
    describe: '是否监听mock目录文件',
    boolean: true,
  })
  .option('p', {
    alias: 'port',
    default: 3000,
    describe: 'Mock Server 端口号',
    type: 'number'
  })
  .option('b', {
    alias: 'base',
    default: '/',
    describe: '路由根目录(必须以 / 开始)',
    type: 'string'
  })
  .option('v', {
    alias: 'version',
    describe: '查看当前版本号'
  })
  .usage('Usage: mock-server [options]')
  .example('mock-server -m mock --port 3000 -w -b /api')
  .help('h')
  .alias('h', 'help')
  .argv

const fs = require('fs')
const path = require('path')
const mockServer = require('../index')
const deleteComments = require('../src/util').deleteComments
const { mock, watch, port, base, version } = argv

if (version) {
  fs.readFile(path.resolve(__dirname, '..', 'package.json'), 'utf8', (err, data) => {
    data = deleteComments(data);
    let v
    try {
      v = 'v' + JSON.parse(data).version
    } catch (e) {
      v = 'Get version failed'
    }
    console.log(v)
  })
  return
}

mockServer({
  mock,
  watch,
  port,
  base
})
