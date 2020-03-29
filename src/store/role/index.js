import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    // 命名空间
    namespaced: true,
    state: {
        role: [],
        right: []
    },
    mutations: {
        ['SET_ROLE'](state, data) {
            state.role = data
        },
        ['SET_RIGHT'](state, data) {
            state.right = data
        }
    },
    actions: {
        // 发异步请求 获取角色列表
        async getRoles({ commit }) {
            let res = await api.getRoles()
                // console.log(res.data);
            if (res.meta.status === 200) {
                let role = res.data
                commit('SET_ROLE', role)
                console.log(role);
            } else {
                alert(res.meta.msg)
            };
        },
        // 发异步请求 添加角色
        async addRoles({ commit }, data) {
            let res = await api.addRoles(data)
                // console.log(res);
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
        // 发异步请求 编辑角色
        async putRoles({ commit }, data) {
            let res = await api.putRoles(data)
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
        // 发异步请求  删除角色
        async delRoles({ commit }, data) {
            let res = await api.delRoles(data)
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
        // 发异步请求 权限列表
        async rightsList({ commit }, data) {
            let res = await api.rightsList(data)
                // console.log(res);
            if (res.meta.status === 200) {
                let right = res.data
                commit('SET_RIGHT', right)
                Message({
                    message: res.meta.msg,
                    type: 'success'
                })
                return res.data
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