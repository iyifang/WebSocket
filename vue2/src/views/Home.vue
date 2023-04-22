<template>
  <div class="home">
    <ul>
      <li v-for="item in msgList"
          :key="item.id">
        <span>姓名：{{item.username}}</span>
        <span>时间：{{new Date(item.dataTime)}}</span>
        <p>消息：{{item.message}}</p>
      </li>
    </ul>

    <input type="text"
           v-model="msg"
           placeholder="请输入内容">
    <button @click="sending">发送</button>
  </div>
</template>

<script>
// 1.1 实例化WebSocket连接后端
const ws = new WebSocket('ws:localhost:8000') // 后端 端口
export default {
  name: 'Home',
  data () {
    return {
      username: '',
      msg: '',
      msgList: []
    }
  },
  created () {
    // 1.2 获取用户信息，判断进入权限
    const username = localStorage.getItem('username')
    this.username = username
    if (!username)
    {
      this.$router.push('/')
    }
  },
  mounted () {
    // 1.3 初始化WebSocket连接方法
    ws.addEventListener('open', this.openWebSocket, false)
    ws.addEventListener('close', this.closeWebSocket, false)
    ws.addEventListener('error', this.errorWebSocket, false)
    ws.addEventListener('message', this.messageWebSocket, false)
  },
  methods: {
    // 发送按钮
    sending () {
      // 1.5 Web Socket 已连接上，使用 send() 方法发送数据,文本形式必须传递json格式
      ws.send(JSON.stringify({
        username: this.username,
        dataTime: new Date().getTime(),
        message: this.msg
      }))
      this.msg = ''
    },

    // 1.4 定义WebSocket方法
    openWebSocket () {
      console.log('open WebSocket');
    },
    closeWebSocket () {
      console.log('close WebSocket');
    },
    errorWebSocket () {
      console.log('error WebSocket');
    },
    messageWebSocket (e) {
      console.log('message WebSocket');
      console.log(e);
      this.msgList.push(JSON.parse(e.data))
    }
  }
}
</script>
