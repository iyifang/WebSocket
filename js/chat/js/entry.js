// 立即执行函数
;((doc, store, location) => {
  // 获取dom
  const oUsername = doc.querySelector('#username')
  const oEnterBtn = doc.querySelector('#enter')

  // 初始化
  const init = () => {
    bindEvent()
  }

  // 绑定点击事件
  function bindEvent () {
    oEnterBtn.addEventListener('click', onEnterBtnClick, false)
  }

  // 点击事件
  function onEnterBtnClick () {
    const username = oUsername.value.trim()
    if (username.length < 6)
    {
      alert('用户名不能小于6位')
      return
    }

    // 存入浏览器缓存
    store.setItem('username', username)
    // 跳转到index页面
    location.href = 'index.html'
  }

  init()

})(document, localStorage, location)