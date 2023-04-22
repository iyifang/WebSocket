import { WS_ADDRESS } from '../config/index'

function useWebSocket (handleMessage) {
  // 实例化
  const ws = new WebSocket(WS_ADDRESS)

  // 初始化
  const init = () => {
    bindEvent()
  }

  // 绑定事件函数, open/close/error/message
  function bindEvent () {
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false) // 传入message函数
  }

  function handleOpen (e) {
    console.log('WebSocket open', e);
  }
  function handleClose (e) {
    console.log('WebSocket close', e);
  }
  function handleError (e) {
    console.log('WebSocket error', e);
  }

  init()
  return ws
}

export default useWebSocket