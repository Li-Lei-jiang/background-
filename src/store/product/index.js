import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
export default {
    // 命名空间
    namespaced: true,
    state: {
        goodsList: {},
        categoriesList: [],
        paramsList: [],
        orderList: [],
        logistics: [],
        chart: {}
    },
    mutations: {
        ['STE_PRODUCTLIST'](state, data) {
            state.goodsList = data
        },
        ['STE_CATELIST'](state, data) {
            state.categoriesList = data
        },
        ['STE_PARAMSLIST'](state, data) {
            state.paramsList = data
        },
        ['STE_ORDERLIST'](state, data) {
            state.orderList = data
        },
        ['STE_LOGISTIC'](state, data) {
            state.logistics = data
        },
        ['STE_DATA'](state, data) {
            state.chart = data
        },
    },
    actions: {
        // 发异步请求 商品列表
        async goodsList({ commit }, { pagenum, pagesize, query }) {
            let res = await api.goodsList({ pagenum, pagesize, query })
                // console.log(res.data);
            if (res.meta.status === 200) {
                commit('STE_PRODUCTLIST', res.data)
                return res.data
            } else {
                alert(res.meta.msg)
            };
        },
        // 发异步请求 添加商品
        async goodsAdd({ commit }, data) {
            let res = await api.goodsAdd(data)
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
        // 发异步请求 商品分类列表
        async categoriesList({ commit }, data) {
            let res = await api.categoriesList(data)
            console.log(res.data.result);
            if (res.meta.status === 200) {
                commit('STE_CATELIST', res.data.result)
                return res.data.result
            } else {
                Message({
                    message: res.meta.msg,
                    type: 'error'
                })
                return false
            };
        },
        // 发异步请求  删除商品
        async goodsDel({ commit }, data) {
            let res = await api.goodsDel(data)
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
        // 发异步请求 参数列表
        async attributesList({ commit }, data) {
            let res = await api.attributesList(data)
                // console.log(res.data);
            if (res.meta.status === 200) {
                commit('STE_PARAMSLIST', res.data)
                return res.data
            } else {
                alert(res.meta.msg)
            };
        },
        // 发异步请求 添加参数
        async attributesAdd({ commit }, { id, attr_name, attr_sel }) {
            let res = await api.attributesAdd({ id, attr_name, attr_sel })
                // console.log(res);
            if (res.meta.status === 201) {
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
        // 发异步请求 编辑参数
        async attributesEdit({ commit }, data) {
            let res = await api.attributesEdit(data)
                // console.log(res);
            if (res.meta.status === 200) {
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
        // 发异步请求  删除参数
        async attributesDel({ commit }, data) {
            let res = await api.attributesDel(data)
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
        // 发异步请求 订单列表
        async ordersList({ commit }, data) {
            let res = await api.ordersList(data)
                // console.log(res.data);
            if (res.meta.status === 200) {
                commit('STE_ORDERLIST', res.data)
                return res.data
            } else {
                alert(res.meta.msg)
            };
        },
        // 发异步请求 物流
        async logisticsDesc({ commit }, data) {
            let res = await api.logisticsDesc(data)
                // console.log(res.data);
            commit('STE_LOGISTIC', res.data)
        },
        // 发异步请求 数据统计
        async chart({ commit }) {
            let res = await api.chart()
                // console.log(res.data);
            commit('STE_DATA', res.data)
            return res.data
        },
    }
}