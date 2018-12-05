/*
 * @Author: AlexiXiang
 * @Date: 2018-12-04 10:48:17
 * @LastEditors: AlexiXiang
 * @LastEditTime: 2018-12-04 14:51:27
 * @Description: 拉取用户todolist
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')
// 云函数入口函数
exports.main = async (event, context) => {
    cloud.init({
        env: event.env
    })
    const db = cloud.database()
    return await db.collection('todos').where({
        _openid: cloud.getWXContext().OPENID
    }).get()
}