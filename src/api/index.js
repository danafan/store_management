import axios from 'axios'
import router from '../router/index.js'
const baseURL = `${location.origin}/api/`;
// 创建axios实例，可以自定义配置
const instance = axios.create({
  baseURL,
});

instance.interceptors.response.use(response => {
  switch (response.data.code) {
    case 1000:
    router.replace("/prompt");
  }
  return response;
},function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 404:
      window.alert('参数错误');
      break;
      case 500:
      window.alert('服务器故障');
      break;
      case 504:
      window.alert('没有网络');
      break;
    }
  }
});

export default instance;