//app.js
App({
	globalData: {
		env: 'alexicloud-test-23333' // alexicloud-test-23333
	},
	onLaunch: function () {

		if (!wx.cloud) {
			console.error('请使用 2.2.3 或以上的基础库以使用云能力')
		} else {
			wx.cloud.init({ // 如果要使用云能力，通常我们在小程序初始化时即调用这个方法。
				// 选择云函数的环境。默认环境是云开发的第一个环境，这里手动设成test
				env: this.globalData.env,
				traceUser: true,
			})
			this.getOpenId()
		}

		this.getAuthSetting()
	},
	// 云函数login获取用户openid
	getOpenId() {
		wx.cloud.callFunction({
			name: 'login'
		}).then(res => {
			console.log(res)
			this.globalData.openId = res.result.openid
		})
	},
	// 获取用户授权信息
	getAuthSetting() {
		wx.getSetting({
			success(res) {
				getApp().globalData.authority = res.authSetting
			}
		})
	}
})
