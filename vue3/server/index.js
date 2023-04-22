// 引入ws
const ws = require('ws')

  ; (() => {
    // 建立服务,实例化ws.Server({port:8000})
    const server = new ws.Server({ port: 8000 })

    // 初始化绑定函数
    const init = () => {
      bindeEvent()
    }

    // 定义初始化函数
    function bindeEvent () {
      server.on('open', handleOpen)
      server.on('close', handleClose)
      server.on('error', handleError)
      server.on('connection', handleConnection)
    }

    function handleOpen () {
    }
    function handleClose () {
    }
    function handleError () {
    }
    function handleConnection (ws) {
      ws.on('message', handleMessage)
    }

    function handleMessage (msg) {
      console.log(msg.toString());
      // 使用server.clients遍历所有的客户端,把所有连接了这个server上的客户端进行广播数据
      server.clients.forEach(c => {
        c.send(msg.toString())
      })
    }

    init()
  })()
