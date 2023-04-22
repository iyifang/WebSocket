// 引入ws
const Ws = require('ws')
;(() => {
  // 建立服务,实例化ws.Server({port: 8000[端口号]})
  const server = new Ws.Server({ port: 8000 })

  // 初始化
  const init = () => {
    bindEvent()
  }

  // 绑定函数
  function bindEvent () {
    server.on('open', handleOpen)
    server.on('close', handleClose)
    server.on('error', handleError)
    server.on('connection', handleConnection)
  }

  function handleOpen () {
    console.log('Websocket open');
  }

  function handleClose () {
    console.log('Websocket close');

  }

  function handleError () {
    console.log('Websocket error');

  }

  // 注意: message函数是通过connection处理函数的参数来绑定的
  function handleConnection (ws) {
    console.log('Websocket connected');
    ws.on('message', handleMessage)
  }

  function handleMessage (msg) {
    // 前端发送过来的message信息
    console.log(msg.toString());
    // clients就是客户端的意思,保存了所有连接到这个server上的客户端
    server.clients.forEach((c)=>{
      // 把当前收到的信息广播出去
      c.send(msg.toString())
    })
  }
  init()
})()