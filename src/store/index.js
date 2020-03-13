import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import { Message } from 'element-ui';
import resource from '../api/resource.js'
import router from '../router/index.js'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {  
    //默认选中导航
    activeIndex:"/store_list",
    //导航及权限
    userInfo:{},
    menuList:[],
    //店铺列表
    storeList:[]
  },
  mutations: {
    // 导航及权限
    GET_MENU (state, obj) {  // store中的数据只能通过commit mutation来改变
      state.userInfo = obj.info;
      state.menuList = obj.menu;
    },
    //切换导航
    CHANGE_MENU(state,index){
      state.activeIndex = index;
    },
    //获取店铺列表
    GET_STORE_LIST_AJAX(state,data){
      state.storeList = data;
    }
  },
  actions: {
    // 获取导航及权限
    getMenu (context) {
      resource.getMenu().then(res => {
       if(res.data.code == 1){
         context.commit('GET_MENU', res.data.data);
         router.push('/store_list');
       }else{
         Message.warning(res.data.msg);
       }
     })
    },
    //切换导航
    changeMenu(context,index){
      context.commit('CHANGE_MENU', index);
    },
    //获取店铺列表
    getStoreListAjax(context){
      resource.getStoreListAjax().then(res => {
       if(res.data.code == 1){
         context.commit('GET_STORE_LIST_AJAX', res.data.data);
       }else{
         Message.warning(res.data.msg);
       }
     })
    }
    



  }

})
export default store;

