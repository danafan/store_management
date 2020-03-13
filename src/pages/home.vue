<template>
	<div class="box">
		<el-container style="height:100%">
			<el-header class="header">
				<div class="title">店铺账号管理</div>
			</el-header>
			<el-container>
				<el-aside>
					<el-menu
					:default-active="activeIndex"
					text-color="#000000"
					active-text-color="#409EFF"
					:router="true"
					@select="handleSelect"
					>
					<el-menu-item :index="item.url" v-for="item in menuList">
						<img class="icon" v-if="item.url == activeIndex" :src="require(`../assets/${item.url.split('/')[1]}_active.png`)">
						<img class="icon" v-else :src="require(`../assets/${item.url.split('/')[1]}.png`)">
						<span slot="title">{{item.name}}</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main class="main">
				<keep-alive>
					<router-view v-if="$route.meta.keepAlive"></router-view>
				</keep-alive>
				<router-view v-if="!$route.meta.keepAlive"></router-view>
			</el-main>
		</el-container>
	</el-container>
</div>
</template>
<style type="text/css" lang="less" scoped>
.box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	.header{
		border-bottom:1px solid rgb(238,238,238);
		.title{
			width: 240px;
			height: 64px;
			display:flex;
			align-items: center;
			justify-content: center;
			font-size: 18px;
			color: #000;
		}
	}
	.icon{
		margin-right: 12px;
		width: 18px;
		height: 18px;
	}
	.el-aside{
		width: 260px !important;
		background:#fff !important;
		border-right:1px solid rgb(238,238,238);
	}
	.el-menu{
		border: none !important;
	}
	.main{
		height: 100%;
		overflow-y: scroll;
	}
}
</style>
<script type="text/javascript">
	export default{
		computed: {
			menuList() {
				return this.$store.state.menuList
			},
			activeIndex(){
				return this.$store.state.activeIndex
			}
		},
		methods:{
			//切换导航
			handleSelect(index){
				this.$store.dispatch('changeMenu',index);
			}
		}

	}
</script>