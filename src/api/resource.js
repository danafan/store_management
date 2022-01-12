import http from './request.js'
let path = {	
	getUserInfo:"login",								//获取钉钉userid
	ddConfig:"jsapi",									//获取钉钉配置信息
	getMenu:"getmenu",									//获取导航菜单以及用户信息
	getStoreListAjax:"index/ajaxstore",					//获取店铺列表（查询条件）
	createStore:"index/add",							//创建店铺
	getStoreList:"index/storeList",						//获取店铺列表（结果列表）
	delStore:'index/del',								//删除店铺
	getDepartmentList:"index/ajaxdept",					//获取部门列表
	getAccountList:"account/index",						//获取账号列表
	specified:"account/appoint",						//指定员工
	outerList:'account/ajaxouter',						//获取外部员工列表
	createAccount:"account/add",						//创建账号
	editAccount:"account/edit",							//修改账号（获取和修改）
	startOrStop:"account/startstop",					//账号启停用
	authStore:"account/authstore",						//获取该认证人已认证的店铺列表
	changeRecord:"log/index",							//变动记录列表
	getAdminList:"admin/index",							//管理员列表
	startOrStopAdmin:"admin/startstop",					//管理员启停用
	createAdmin:"admin/add",							//创建管理员
	editAdmin:"admin/edit",								//编辑管理员
	editName:'index/editname',							//编辑管理员姓名
	delAdmin:'admin/del',								//删除管理员

}				
export default{
	//获取钉钉用户信息
	getUserInfo(params){
		return http.post(path.getUserInfo, params)
	},
	//获取钉钉用户信息
	ddConfig(params){
		return http.get(path.ddConfig, params)
	},
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
	//删除店铺
	delStore(params){
		return http.post(path.delStore, params)
	},
	//获取部门列表
	getDepartmentList(params){
		return http.get(path.getDepartmentList, params)
	},
	//获取账号列表
	getAccountList(params){
		return http.get(path.getAccountList, params)
	},
	//指定员工
	specified(params){
		return http.post(path.specified, params)
	},
	//获取外部员工列表
	outerList(params){
		return http.get(path.outerList, params)
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
	//获取获取该认证人已认证的店铺列表
	authStore(params){
		return http.get(path.authStore, params)
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
	//创建管理员
	createAdmin(params){
		return http.post(path.createAdmin, params)
	},
	//获取管理员信息
	getAdminInfo(params){
		return http.get(path.editAdmin, params)
	},
	//编辑管理员
	editAdmin(params){
		return http.post(path.editAdmin, params)
	},
	//编辑管理员姓名(get)
	editNameGet(params){
		return http.get(path.editName, params)
	},
	//编辑管理员姓名(post)
	editNamePost(params){
		return http.post(path.editName, params)
	},
	//删除管理员
	delAdmin(params){
		return http.post(path.delAdmin, params)
	},
	
}









