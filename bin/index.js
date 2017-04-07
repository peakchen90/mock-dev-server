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
  .usage('Usage: mock-server [options]')
  .example('mock-server -m mock --port 3000 -w -b /api')
  .help('h')
  .alias('h', 'help')
  .argv

const { mock, watch, port, base } = argv
const mockServer = require('../index')

mockServer({
  mock,
  watch,
  port,
  base
})

// const Server = require('../src/server')
// const initMock = require('../src/init')
// const server = new Server(port)

// if (watch) {
//   let chokidar = require('chokidar')
//   let watcher = chokidar.watch(mock)
//   server.watch(initMock(mock, base))
//   watcher.on('change', (path) => {
//     if (/\.json$/i.test(path)) {
//       server.update(initMock(mock, base), path)
//     }
//   })
// } else {
//   server.start(initMock(mock, base))
// }

