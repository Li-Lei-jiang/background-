import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    // 命名空间
    namespaced: true,
    state: {
        user: {
            username: '',
            password: '',
        },
        userList: {}
    },
    mutations: {
        ['STE_USERLIST'](state, data) {
            state.userList = data
        },
        // ['STE_USERLIST—_ONE'](state, data) {
        //     state.userList.users = data
        // },
        ['SET_USER'](state, data) {
            state.user = data
        },
        ['SET_LOADING'](state, data) {
            false
        },

    },
    actions: {
        // 发异步请求 登录
        async login({ commit }, data) {
            let res = await api.login(data)
                // console.log(res.data);
            if (res.meta.status === 200) {
                let user = res.data
                commit('STE_USER', user)
                router.push('/')
                localStorage.setItem('adminToken', res.data.token)
            } else {
                alert(res.meta.msg)
            };
        },
        // 发异步请求 用户列表
        async usersList({ commit }, { pagenum, pagesize, query }) {
            let res = await api.usersList({ pagenum, pagesize, query })
                // console.log(res.data);
            if (res.meta.status === 200) {
                commit('STE_USERLIST', res.data)
                commit('SET_LOADING', false)
                return res
            } else {
                commit('SET_LOADING', false)
                alert(res.meta.msg)
            };
        },
        // 发异步请求 添加用户
        async usersAdd({ commit }, data) {
            let res = await api.usersAdd(data)
            console.log(res);
            if (res.meta.status === 201) {
                Message({
                    message: res.meta.msg,
                    type: 'success'
                })
                return true
            } else {
                Message({
                    message: res.meta.msg,
                    type: 'error'
                })
                return false
            };
        },
        // 发异步请求 修改状态
        async usersAlter({ commit }, data) {
            let res = await api.usersAlter(data)
                // console.log(res);
            if (res.meta.status === 200) {
                Message({
                    message: res.meta.msg,
                    type: 'success'
                })
                return true
            } else {
                Message({
                    message: res.meta.msg,
                    type: 'error'
                })
                return false
            };
        },
        // 发异步请求 编辑用户
        async usersUp({ commit }, data) {
            let res = await api.usersUp(data)
            console.log(res);
            if (res.meta.status === 200) {
                Message({
                    message: res.meta.msg,
                    type: 'success'
                })
                return true
            } else {
                Message({
                    message: res.meta.msg,
                    type: 'error'
                })
                return false
            };
        },
        // 发异步请求  删除用户
        async usersDel({ commit }, data) {
            let res = await api.usersDel(data)
                // console.log(res);
            if (res.meta.status === 200) {
                Message({
                    message: res.meta.msg,
                    type: 'success'
                })
                return true
            } else {
                Message({
                    message: res.meta.msg,
                    type: 'error'
                })
                return false
            };
        },
        // 发异步请求  分配角色
        async usersAssign({ commit }, data) {
            let res = await api.usersAssign(data)
            console.log(res);
            if (res.meta.status === 200) {
                Message({
                    message: res.meta.msg,
                    type: 'success'
                })
                return true
            } else {
                Message({
                    message: res.meta.msg,
                    type: 'error'
                })
                return false
            };
        },
    }
}