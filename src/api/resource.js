import http from './request.js'
let path = {	
	getMenu:"getmenu",									//获取导航菜单以及用户信息
	getStoreListAjax:"index/ajaxstore",					//获取店铺列表（查询条件）
	createStore:"index/add",							//创建店铺
	getStoreList:"index/storeList",						//获取店铺列表（结果列表）
	getDepartmentList:"index/ajaxdept",					//获取部门列表
	getAccountList:"account/index",						//获取账号列表
	createAccount:"account/add",						//创建账号
	editAccount:"account/edit",							//修改账号（获取和修改）
	startOrStop:"account/startstop",					//账号启停用
	changeRecord:"log/index",							//变动记录列表
	getAdminList:"admin/index",							//管理员列表
	startOrStopAdmin:"admin/startstop",					//管理员启停用

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
	//获取部门列表
	getDepartmentList(params){
		return http.get(path.getDepartmentList, params)
	},
	//获取账号列表
	getAccountList(params){
		return http.get(path.getAccountList, params)
	},
	//创建账号
	createAccount(params){
		return http.post(path.createAccount, params)
	},
	//获取账号信息
	getAccountInfo(params){
		return http.get(path.editAccount, params)
	},
	//修改账号信息
	editAccount(params){
		return http.post(path.editAccount, params)
	},
	//账号启停用
	startOrStop(params){
		return http.post(path.startOrStop, params)
	},
	//变动记录列表
	changeRecord(params){
		return http.get(path.changeRecord, params)
	},
	//管理员列表
	getAdminList(params){
		return http.get(path.getAdminList, params)
	},
	//管理员启停用
	startOrStopAdmin(params){
		return http.post(path.startOrStopAdmin, params)
	},
	
}









