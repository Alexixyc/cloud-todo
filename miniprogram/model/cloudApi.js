/*
 * @Author: AlexiXiang
 * @Date: 2018-12-04 10:21:22
 * @LastEditors: AlexiXiang
 * @LastEditTime: 2018-12-04 10:23:19
 * @Description: 云函数调用的封装
 */
const app = getApp()
function cloudApi(fnName, data = {}, config = {}) {
    return wx.cloud.callFunction({
        name: fnName,
        data: {
            env: app.globalData.env,
            ...data
        },
        config: config
    })
}
export { cloudApi }