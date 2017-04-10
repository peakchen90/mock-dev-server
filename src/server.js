const express = require('express')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const app = express()
const Router = require('./router')
const chalk = require('chalk')

class Server {
  constructor(port) {
    this.app = app
    this.port = port
    this.router = new Router()
    // 请求日志
    this.app.use(morgan('dev'))
  }

  /**
   * 启动服务器
   * @param {array} routes
   */
  start(routes) {
    let router = this.router.create(routes)
    this.app.use(router)
    this.app.listen(this.port, () => {
      console.log(chalk.magenta('Mock Server is starting...'))
      console.log(chalk.green('listen on: ' + chalk.cyan('http://localhost:' + this.port)), '\n')
    })
  }

  /**
   * 启动监听服务器
   * @param {array} routes
   */
  watch(routes) {
    let router = this.router.startWatch(routes)
    this.app.use(router)
    this.app.listen(this.port, () => {
      console.log(chalk.magenta('Mock Server is watching...'))
      console.log(chalk.green('listen on: ' + chalk.cyan('http://localhost:' + this.port)), '\n')
    })
  }
  /**
   * 更新路由
   * @param {array} routes
   */
  update(routes, path) {
    this.router.updateRoutes(routes)
    console.log(chalk.yellow('File changed: ' + chalk.grey(path)), '\n')
  }
}

module.exports = Server



