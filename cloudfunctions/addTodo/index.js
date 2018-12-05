/*
 * @Author: AlexiXiang
 * @Date: 2018-12-03 18:39:24
 * @LastEditors: AlexiXiang
 * @LastEditTime: 2018-12-04 14:56:04
 * @Description: 添加一个todo
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')
// 云函数入口函数
exports.main = async (event, context) => {
    cloud.init({
        env: event.env
    })
    const db = cloud.database()
    return await db.collection('todos').add({
        data: {
            _openid: cloud.getWXContext().OPENID,
            description: event.description,
            // due: new Date(event.due),
            done: false
        }
    })
}