<template>
	<div>
		<el-card>
			<CardTitle title="管理列表" @callback="create"></CardTitle>
			<el-table :data="dataObj.data" size="small" border style="width: 100%" align="center" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="admin_name" label="管理员" align="center">
				</el-table-column>
				<el-table-column prop="store_names" label="管理店铺" align="center">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="editor(scope.row.admin_id)" v-if="showEdit">修改</el-button>
						<el-button type="text" size="small" v-if="scope.row.status == 1" @click="setting(scope.row.admin_id,0)">停用</el-button>
						<el-button type="text" size="small" v-if="scope.row.status == 0" @click="setting(scope.row.admin_id,1)">启用</el-button>
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
		<div class="selectAdmin">
			<span>将</span>
			<div class="dingInput" @click="clickSpecified">{{createReq.staff_name}}</div>
			<span>员工</span>
		</div>
		<div class="selectAdmin" v-for="(item,index) in store_department">
			<span>设为</span>
			<el-select class="select" v-model="item.store_id" placeholder="请选择" size="small" clearable>
				<el-option v-for="storeItem in storeList" :key="storeItem.store_id" :label="storeItem.store_name" :value="storeItem.store_id">
				</el-option>
			</el-select>
			<span>店铺</span>
			<el-select class="select" v-model="item.department_id" placeholder="请选择" size="small" clearable>
				<el-option v-for="departmentItem in departmentList" :key="departmentItem.dept_id" :label="departmentItem.dept_name" :value="departmentItem.dept_id">
				</el-option>
			</el-select>
			<span>部门管理员</span>
			<img src="../assets/add.png" v-if="index == store_department.length - 1" @click="add(index)">
			<img src="../assets/delete.png" v-if="store_department.length > 1" @click="deleteIs(index)">
		</div>
		<div class="selectAdmin">
			<span>具有权限：</span>
			<el-checkbox-group class="select" v-model="roles">
				<el-checkbox label="1">导出</el-checkbox>
				<el-checkbox label="2">创建、修改</el-checkbox>
			</el-checkbox-group>
			<span>当前设置店铺部门的信息</span>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button size="small" type="primary" @click="submit">确 定</el-button>
			<el-button size="small" @click="showDialog = false">取 消</el-button>
		</span>
	</el-dialog>
