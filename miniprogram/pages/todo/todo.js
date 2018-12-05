// import { cloudApi } from '../../model/cloudApi.js'
import dbOpt from '../../model/databaseOpt'
const app = getApp()
Page({
    data: {
        todoList: [],
        inputValue: '',
        loading: false
    },
    onLoad: function (options) {
        this.getTodoList()
    },
    showLoading() {
        this.setData({
            loading: true
        })
    },
    hideLoading() {
        this.setData({
            loading: false
        })
    },
    // 拉取用户todolist
    getTodoList() {
        this.showLoading()
        dbOpt.getTodoList().then(res => {
            this.hideLoading()
            this.setData({
                todoList: [].concat(res.data)
            })
        })
    },
    // 输入框input 
    bindKeyInput(e) {
        this.setData({
            inputValue: e.detail.value
        })
    },
    // 添加一条todo
    addTodo() {
        if (this.data.inputValue.trim() == '') {
            wx.showToast({
                title: '不要划水好吗~(*`ェ´*)',
                icon: 'none'
            })
            return
        }
        this.showLoading()
        dbOpt.addTodo({
            description: this.data.inputValue
        }).then(res => {
            this.getTodoList()
            this.setData({
                inputValue: ''
            })
        })
    },
    // 删除一条doto
    deleteTodo(e) {
        this.showLoading()
        dbOpt.deleteTodo(e.currentTarget.dataset.id).then(res => {
            this.getTodoList()
        })
    },
    // 修改一条todo的状态
    modifyTodoStatus(e) {
        this.showLoading()
        if (e.currentTarget.dataset.status) {
            dbOpt.todoUndo(e.currentTarget.dataset.id).then(res => {
                this.getTodoList()
            })
        } else {
            dbOpt.todoDone(e.currentTarget.dataset.id).then(res => {
                this.getTodoList()
            })
        }
    }
})