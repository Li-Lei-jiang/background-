import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import role from './role'
import product from './product'
Vue.use(Vuex)

// 只放公共的状态
export default new Vuex.Store({
    state: {

    },
    mutations: {},
    actions: {},
    modules: {
        user,
        role,
        product
    }
})