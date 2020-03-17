<template>
	<div class="box">
		<img :src="`${qiniu}/permissions.png`"">
		<div class="text">尊敬的用户！ 您当前暂无店铺账号管理系统的查看权限</div>
		<div class="text">请联系管理员～</div>
	</div>
</template>
<style type="text/css" lang="less" scoped>
.box{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	img{
		margin-bottom: 20px;
		width:348px;
		height:296px;
	}
	.text{
		font-size: 20px;
		color: #333;
	}
}
</style>
<script type="text/javascript">
	export default{
		
		
	}
</script>