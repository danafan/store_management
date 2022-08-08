<template>
	<div>
		<el-card>
			<CardTitle title="账号列表" @callback="create"></CardTitle>
			<el-form :inline="true" size="small" class="demo-form-inline">
				<el-form-item label="店铺名称：">
					<el-select v-model="req.id" placeholder="请选择" clearable>
						<el-option v-for="item in storeList" :key="item.store_id" :label="item.store_name" :value="item.store_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="店铺ID：">
					<el-input style="width: 300px;" v-model="req.store_id" placeholder="输入店铺ID"></el-input>
				</el-form-item>
				<el-form-item label="店铺账号：">
					<el-input style="width: 300px;" v-model="req.account" placeholder="输入店铺账号"></el-input>
				</el-form-item>
				<el-form-item label="部门名称：">
					<el-select v-model="req.dept_id" placeholder="请选择" clearable>
						<el-option v-for="item in bumen" :key="item.dept_id" :label="item.dept_name" :value="item.dept_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="认证人姓名：">
					<el-input style="width: 300px;" v-model="req.auth_username" placeholder="认证人姓名"></el-input>
				</el-form-item>
				<el-form-item label="认证人手机号：">
					<el-input style="width: 300px;" v-model="req.auth_mobile" type="number" placeholder="认证人手机号"></el-input>
				</el-form-item>
				<el-form-item label="使用人：">
					<el-input style="width: 300px;" v-model="req.staff_name" placeholder="输入使用人"></el-input>
				</el-form-item>
				<el-form-item label="使用状态：">
					<el-select v-model="req.usage_state" placeholder="请选择" clearable>
						<el-option label="不限" value="">
						</el-option>
						<el-option label="已使用" value="1">
						</el-option>
						<el-option label="未使用" value="0">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="账号状态：">
					<el-select v-model="req.status" placeholder="请选择" clearable>
						<el-option label="已启用" value="1">
						</el-option>
						<el-option label="已停用" value="0">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="异常状态：">
					<el-select v-model="req.abnormal_status">
						<el-option label="正常" value="0">
						</el-option>
						<el-option label="姓名异常" value="1">
						</el-option>
						<el-option label="手机号异常" value="2">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" round @click="search">搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" round @click="exportUp" v-if="showExport">导出</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" round @click="show_dialog = true">导入</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="dataObj.data" size="small" border style="width: 100%" align="center" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="store_name" label="店铺名称" align="center">
				</el-table-column>
				<el-table-column prop="taobao_store_id" label="店铺ID" align="center">
				</el-table-column>
				<el-table-column prop="account" label="店铺账号" align="center">
				</el-table-column>
				<el-table-column prop="dept_name" label="部门" align="center">
				</el-table-column>
				<el-table-column prop="auth_username" label="认证人姓名" align="center">
				</el-table-column>
				<el-table-column prop="auth_mobile" label="认证人手机号" align="center">
				</el-table-column>
				<el-table-column prop="staff_name" label="使用人" align="center">
				</el-table-column>
				<el-table-column prop="remarks" label="备注" align="center">
				</el-table-column>
				<el-table-column prop="remarks" label="审核状态" align="center">
					<template slot-scope="scope">
						<div v-if="scope.row.audit_status == '0'">待审核</div>
						<div v-if="scope.row.audit_status == '1'">审核通过</div>
						<div v-if="scope.row.audit_status == '2'">审核拒绝</div>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="clickSpecified(scope.row.account_id)" v-if="scope.row.role == 1">指定员工</el-button>
						<el-button type="text" size="small" @click="auditFn(scope.row.account_id)" v-if="scope.row.audit_status == '0'">审核</el-button>
						<el-button type="text" size="small" @click="clickExternal(scope.row.account_id)" v-if="scope.row.role == 1">指定外部员工</el-button>
						<el-button type="text" size="small" @click="editor(scope.row.account_id)" v-if="showEdit && scope.row.role == 1">修改</el-button>
						<el-button type="text" size="small" @click="remark(scope.row.account_id,scope.row.remarks)" v-if="showRemark && scope.row.role == 1">备注</el-button>
						<el-button type="text" size="small" v-if="scope.row.status == 1 && scope.row.role == 1" @click="setting(scope.row.account_id,0)">停用</el-button>
						<el-button type="text" size="small" v-if="scope.row.status == 0 && scope.row.role == 1" @click="setting(scope.row.account_id,1)">启用</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="page">
				<el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="req.page"
				:pager-count="11"
				:page-sizes="[5, 10, 15, 20]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="dataObj.total"
				>
			</el-pagination>
		</div>
	</el-card>
	<!-- 创建或修改 -->
	<el-dialog :title="showDialogType == 0 ? '创建' : '修改'" width="40%" :visible.sync="showDialog">
		<el-form size="small" label-width="150px">
			<el-form-item label="店铺ID：">
				<el-select v-model="store_id" style="width: 200px;" placeholder="请选择" clearable @change="checkStore">
					<el-option v-for="(item,index) in storeList" :key="index" :label="item.taobao_store_id" :value="item.store_id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="部门名称：">
				<el-select v-model="createReq.dept_id" style="width: 200px;" placeholder="请选择" clearable>
					<el-option v-for="item in departmentList" :key="item.dept_id" :label="item.dept_name" :value="item.dept_id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="店铺账号：">
				<el-input style="width: 200px;" v-model="createReq.account" placeholder="输入店铺账号"></el-input>
			</el-form-item>
			<el-form-item label="认证人姓名：">
				<el-input style="width: 200px;" v-model="createReq.auth_username" placeholder="输入认证人姓名"></el-input>
			</el-form-item>
			<el-form-item label="认证人手机号：">
				<el-input style="width: 200px;" v-model="createReq.auth_mobile" placeholder="输入认证人手机号"></el-input>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button size="small" type="primary" @click="submit">确 定</el-button>
			<el-button size="small" @click="showDialog = false">取 消</el-button>
		</span>
	</el-dialog>
	<!-- 指定外部员工 -->
	<el-dialog title="选择外部员工作为店铺账号的使用人" width="40%" :visible.sync="showOuter">
		<el-radio-group v-model="checkOuter">
			<el-radio :label="item" v-for="item in outerList">{{item.outer_username}}</el-radio>
		</el-radio-group>
		<span slot="footer" class="dialog-footer">
			<el-button size="small" type="primary" @click="okCheck">确 定</el-button>
			<el-button size="small" @click="showOuter = false">取 消</el-button>
		</span>
	</el-dialog>
	<!-- 备注 -->
	<el-dialog title="备注" width="40%" :visible.sync="showRemarkDialog">
		<el-input
		type="textarea"
		:rows="5"
		placeholder="请输入备注"
		v-model="remarkContent">
	</el-input>
	<span slot="footer" class="dialog-footer">
		<el-button size="small" type="primary" @click="okRemark">确 定</el-button>
		<el-button size="small" @click="showRemarkDialog = false">取 消</el-button>
	</span>
