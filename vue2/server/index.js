// 1.1 修改package.json，用nodemon监控index.js文件
/* "scripts": {
  "dev": "nodemon index.js"
}, */

// 1.2 引入ws
const ws = require('ws')
  ; (() => {
    // 1.3 建立服务，实例化ws.Server({port:8000})
    const server = new ws.Server({ port: 8000 })

    // 1.4 初始化函数
    const init = () => {
      bindEvent()
    }

    // 1.5 绑定函数
    function bindEvent () {
      server.on('open', handleOpen)
      server.on('close', handleClose)
      server.on('error', handleError)
      server.on('connection', handleConnection)
    }

    // 1.6定义函数
    function handleOpen () {
      console.log('WebSocket open');
    }
    function handleClose () {
      console.log('WebSocket close');
    }
    function handleError () {
      console.log('WebSocket error');
    }

    function handleConnection (ws) {
      // 1.7 注意message函数是通过connection处理函数的参数来绑定的
      console.log('WebSocket connection');
      ws.on('message', handleMessage)
    }

    // 接收前端发送过来的数据,需要toString
    function handleMessage (msg) {
      console.log(msg.toString());
      // clients就是客户端的意思,保存了所有连接到这个server上的客户端
      server.clients.forEach((c) => {
        // 把当前收到的信息广播出去
        c.send(msg.toString())
      })
    }

    // 1.8 调用初始化
    init()

    // 1.9 运行npm run dev 开启后端服务
  })()