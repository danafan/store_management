import axios from './index'

export default {
  post(path, params={}){
    
    let user_id = sessionStorage.getItem("user_id");
    var target = {
      user_id:user_id
    };

    // var target = {
    //   user_id:"8318"
    // };

    Object.assign(params, target);
    let form = new FormData();
    let arr = [];
    let str = '';
    for(let a of Object.keys(params)){ 
      arr.push(a);
    }
    let arrSort = arr.sort(); //参数按照键名排序
    for(let b of arrSort){
      let val = params[b];
      str += `${b}=${val}`;
      form.append(b, val);
    }
    return axios.post(`${path}`, form);
  },
  get(path, params={}){
    
    let user_id = sessionStorage.getItem("user_id");
    var target = {
      user_id:user_id
    };
    

    // var target = {
    //   user_id:"8318"
    // };
    
    Object.assign(params, target);
    let arr = [];
    let str = '';
    for(let a of Object.keys(params)){
      arr.push(a);
    }
    let arrSort = arr.sort();
    for(let b of arrSort){
      let val = params[b];
      str += `${b}=${val}&`;
    }
    if(!!str){
      return axios.get(`${path}?${str}`);
    }else{
      return axios.get(`${path}`);
    }
    
  }
}