</el-dialog>
<!-- 导入 -->
<el-dialog title="导入" :visible.sync="show_dialog" width="30%">
	<div class="down_box">
		<el-button type="primary" plain size="small" @click="downTemplate">下载模版<i class="el-icon-download el-icon--right"></i></el-button>
		<div class="upload_box">
			<el-button type="primary" size="small">
				导入
				<i class="el-icon-upload el-icon--right"></i>
			</el-button>
			<input type="file" ref="csvUpload" class="upload_file" accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="uploadCsv">
		</div>
	</div>
	<div slot="footer" class="dialog-footer">
		<el-button size="small" @click="show_dialog = false">取 消</el-button>
	</div>
</el-dialog>
<!-- 审核 -->
<el-dialog title="审核" width="30%" :visible.sync="showAudit">
	<el-radio-group v-model="type">
		<el-radio label="1">同意</el-radio>
		<el-radio label="2">拒绝</el-radio>
	</el-radio-group>
	<span slot="footer" class="dialog-footer">
		<el-button size="small" type="primary" @click="checkAudit">确 定</el-button>
		<el-button size="small" @click="showAudit = false">取 消</el-button>
	</span>
</el-dialog>
</div>
</template>
<style type="text/css" lang="less" scoped>
.down_box{
	display:flex;
	.upload_box{
		margin-left: 10px;
		position: relative;
		.upload_file{
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
		}
	}
}
</style>

