import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global'
import './filters'
import api from './http/api'
import dayjs from 'dayjs'
import "nprogress/nprogress.css";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import echarts from 'echarts'
import ZkTable from 'vue-table-with-tree-grid'

Vue.use(ZkTable)
Vue.prototype.$echarts = echarts
Vue.use(mavonEditor)
Vue.prototype.$api = api
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    store,
    render: h => h(App),
    el: '#app',
    　　components: { App },
    　　template: '<App/>',
}).$mount('#app')