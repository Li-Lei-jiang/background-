import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Structrue from "../views/structrue/Structrue"; /*引入公共结构*/
Vue.use(VueRouter)

const routes = [
    // 登录
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("../views/login/Login")
    },
    // 首页 
    {
        path: "/",
        component: Structrue,
        children: [{
            path: "/",
            name: "home",
            component: Home,
            meta: {
                title: "首页",
                path: ["首页"]
            }
        }]
    },
    //用户管理
    {
        path: "/users",
        component: Structrue,
        meta: {
            title: "用户管理",
            path: ["首页", "用户管理"]
        },
        children: [{
            path: "users",
            name: "users",
            component: () =>
                import ("../views/users/Users.vue"),
            meta: {
                title: "用户列表",
                path: ["首页", "用户管理", "用户列表"]
            }
        }]
    },
    //权限管理
    {
        path: "/rights",
        component: Structrue,
        meta: {
            title: "权限管理",
            path: ["首页", "权限管理"]
        },
        children: [{
            path: "roles",
            name: "roles",
            component: () =>
                import ("../views/rights/Roles.vue"),
            meta: {
                title: "角色列表",
                path: ["首页", "权限管理", "角色列表"]
            }
        }, {
            path: "rights",
            name: "rights",
            component: () =>
                import ("../views/rights/rights.vue"),
            meta: {
                title: "权限列表",
                path: ["首页", "权限管理", "权限列表"]
            }
        }]
    },
    //商品管理
    {
        path: "/goods",
        component: Structrue,
        meta: {
            title: "商品管理",
            path: ["首页", "商品管理"]
        },
        children: [{
            path: "goods",
            name: "goods",
            component: () =>
                import ("../views/goods/Goods.vue"),
            meta: {
                title: "商品列表",
                path: ["首页", "商品管理", "商品列表"]
            }
        }, {
            path: "params",
            name: "params",
            component: () =>
                import ("../views/goods/Params.vue"),
            meta: {
                title: "分类参数",
                path: ["首页", "商品管理", "分类参数"]
            }
        }, {
            path: "categories",
            name: "categories",
            component: () =>
                import ("../views/goods/Categories.vue"),
            meta: {
                title: "商品分类",
                path: ["首页", "商品管理", "商品分类"]
            },

        }, {
            path: "addGoods",
            name: "addGoods",
            component: () =>
                import ("../views/goods/addGoods.vue"),
            meta: {
                title: "添加商品",
            },

        }, ]
    },
    //订单管理
    {
        path: "/orders",
        component: Structrue,
        meta: {
            title: "订单管理",
            path: ["首页", "订单管理"]
        },
        children: [{
            path: "orders",
            name: "orders",
            component: () =>
                import ("../views/orders/Orders.vue"),
            meta: {
                title: "订单列表",
                path: ["首页", "订单管理", "订单列表"]
            }
        }]
    },
    //数据统计
    {
        path: "/reports",
        component: Structrue,
        meta: {
            title: "数据统计",
            path: ["首页", "数据统计"]
        },
        children: [{
            path: "reports",
            name: "reports",
            component: () =>
                import ("../views/reports/Reports.vue"),
            meta: {
                title: "数据报表",
                path: ["首页", "数据统计", "数据报表"]
            }
        }]
    },

]

const isPro = process.env.NODE_ENV === 'production'


const router = new VueRouter({
    mode: isPro ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})

export default router