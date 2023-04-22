<template>
  <div class="home">
    <ul>
      <li v-for="item in msgList"
          :key="item.id">
        <p>
          <span>姓名: {{item.username}}</span>
          <span>时间:{{new Date(item.dataTime)}}</span>
        </p>
        <p>消息: {{item.msg}}</p>
      </li>
    </ul>
    <input type="text"
           v-model="msg"
           placeholder="请输入消息">
    <button @click="sending">发送</button>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { WebScoket } from '../hooks/index'
const router = useRouter()

let msg = ref('')
let msgList = reactive([])

const username = localStorage.getItem('username')
if (!username)
{
  router.push('/login')
}

const sending = () => {
  if (msg.value.trim().length > 0)
  {
    ws.send(JSON.stringify({
      username: username,
      dataTime: new Date().getTime(),
      msg: msg.value
    }))
    msg.value = ''
  }
}
const ws = WebScoket(handleMessage)
function handleMessage (msg) {
  console.log(msg);
  msgList.push(JSON.parse(msg.data))
}

</script>
