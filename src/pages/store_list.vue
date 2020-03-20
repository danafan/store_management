<template>
	<div>
		<el-card>
			<CardTitle title="店铺列表" @callback="showDialog = true" :shouBut="admin_type == '1'"></CardTitle>
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
				<el-form-item>
					<el-button type="primary" round @click="search">搜索</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" round @click="exportUp" v-if="showExport">导出</el-button>
				</el-form-item>
			</el-form>
			<el-table :data="dataObj.data" size="small" border style="width: 100%" align="center" :header-cell-style="{'background':'#f4f4f4'}">
				<el-table-column prop="store_name" label="店铺名称" align="center">
				</el-table-column>
				<el-table-column prop="taobao_store_id" label="店铺ID" align="center">
				</el-table-column>
				<el-table-column prop="num" label="账号数量" align="center">
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
	<el-dialog title="创建" width="40%" :visible.sync="showDialog">
		<el-form size="small" label-width="150px">
			<el-form-item label="店铺名称：">
				<el-input v-model="createReq.store_name" style='width: 200px;' placeholder="请输入店铺名称"></el-input>
			</el-form-item>
			<el-form-item label="店铺ID：">
				<el-input v-model="createReq.taobao_store_id" style='width: 200px;' placeholder="请输入店铺ID"></el-input>
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
				},
				dataObj:{},					//获取到的信息
				showDialog:false,			//默认创建弹框不显示
				createReq:{
					store_name:"",
					taobao_store_id:""
				}
			}
		},
		computed: {
			//店铺列表(查询条件)
			storeList() {
				return this.$store.state.storeList
			},
			//判断是否显示导出按钮
			showExport() {
				let str = this.$store.state.userInfo.roles;
				return str.indexOf("1") != -1;
			},
			//判断是否是超级管理员
			admin_type() {
				return this.$store.state.userInfo.admin_type;
			}
		},
		created(){
			//获取列表
			this.getList();
		},
		methods:{
			//确认创建
			submit(){
				if(this.createReq.store_name == ""){
					this.$message.warning('请输入店铺名称');
				}else if(this.createReq.taobao_store_id == ""){
					this.$message.warning('请输入店铺ID');
				}else{
					resource.createStore(this.createReq).then(res => {
						if(res.data.code == 1){
							this.$message.success('店铺创建成功');
							this.showDialog = false;
							//获取列表
							this.getList();
							this.$store.dispatch('getStoreListAjax');
						}else{
							this.$message.warning(res.data.msg);
						}
					})
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
				resource.getStoreList(this.req).then(res => {
					if(res.data.code == 1){
						this.dataObj = res.data.data;
					}else{
						this.$message.warning(res.data.msg);
					}
				})
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
				window.location.href = `${location.origin}/api/index/export?${exportStr.join('&')}`;
			},
		},
		components:{
			CardTitle
		}
	}
</script>












