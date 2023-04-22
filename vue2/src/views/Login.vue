<template>
  <div class="about">
    <input type="text"
           v-model="username"
           placeholder="请输入用户名">
    <button @click="changeBtn">进入聊天室</button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    const username = localStorage.getItem('username')
    if (username)
    {
      this.$router.push('/home')
    }
  },
  methods: {
    changeBtn () {
      if (this.username.trim().length < 6)
      {
        alert('用户名不能小于6位')
        return
      }
      localStorage.setItem('username', this.username)
      this.$router.push('/home')
    }
  }
}
</script>

