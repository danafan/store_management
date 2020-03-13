import Vue from 'vue'
import Router from 'vue-router'
    
const prompt = resolve=>require(['@/pages/prompt'],resolve)             //无权限页面
const home = resolve=>require(['@/pages/home'],resolve)                 //首页导航
const store_list = resolve=>require(['@/pages/store_list'],resolve) //店铺列表
const account_list = resolve=>require(['@/pages/account_list'],resolve) //账号列表
const change_record = resolve=>require(['@/pages/change_record'],resolve) //变更记录
const management_list = resolve=>require(['@/pages/management_list'],resolve) //管理列表


Vue.use(Router)

const router = new Router({
  routes: [
  {
    path: '/prompt',
    component: prompt,
  },
  {
    path: '/home',
    component: home,
    children:[
    { path: '/store_list',name:"店铺列表", component: store_list},
    { path: '/account_list',name:"账号列表", component: account_list},
    { path: '/change_record',name:"变更记录", component: change_record},
    { path: '/management_list',name:"管理列表", component: management_list}
    ]
  }
  ]
})
// 路由跳转前的钩子
router.beforeEach(function (to, from, next) {
  let path = to.fullPath;
  sessionStorage.setItem("tab",path);
  next()
})
export default router;