</div>
</template>
<style type="text/css" lang="less" scoped>
.selectAdmin{
	margin-bottom: 20px;
	display: flex;
	align-items: center;
	.dingInput{
		border-radius: 5px;
		margin-left: 15px;
		margin-right: 15px;
		border:1px solid #dddddd;
		width: 200px;
		height: 32px;
		line-height: 30px;
		padding-left: 10px;
	}
	.select{
		margin-right: 15px;
		margin-left: 15px;
	}
	img{
		margin-left: 10px;
		width: 24px;
		height: 24px;
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
					pagesize:10
				},
				dataObj:{},					//获取到的信息
				showDialogType:0,			//0:创建；1:修改
				showDialog:false,
				store_department:[{
					store_id:"",
					department_id:""
				}],
				id:"",						//点击的管理员id
				roles:['1','2'],			//选中的权限
				createReq:{
					staff_name:"",
					staff_id:"",
					item:"",
					roles:""
				}
			}
		},
		created(){
			//获取列表
			this.getList();
		},
		computed: {
			//店铺列表(查询条件)
			storeList() {
				return this.$store.state.storeList;
			},
			//部门列表列表(查询条件)
			departmentList() {
				return this.$store.state.departmentList;
			},
			//判断是否显示修改按钮
			showEdit() {
				let str = this.$store.state.userInfo.roles;
				return str.indexOf("2") != -1;
			}
		},
		methods:{
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
			//获取列表
			getList(){
				resource.getAdminList(this.req).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
			},
			//创建
			create(){
				this.showDialogType = 0;
				this.showDialog = true;
				this.store_department = [{
					store_id:"",
					department_id:""
				}];
				this.roles = ['1','2'];
				Object.keys(this.createReq).forEach(key=>{this.createReq[key]=""});
			},
			//修改
			editor(id){
				this.id = id;
				this.showDialogType = 1;
				resource.getAdminInfo({admin_id:this.id}).then(res => {
					if(res.data.code == 1){
						let resData = res.data.data;
						this.showDialog = true;
						this.createReq.staff_name = resData.name;
						this.store_department = [];
						resData.list.map(i => {
							let pushObj = {
								store_id:parseInt(i.item.split("_")[0]),
								department_id:parseInt(i.item.split("_")[1]),
							}
							this.store_department.push(pushObj);
						});
						this.roles = resData.role.split(",");
					}else{
						this.$message.warning(res.data.msg);
					}
				});

			},
			//点击指定员工
			clickSpecified(){
				if(this.showDialogType == 0){	//创建管理员可修改员工
					// dd.ready(() => {
						dd.biz.contact.choose({
    						multiple: false, //是否多选：true多选 false单选； 默认true
    						users: [], //默认选中的用户列表，员工userid；成功回调中应包含该信息
    						corpId: "ding7828fff434921f5b", //企业id
    						max: 1500, //人数限制，当multiple为true才生效，可选范围1-1500
    						onSuccess: res => {
    							this.createReq.staff_name = res[0].name;
    							this.createReq.staff_id = res[0].emplId;
    						},
    						onFail : err => {}
    					});
					// });
				}else{
					this.$message.warning("不能修改员工哦~");
				}
				
			},
			//启停用
			setting(id,type){
				this.$confirm(`确认${type == 0 ? '停用' : '启用'}?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var req = {
						type:type,
						admin_id:id
					};
					resource.startOrStopAdmin(req).then(res => {
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
			//点击加
			add(index){
				if(this.store_department[index].store_id == "" || this.store_department[index].department_id == ""){
					this.$message.warning("请完善当前条目");
				}else{
					if(JSON.stringify(this.store_department.slice(0,this.store_department.length - 1)).indexOf(JSON.stringify(this.store_department[index])) === -1){
						let obj = {
							store_id:"",
							department_id:""
						}
						this.store_department.push(obj);
					}else{
						this.$message.warning("该条目已存在");
						
					}
				}
			},
			//点删除
			deleteIs(index){
				this.store_department.splice(index,1);
			},
			//判断是否有重复
			isRepeat(){
				var arr = this.store_department;
				var hash = {};
				for (var i in arr) {
					if (hash[JSON.stringify(arr[i])]){
						return true; 
					}
					hash[JSON.stringify(arr[i])] = true;
				}
				return false;
			},
			//判断是否完善店铺和部门
			isPerfect(){
				var ishaha = true;
				this.store_department.map((item) => {
					if(item.store_id =="" || item.department_id == ""){
						this.$message.warning("请完善店铺和部门");
						ishaha  = false;
						return;
					}
				});
				return ishaha;
			},
			//确认创建/修改
			submit(){
				//店铺和部门
				if(this.createReq.staff_name == ""){
					this.$message.warning("请选择员工");
				}else if(this.store_department.length == 1 && (this.store_department[0].store_id == "" && this.store_department[0].department_id == "")){
					this.$message.warning("请选取店铺和部门");
				}else if(this.isRepeat()){
					this.$message.warning("请勿重复填写店铺和部门");
				}else if(!this.isPerfect()){
					this.$message.warning("请完善店铺和部门");
				}else{
					//店铺部门字符串组合
					var arr = [];
					this.store_department.map((item) => {
						if(item.store_id !="" && item.department_id != ""){
							let str = `${item.store_id}_${item.department_id}`;
							arr.push(str);
						}
						
					});
					this.createReq.item = arr.join(',');
					//权限
					this.createReq.roles = this.roles.join(',');
					if(this.showDialogType == 0){	//创建
						resource.createAdmin(this.createReq).then(res => {
							if(res.data.code == 1){
								this.$message.success("管理员创建成功");
								this.showDialog = false;
								//获取列表
								this.getList();
							}else{
								this.$message.warning(res.data.msg);
							}
						});
					}else{							//修改
						resource.editAdmin({...this.createReq,...{admin_id:this.id}}).then(res => {
							if(res.data.code == 1){
								this.$message.success("管理员修改成功");
								this.showDialog = false;
								//获取列表
								this.getList();
							}else{
								this.$message.warning(res.data.msg);
							}
						});
					}
				};
				


			}





		},
		components:{
			CardTitle
		}
	}
</script>












