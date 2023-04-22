// 立即执行函数
; ((doc, Socket, storage, location) => {
  // 获取dom
  const oList = doc.querySelector('#list')
  const oMessage = doc.querySelector('#message')
  const oSending = doc.querySelector('#sending')
  const ws = new Socket('ws:localhost:8000') // 创建连接new Scoket('ws'[协议]:localhost:8000[后端开启ws服务端口号],)

  // 声明用户信息变量
  let username = ''

  // 初始化
  const init = () => {
    bindEvent()
  }

  // 绑定事件
  function bindEvent () {
    oSending.addEventListener('click', onSendingClick, false)
    // 绑定ws事件
    ws.addEventListener('open', handleOpen, false) // 开启
    ws.addEventListener('close', handleClose, false) // 关闭
    ws.addEventListener('error', handleError, false) // 错误信息
    ws.addEventListener('message', handleMessage, false) // 接收信息
  }


  function onSendingClick () {
    console.log('Send message');
    const msg = oMessage.value
    if (!msg.trim().length)
    {
      return
    }

    // Web Socket 已连接上，使用 send() 方法发送数据,文本形式必须传递json格式
    ws.send(JSON.stringify({
      user: username,
      dateTime: new Date().getTime(),
      message: msg
    }))

    oMessage.value = ''
  }

  // 定义ws方法
  function handleOpen (e) {
    console.log('Websocket open', e);

    // 获取用户信息
    username = storage.getItem('username')
    // 如果没有则跳转回登录
    if (!username)
    {
      location.href = 'entry.html'
    }
  }

  function handleClose (e) {
    console.log('Websocket close', e);
  }

  function handleError (e) {
    console.log('Websocket error', e);
  }

  function handleMessage (e) {
    console.log('Websocket message');
    // e事件对象,可以接收广播对象的数据,在data里
    console.log(e);
    const msgData = JSON.parse(e.data)
    oList.appendChild(createMsg(msgData))
  }

  function createMsg(data){
    const {user,dateTime,message} = data
    const oItem = doc.createElement('li')
    oItem.innerHTML = `
      <p>
        <span>${user}</span>
        <i>${dateTime}</i>
      </p>
      <p>${message}</p>
    `
    return oItem
  }

  init()
})(document, WebSocket, localStorage, location)