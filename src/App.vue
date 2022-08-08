<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  import dd from './api/dd.js'

  //调试
  import store from './store/index.js'

  export default {
    provide () {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isRouterAlive: true
      }
    },
    created(){
      store.dispatch('getUserInfo',{code:"res.code"});

      //获取用户信息
      // dd.getUserInfo();
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    }

  }
</script>
