/*
 * @Author: AlexiXiang
 * @Date: 2018-12-04 14:56:42
 * @LastEditors: AlexiXiang
 * @LastEditTime: 2018-12-05 14:00:18
 * @Description: 小程序端直接数据库操作的封装
 */
const db = wx.cloud.database()
const app = getApp()
const databaseOpt = {
    // 拉取用户的todolist
    getTodoList(data) {
        return db.collection('todos').where({
            _openid: app.globalData.openId
        }).get()
    },
    // 添加一条todo
    addTodo(data) {
        return db.collection('todos').add({
            data: {
                description: data.description,
                done: false
            }
        })
    },
    // 将一条todo置为完成done
    todoDone(_id) {
        return db.collection('todos').doc(_id).update({
            data: {
                done: true
            }
        })
    },
    // 将一条todo置为完成undo
    todoUndo(_id) {
        return db.collection('todos').doc(_id).update({
            data: {
                done: false
            }
        })
    },
    // 删除一条todo
    deleteTodo(_id) {
        return db.collection('todos').doc(_id).remove()
    }
}
export default databaseOpt