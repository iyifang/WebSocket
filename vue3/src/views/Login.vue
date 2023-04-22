<template>
  <div class="about">
    <input type="text"
           v-model="username"
           placeholder="请输入用户名">
    <button @click="login">登录</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
let username = ref('')
const router = useRouter()

if (localStorage.getItem('username'))
{
  router.push('/home')
}

function login () {
  console.log(username.value);
  if (username.value.trim().length < 6)
  {
    alert('用户名不能小于6位')
    return
  }
  localStorage.setItem('username', username.value)
  router.push('/home')
}
</script>
