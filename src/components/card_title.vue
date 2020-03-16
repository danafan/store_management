<template>
	<div class="box">
		<div class="left">
			<div class="line"></div>
			<div class="text">{{title}}</div>
		</div>
		<div class="right" @click="callback" v-if="shouBut && showCreate">
			<img src="../assets/create.png">
			<div>创建</div>
		</div>
	</div>
</template>
<style type="text/css" lang="less" scoped>
.box{
	margin-bottom: 18px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.left{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.line{
			margin-right: 18px;
			width: 2px;
			height: 15px;
			background: #3296FA;
		}
		.text{
			font-size: 16px;
			color: #333333;
		}
	}
	.right{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 12px;
		color: #3296FA;
		width:79px;
		height:30px;
		background:rgba(255,255,255,1);
		border-radius:15px;
		border:1px dashed rgba(50,150,250,1);
		img{
			margin-right: 6px;
			width: 16px;
			height: 16px;
		}
	}
}
</style>
<script type="text/javascript">
	export default{
		props:{
			title:{
				type:String,
				default:""
			},
			shouBut:{
				type:Boolean,
				default:true
			}
		},
		computed: {
			//判断是否显示创建按钮
			showCreate() {
				let str = this.$store.state.userInfo.roles;
				return str.indexOf("2") != -1;
			}
		},
		methods:{
			callback(){
				this.$emit('callback');
			}
		}
	}
</script>