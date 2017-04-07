const express = require('express')
const router = express.Router()
const Mock = require('mockjs')
const init = require('./init')

class Router {
  /**
   * 创建并返回路由
   * @param {array} routes
   */
  create(routes) {
    routes.forEach(route => {
      router.all(route.path, (req, res) => {
        let data = Mock.mock(route.data)
        res.json(data)
      })
    })
    router.all('*', (req, res) => {
      res.sendStatus(404)
    })
    return router
  }

  /**
   * 开始监听
   * @param {array} newRoutes
   */
  startWatch(routes) {
    this.routes = routes
    router.all('*', (req, res) => {
      let url = req.originalUrl
      for (let i = 0; i < this.routes.length; i++) {
        if (this.routes[i].path === url) {
          let data = Mock.mock(this.routes[i].data)
          res.json(data)
          return
        }
      }
      res.sendStatus(404)
    })
    return router
  }
  /**
   * 更新路由
   * @param {array} routes
   */
  updateRoutes(routes) {
    this.routes = routes
  }
}

module.exports = Router
