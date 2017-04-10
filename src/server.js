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
    // 保存监听更新开始时间
    this.updateStart = Date.now()
  }

  /**
   * 启动服务器
   * @param {array} routes
   */
  start(routes) {
    let router = this.router.create(routes)
    this.app.use(router)
    this.app.listen(this.port, () => {
      console.log(chalk.bgCyan.black(' START ') + chalk.cyan(' Mock Server start'))
      console.log(chalk.green('listen on: ' + chalk.magenta('http://localhost:' + this.port)), '\n')
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
      console.log(chalk.bgCyan.black(' WATCH ') + chalk.cyan(' Mock Server watch'))
      console.log(chalk.green('listen on: ' + chalk.magenta('http://localhost:' + this.port)), '\n')
    })
  }
  /**
   * 更新路由
   * @param {array} routes
   */
  update(routes, path) {
    let ms = Date.now() - this.updateStart
    this.router.updateRoutes(routes)
    console.log(chalk.bgGreen.black(' DONE ') + chalk.green(' Mock server update in: ' + ms + 'ms'), '\n')
  }
}

module.exports = Server



