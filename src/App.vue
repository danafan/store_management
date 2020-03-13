<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
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
      //获取首页信息
      this.$store.dispatch('getMenu');
      //获取店铺列表
      this.$store.dispatch('getStoreListAjax');
      //获取部门列表
      this.$store.dispatch('getDepartmentListAjax');
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