<script type="text/javascript">
	import resource from '../api/resource.js'
	import CardTitle from '../components/card_title.vue'
	import * as dd from 'dingtalk-jsapi';
	export default{
		data(){
			return{
				req:{
					page:1,
					pagesize:10,
					id:"",
					store_id:"",
					account:"",
					dept_id:"",
					auth_username:"",
					auth_mobile:"",
					staff_name:"",
					usage_state:"",
					status:"",
					abnormal_status:"0"
				},
				dataObj:{},					//获取到的信息
				showDialog:false,			//默认创建弹框不显示
				showDialogType:0,			//0:创建；1：修改
				store_id:"",				//创建或修改选中的store_id
				departmentList:[],			//部门列表
				showOuter:false,			//指定外部员工弹框
				outerList:[],				//所有外部员工列表
				checkOuter:{},				//选中的外部员工
				showRemarkDialog:false,		//是否显示备注弹框
				remarkContent:"",			//备注内容
				createReq:{
					dept_id:"",
					account:"",
					auth_username:"",
					auth_mobile:""
				},
				id:"",						//选中的账号id
				show_dialog:false,
				showAudit:false,			//审核弹窗
				type:'1',					//1:同意；2:拒绝
			}
		},
		computed: {
			//店铺列表(查询条件)
			storeList() {
				return this.$store.state.storeList;
			},
			//部门名称列表（查询条件）
			bumen() {
				return this.$store.state.departmentList
			},
			//判断是否显示导出按钮
			showExport() {
				let str = this.$store.state.userInfo.roles;
				return str.indexOf("1") != -1;
			},
			//判断是否显示修改按钮
			showEdit() {
				let str = this.$store.state.userInfo.roles;
				return str.indexOf("2") != -1;
			},
			//判断是否显示备注
			showRemark(){
				let str = this.$store.state.userInfo.roles;
				return str.indexOf("2") != -1;
			}

		},
		watch:{
			store_id:function(n,o){
				//根据选中的店铺获取对应的部门
				this.getDepartmentList(n);
			}
		},
		created(){
			//获取列表
			this.getList();
		},
		methods:{
			checkStore(){
				this.createReq.dept_id = "";
			},
			//点击审核
			auditFn(account_id){
				this.type = '1';
				this.id = account_id;
				this.showAudit = true;
			},
			//提交审核
			checkAudit(){
				let arg = {
					account_id:this.id,
					type:this.type
				}
				resource.accountAudit(arg).then(res => {
					if(res.data.code == 1){
						this.$message.success(res.data.msg);
						this.showAudit = false;
						//获取列表
						this.getList();
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//点击指定员工
			clickSpecified(id){
				dd.biz.contact.choose({
    				multiple: false, //是否多选：true多选 false单选； 默认true
    				users: [], //默认选中的用户列表，员工userid；成功回调中应包含该信息
    				corpId: "ding7828fff434921f5b", //企业id
    				max: 1500, //人数限制，当multiple为true才生效，可选范围1-1500
    				onSuccess: res => {
    					let req = {
    						type:0,
    						account_id:id,
    						staff_id:res[0].emplId,
    						staff_name:res[0].name
    					}
    					//指定
    					this.specified(req);	
    				},
    				onFail : err => {}
    			});
			},
			//点击指定外部员工
			clickExternal(id){
				this.id = id;
				resource.outerList().then(res => {
					if(res.data.code == 1){
						this.outerList = res.data.data;
						this.showOuter = true;
					}else{
						this.$message.warning(res.data.msg);
					}
				});
			},
			//点击选择外部员工确认
			okCheck(){
				if(!this.checkOuter.outer_user_id){
					this.$message.warning("请选择外部员工!");
				}else{
					let req = {
						type:1,
						account_id:this.id,
						staff_id:this.checkOuter.outer_user_id,
						staff_name:this.checkOuter.outer_username
					}
    				//指定
    				this.specified(req);
    			}
    		},
			//指定
			specified(req){
				resource.specified(req).then(res => {
					if(res.data.code == 1){
						this.showOuter = false;
						this.$message.success("员工指定成功");
						//获取列表
						this.getList();
					}else{
						this.$message.warning(res.data.msg);
					}
				});
			},
			//启、停用
			setting(id,type){
				this.$confirm(`确认${type == 0 ? '停用' : '启用'}?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var req = {
						type:type,
						account_id:id
					};
					resource.startOrStop(req).then(res => {
						if(res.data.code == 1){
							//获取列表
							this.getList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消'
					});          
				});
			},
			//点击创建
			create(){
				this.showDialogType = 0;
				this.showDialog = true;
				this.store_id = "";
				Object.keys(this.createReq).forEach(key=>{this.createReq[key]=""});
			},
			//点击修改
			editor(id){
				this.id = id;
				resource.getAccountInfo({account_id:this.id}).then(res => {
					if(res.data.code == 1){
						this.showDialogType = 1;
						this.showDialog = true;
						var resData = res.data.data.info;
						this.store_id = parseInt(resData.store_id);
						Object.keys(this.createReq).forEach(key=>{this.createReq[key]=resData[key]});
					}else{
						this.$message.warning(res.data.msg);
					}
				});
			},
			//点击备注
			remark(id,remarks){
				this.id = id;
				this.showRemarkDialog = true;
				this.remarkContent = remarks;
			},
			//确认备注
			okRemark(){
				let req = {
					account_id:this.id,
					remarks:this.remarkContent
				}
				this.editFuc(req);
			},
			//根据选中的店铺获取对应的部门
			getDepartmentList(id){
				resource.getDepartmentList({store_id:id}).then(res => {
					if(res.data.code == 1){
						this.departmentList = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				});
			},
			//确认创建/修改
			submit(){
				if(this.store_id == ""){
					this.$message.warning('请选择店铺');
				}else if(this.createReq.dept_id == ""){
					this.$message.warning('请选择部门');
				}else if(this.createReq.account == ""){
					this.$message.warning('请输入店铺账号');
				}else if(this.createReq.auth_username == ""){
					this.$message.warning('请输入认证人姓名');
				}else if(this.createReq.auth_mobile == ""){
					this.$message.warning('请输入认证人手机号');
				}else{
					resource.authStore({name:this.createReq.auth_username,store_id:this.store_id,account_id:this.id}).then(res => {
						if(res.data.code == 1){
							let reaData = res.data.data;
							if(reaData.length == 0){
								if(this.showDialogType == 0){		//创建
									this.createFuc();	
								}else{								//修改
									this.editFuc({...this.createReq,...{account_id:this.id,store_id:this.store_id}});
								}
							}else{
								this.showDialog = false;
								let reaData = res.data.data;
								let arr = [];
								reaData.map(item => arr.push(`【${item.store_name}】`));
								this.$confirm(`该认证人已认证店铺${arr.join(",")}，是否用该认证人认证此账号?`, '提示', {
									confirmButtonText: '确定',
									cancelButtonText: '取消',
									type: 'warning'
								}).then(() => {
									if(this.showDialogType == 0){		//创建
										this.createFuc();	
									}else{								//修改
										this.editFuc({...this.createReq,...{account_id:this.id,store_id:this.store_id}});
									}
								}).catch(() => {
									this.showDialog = true;          
								});
							}
						}else{
							this.$message.warning(res.data.msg);
						}
					});
				};
			},
			createFuc(){
				resource.createAccount({...this.createReq,...{store_id:this.store_id}}).then(res => {
					if(res.data.code == 1){
						this.$message.success('账号创建成功');
						this.showDialog = false;
						//获取列表
						this.getList();
					}else{
						this.$message.warning(res.data.msg);
					}
				});
			},
			editFuc(req){
				resource.editAccount(req).then(res => {
					if(res.data.code == 1){
						this.$message.success('账号修改成功');
						this.showDialog = false;
						this.showRemarkDialog = false;
						//获取列表
						this.getList();
					}else if(res.data.code == 2){
						this.showDialog = false;
						let reaData = res.data.data;
						let arr = [];
						reaData.map(item => arr.push(`【${item.store_name}】`));
						this.$confirm(`该认证人已认证店铺${arr.join(",")}，是否用该认证人认证此账号?`, '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							if(this.showDialogType == 0){		//创建
								this.createFuc();	
							}else{								//修改
								this.editFuc({...this.createReq,...{account_id:this.id,store_id:this.store_id}});
							}
						}).catch(() => {
							this.showDialog = true;          
						});
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//分页
			handleSizeChange(val) {
				this.req.pagesize = val;
				//获取列表
				this.getList();
			},
			handleCurrentChange(val) {
				this.req.page = val;
				//获取列表
				this.getList();
			},
			//搜索
			search(){
				this.req.page = 1;
				//获取列表
				this.getList();
			},
			//获取列表
			getList(){
				resource.getAccountList(this.req).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//下载模版
			downTemplate(){
				window.open('https://img.gxk8090.com/%E5%BA%97%E9%93%BA%E8%B4%A6%E5%8F%B7%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx')
			},
			//导入
			uploadCsv(){
				if (this.$refs.csvUpload.files.length > 0) {
					let files = this.$refs.csvUpload.files;
					resource.accountImport({file:files[0]}).then(res => {
						this.$refs.csvUpload.value = null;
						if(res.data.code == 1){
							this.$message.success(res.data.msg);
							this.req.page = 1;
							this.show_dialog = false;
							//获取列表
							this.getList();
						}else{
							this.$message.warning(res.data.msg);
						}
					})
				}
			},
			//预约下载
			exportUp(){
				var exportStr = [];
				for(let a in this.req){
					if(a != 'page' && a != 'pagesize' && this.req[a] != ''){
						var str = `${a}=${this.req[a]}`;
						exportStr.push(str);
					}
				}
				window.location.href = `${location.origin}/api/account/export?${exportStr.join('&')}`;
			},


		},
		components:{
			CardTitle
		}
	}
</script>












