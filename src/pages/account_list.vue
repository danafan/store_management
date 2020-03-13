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
						<el-option v-for="item in departmentList" :key="item.dept_id" :label="item.dept_name" :value="item.dept_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="认证人手机号：">
					<el-input style="width: 300px;" v-model="req.auth_mobile" type="number" placeholder="认证人手机号"></el-input>
				</el-form-item>
				<el-form-item label="所属员工：">
					<el-input style="width: 300px;" v-model="req.realname" placeholder="输入所属员工"></el-input>
				</el-form-item>
				<el-form-item label="完善程度：">
					<el-select v-model="req.usage_state" placeholder="请选择" clearable>
						<el-option label="已完善" value="1">
						</el-option>
						<el-option label="未完善" value="0">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" round @click="search">搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" round @click="exportUp">导出</el-button>
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
				<el-table-column prop="realname" label="所属员工" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="specified(scope.row.account_id)">指定员工</el-button>
						<el-button type="text" size="small" @click="editor(scope.row.account_id)">修改</el-button>
						<el-button type="text" size="small" v-if="scope.row.status == 1" @click="setting(scope.row.account_id,0)">停用</el-button>
						<el-button type="text" size="small" v-if="scope.row.status == 0" @click="setting(scope.row.account_id,1)">启用</el-button>
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
	<el-dialog :title="showDialogType == 0 ? '创建' : '修改'" width="40%" :visible.sync="showDialog">
		<el-form size="small" label-width="150px">
			<el-form-item label="店铺名称：">
				<el-select v-model="createReq.store_id" style="width: 200px;" :disabled="showDialogType == 1" placeholder="请选择" clearable>
					<el-option v-for="item in storeList" :key="item.store_id" :label="item.store_name" :value="item.store_id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="部门名称：">
				<el-select v-model="createReq.dept_id" style="width: 200px;" :disabled="showDialogType == 1" placeholder="请选择" clearable>
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
</div>
</template>
<style type="text/css" lang="less" scoped>

</style>

<script type="text/javascript">
	import resource from '../api/resource.js'
	import CardTitle from '../components/card_title.vue'
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
					auth_mobile:"",
					realname:"",
					usage_state:""
				},
				dataObj:{},					//获取到的信息
				showDialog:false,			//默认创建弹框不显示
				showDialogType:0,			//0:创建；1：修改
				createReq:{
					store_id:"",
					dept_id:"",
					account:"",
					auth_username:"",
					auth_mobile:""
				},
				id:"",						//选中的账号id
			}
		},
		computed: {
			//店铺列表(查询条件)
			storeList() {
				return this.$store.state.storeList;
			},
			//部门列表列表(查询条件)
			departmentList() {
				return this.$store.state.departmentList;
			}
		},
		created(){
			//获取列表
			this.getList();
		},
		methods:{
			//点击指定员工
			specified(id){
				console.log(id);
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
						Object.keys(this.createReq).forEach(key=>{this.createReq[key]=resData[key]});
					}else{
						this.$message.warning(res.data.msg);
					}
				});
			},
			//确认创建/修改
			submit(){
				if(this.createReq.store_id == ""){
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
					if(this.showDialogType == 0){	//创建
						resource.createAccount(this.createReq).then(res => {
							if(res.data.code == 1){
								this.$message.success('账号创建成功');
								this.showDialog = false;
								//获取列表
								this.getList();
							}else{
								this.$message.warning(res.data.msg);
							}
						});
					}else{							//修改
						resource.editAccount({...this.createReq,...{account_id:this.id}}).then(res => {
							if(res.data.code == 1){
								this.$message.success('账号修改成功');
								this.showDialog = false;
								//获取列表
								this.getList();
							}else{
								this.$message.warning(res.data.msg);
							}
						})
					}
					
				};
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
			//预约下载
			exportUp(){
				// var arr = {};
				// for(let a in this.req){
				// 	if(a != 'page' && a != 'pagesize' && this.req[a] != ''){
				// 		arr[a] = this.req[a];
				// 	}
				// }
				// arr.index = 11;
				// exportUp.exportUp(arr)
			},
		},
		components:{
			CardTitle
		}
	}
</script>












