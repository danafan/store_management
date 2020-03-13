module.exports = {	
	devServer: {
		proxy: {
			'/api': {
				target: 'http://shop_user.gxk8090.com',
				// target: 'http://api.gxk8090.com',
				ws: true,
				changOlrigin: true,		//是否跨域
			}
		}
	},
	// assetsDir: "api"
}