[![npm](https://img.shields.io/npm/v/mock-dev-server.svg)](https://www.npmjs.com/package/mock-dev-server)
[![npm](https://img.shields.io/npm/dt/mock-dev-server.svg)](https://www.npmjs.com/package/mock-dev-server)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/peakchen90/mock-dev-server/blob/master/LICENSE)

# mock-dev-server
一个简易的Mock服务器

## 安装

```bash
# 全局安装，方便使用 mock-dev-server 命令
npm install -g mock-dev-server

# 局部安装
npm install --save-dev mock-dev-server
```

## 如何使用
  1. 在项目根目录建一个 `mock` 文件夹
  2. 在 `mock` 文件夹里新建 `*.json` 文件，在 json 文件里面编辑 mock 数据（[示例](#mock.json)）
  3. 路由说明：请求的url是根据 `mock` 文件夹下的层次结构来生成的（就是 json 文件相对于 `mock` 文件夹的路径，并去掉 `.json` 扩展名），如下示项目结构示例将会生成以下路由：
  ```
    /a
    /sub/b
    /sub/c

    // 如果设置的基本路径， 将会在路由最前面加上基本路径，如 `mock-dev-server -b /api`，将会生成以下路由：

    /api/a
    /api/sub/b
    /api/sub/c
  ```

  4. 配置 Mock 数据的 json 文件说明：API与 [Mockjs官网api](http://mockjs.com)一致，使用 `Mock.mock()` 方法返回随机数据
  5. 运行命令 `mock-dev-server` ，即可在 http://localhost:3000/* 请求到api，支持所有的请求类型，如果要动态改变 `mock` 数据，则需要在命令行添加 `-w` 参数

> 通过node脚本启动示例
```js
const mockServer = require('mock-dev-server')
mockServer({
  mock = 'mock',
  watch = false,
  port = 3000,
  base = '/'
}, {
  status: 200,
  text: 'success'
})

// mockServer({
//   port = 3000
// }, function() {
//   return {
//     status: 200
//   }
// })
```

**（v1.0.0新增）**`mockServer`方法的第一个参数是一个对象，与命令行参数类似，第二个参数（可选）表示通用数据，可以是一个对象或一个函数（返回一个对象），所有的请求都会返回这些通用数据

## 示例
  1. 目录结构

  ```
  ├── ...
  ├── mock
  │   ├── a.json
  │   └── sub
  │       ├── b.json
  │       └── c.json
  ├── node_modules
  ├── index.js
  └── package.json
  ```
  2. <a name="mock.json">`a.json` 示例</a>

  ```json
  {
    "id|+1": 1,
    "name": "@cname",
    "description": "@cparagraph",
    "age|20-50": 20,
    "email": "@email",
    "birthday": "@datetime('yyyy-MM-dd')"
  }
  ```

  用 [postman](https://www.getpostman.com/) 请求 `http://localhost:3000/a` ，得到如下响应数据：

  ```json
  {
    "id": 1,
    "name": "熊强",
    "description": "值月利反十历金细问此活场件收。即何林口属院例直起同政候文管研至龙。治整支料去林用铁严面即总要小。",
    "age": 32,
    "email": "x.bbfnlx@jivoslqz.pro",
    "birthday": "2003-07-05"
  }
  ```

  3. 运行命令
  ```bash
  # 启动 mock server
  mock-dev-server

  # 监听 /mock/**/*.json 文件
  mock-dev-server -w

  # 配置 mock 数据目录（下面的示例将会在读取根目录下的 data 文件夹）
  mock-dev-server -m data

  # 配置端口号（默认：3000）
  mock-dev-server -p 3000

  # 配置请求的基本路径，必须以 / 开始，如 /api
  # 如下配置请求url就变成了 http://localhost:3000/api/a
  mock-dev-server -b /api
  ```

## 命令行参数
```
Usage: mock-dev-server [options]

Options:
  -m, --mock   设置mock数据目录                       [string] [default: "mock"]
  -w, --watch  是否监听mock目录文件                                    [boolean]
  -p, --port   Mock Server 端口号                       [number] [default: 3000]
  -b, --base   路由根目录(必须以 / 开始)                 [string] [default: "/"]
  -h, --help   Show help                                               [boolean]

Examples:
  mock-dev-server -m mock --port 3000 -w -b /api
```
