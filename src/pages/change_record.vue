<template>
	<div>
		<el-card>
			<CardTitle title="店铺列表" @callback="showDialog = true" :shouBut="false"></CardTitle>
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
				<el-table-column prop="account" label="店铺账号" align="center">
				</el-table-column>
				<el-table-column prop="dept_name" label="部门" align="center">
				</el-table-column>
				<el-table-column prop="auth_username" label="认证人姓名" align="center">
				</el-table-column>
				<el-table-column prop="auth_mobile" label="认证人手机号" align="center">
				</el-table-column>
				<el-table-column prop="staff_name" label="所属员工" align="center">
				</el-table-column>
				<el-table-column prop="admin_name" label="操作管理员" align="center">
				</el-table-column>
				<el-table-column prop="start_time" label="起始时间" align="center">
				</el-table-column>
				<el-table-column prop="end_time" label="结束时间" align="center">
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
			}
		},
		computed: {
			//店铺列表(查询条件)
			storeList() {
				return this.$store.state.storeList;
			},
			//判断是否显示导出按钮
			showExport() {
				let str = this.$store.state.userInfo.roles;
				return str.indexOf("1") != -1;
			}
		},
		created(){
			//获取列表
			this.getList();
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
			//搜索
			search(){
				this.req.page = 1;
				//获取列表
				this.getList();
			},
			//获取列表
			getList(){
				resource.changeRecord(this.req).then(res => {
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
				window.location.href = `${location.origin}/api/log/export?${exportStr.join('&')}`;
			},
		},
		components:{
			CardTitle
		}
	}
</script>












