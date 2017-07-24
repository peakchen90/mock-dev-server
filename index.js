const path = require('path')
const Server = require('./src/server')
const initMock = require('./src/init')

/**
 * mock服务
 * @param {object} param0 配置
 * @param {object|function} common 返回通用数据
 */
function MockServer({
  mock = 'mock',
  watch = false,
  port = 3000,
  base = '/'
}, common) {
  const server = new Server(port)

  // common data
  let commonData
  if (common && typeof common === 'function') {
    commonData = common()
  } else if (common && Object.prototype.toString.call(common) === '[object Object]') {
    commonData = common
  } else {
    commonData = {}
  }

  if (watch) {
    let chokidar = require('chokidar')
    let watcher = chokidar.watch(mock)
    server.watch(initMock(mock, base, commonData))
    watcher.on('change', (_path) => {
      if (/\.json$/i.test(_path)) {
        server.updateStart = Date.now()
        setTimeout(() => {
          server.update(initMock(mock, base, commonData), path.resolve(_path))
        }, 0)
      }
    })
  } else {
    server.start(initMock(mock, base, commonData))
  }
}

module.exports = MockServer
