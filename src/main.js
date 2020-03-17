import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'

Vue.use(ElementUI);
Vue.prototype.qiniu = "http://img.gxk8090.com";		//七牛云图片前缀
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
