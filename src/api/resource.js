import http from './request.js'
let path = {	
	getMenu:"getmenu",									//获取导航菜单以及用户信息
	getStoreListAjax:"index/ajaxstore",					//获取店铺列表（查询条件）
	createStore:"index/add",							//创建店铺
	getStoreList:"index/storeList",						//获取店铺列表（结果列表）
	

}				
export default{
	//获取导航菜单以及用户信息
	getMenu(params){
		return http.post(path.getMenu, params)
	},
	//获取店铺列表（查询条件）
	getStoreListAjax(params){
		return http.get(path.getStoreListAjax, params)
	},
	//创建店铺
	createStore(params){
		return http.post(path.createStore, params)
	},
	//获取店铺列表（结果列表）
	getStoreList(params){
		return http.get(path.getStoreList, params)
	},
	
}









