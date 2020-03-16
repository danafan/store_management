import * as dd from 'dingtalk-jsapi';
import store from '../store/index.js'
export default{
	//获取code和用户信息
	getUserInfo(){
		dd.ready(() => {
			dd.runtime.permission.requestAuthCode({
				corpId: "ding7828fff434921f5b",
				onSuccess: res =>{
            		//获取钉钉用户信息
            		store.dispatch('getUserInfo',{code:res.code});
            	},
            	onFail : err => {
            		alert('dd error: ' + JSON.stringify(err));
            	}

            });
		});
	},
	//配置钉钉config
	settingDd(data){
		dd.config({
			agentId:data.agentId,
			corpId: data.corpId,
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			signature: data.signature,
			jsApiList: [
			'biz.contact.choose'
			]
		});
	},
	

}