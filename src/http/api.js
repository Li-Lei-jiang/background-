import service from './index'

export default {
    //登陆
    login({ username, password }) {
        return service.post(`login`, {
            username,
            password
        })
    },
    //用户数据列表
    usersList({ query, pagenum, pagesize }) {
        return service.get(`users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //添加用户
    usersAdd({ username, password, email, mobile }) {
        return service.post(`users`, {
            username,
            password,
            email,
            mobile
        })
    },
    //修改用户状态
    usersAlter({ uId, type }) {
        return service.put(`users/${uId}/state/${type}`)
    },
    //根据 ID 查询用户信息
    usersSeek(id) {
        return service.get(`users/${id}`)
    },
    //编辑用户提交
    usersUp({ id, email, mobile }) {
        return service.put(`users/${id}`, {
            email,
            mobile
        })
    },
    //删除单个用户
    usersDel(id) {
        return service.delete(`users/${id}`)
    },
    //分配用户角色
    usersAssign({ id, rid }) {
        return service.put(`users/${id}/role`, {
            rid
        })
    },
    //所有权限列表
    rightsList(type) {
        return service.get(`/rights/${type}`)
    },
    //左侧菜单权限
    getMenus() {
        return service.get(`menus`)
    },
    //角色列表
    getRoles() {
        return service.get(`roles`)
    },
    //添加角色
    addRoles({ roleName, roleDesc }) {
        return service.post(`roles`, {
            roleName,
            roleDesc
        })
    },
    //根据 ID 查询角色
    seekRoles(id) {
        return service.get(`roles/${id}`)
    },
    //编辑提交角色
    putRoles({ id, roleName, roleDesc }) {
        return service.put(`roles/${id}`, {
            roleName,
            roleDesc
        })
    },
    //删除角色
    delRoles(id) {
        return service.delete(`roles/${id}`)
    },
    //角色授权
    roleAuthorization({ roleId, rids }) {
        return service.post(`roles/${roleId}/rights`, {
            rids
        })
    },
    //删除角色指定权限
    delRight({ roleId, rightId }) {
        return service.delete(`roles/${roleId}/rights/${rightId}`)
    },
    //商品分类数据列表
    categoriesList({ type, pagenum, pagesize }) {
        return service.get(`categories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //添加分类
    addCategories({ cat_pid, cat_name, cat_level }) {
        return service.post(`categories`, {
            cat_pid,
            cat_name,
            cat_level
        })
    },
    //根据 id 查询分类
    seekCategories(id) {
        return service.get(`categories/${id}`)
    },
    //编辑提交分类
    seekCategories({ id, cat_name }) {
        return service.put(`categories/${id}`, {
            cat_name
        })
    },
    //删除分类
    delCategories(id) {
        return service.delete(`categories/${id}`)
    },
    //参数列表
    attributesList({ id, sel }) {
        return service.get(`categories/${id}/attributes?sel=${sel}`)
    },
    //添加动态参数或者静态属性
    attributesAdd({ id, attr_name, attr_sel, attr_vals }) {
        return service.post(`categories/${id}/attributes`, {
            attr_name,
            attr_sel,
            attr_vals
        })
    },
    //删除参数
    attributesDel({ id, attrid }) {
        return service.delete(`categories/${id}/attributes/${attrid}`)
    },
    //根据 ID 查询参数
    attributesSeek({ id, attrid, attr_sel, attr_vals }) {
        return service.get(`categories/${id}/attributes/${attrid}?attr_sel=${attr_sel}&attr_vals=${attr_vals}`)
    },
    //编辑提交参数
    attributesEdit({ id, attrId, attr_name, attr_sel, attr_vals }) {
        return service.put(`categories/${id}/attributes/${attrId}`, {
            id,
            attr_name,
            attr_sel,
            attr_vals
        })
    },
    //商品列表数据
    goodsList({ query, pagenum, pagesize }) {
        return service.get(`goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //添加商品
    goodsAdd({ goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs }) {
        return service.post(`goods`, {
            goods_name,
            goods_cat,
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
            attrs
        })
    },
    //根据 ID 查询商品
    goodsSeek(id) {
        return service.get(`goods/:${id}`)
    },
    //编辑提交商品(只做效果,不提交接口)
    goodsPut({ id, goods_name, goods_cat, goods_price, goods_number, goods_weight, goods_introduce, pics, attrs }) {
        return service.post(`goods/${id}`, {
            goods_name,
            goods_cat,
            goods_price,
            goods_number,
            goods_weight,
            goods_introduce,
            pics,
            attrs
        })
    },
    //删除商品
    goodsDel(id) {
        return service.delete(`goods/${id}`)
    },
    //同步商品图片
    goodsPic({ id, pics }) {
        return service.put(`goods`, {
            id,
            pics
        })
    },
    //同步商品属性
    goodsAttributes(id) {
        return service.put(`goods`, {
            id
        })
    },
    //图片上传
    picUpload(file) {
        return service.post(`upload`, {
            file
        })
    },
    //订单数据列表
    // ordersList({ query, pagenum, pagesize, user_id, pay_status, is_send, order_fapiao_title, order_fapiao_company, order_fapiao_content, consignee_addr }) {
    //     return service.get(`orders?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}&user_id=${user_id}&pay_status=${pay_status}&is_send=${is_send}&order_fapiao_title=${order_fapiao_title}&order_fapiao_company=${order_fapiao_company}&order_fapiao_content=${order_fapiao_content}&consignee_addr=${consignee_addr}`)
    // },
    ordersList({ pagenum, pagesize }) {
        return service.get(`orders?pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //修改订单状态
    ordersAlter({ id, is_send, order_pay, order_price, order_number, pay_status }) {
        return service.put(`orders`, {
            id,
            is_send,
            order_pay,
            order_price,
            order_number,
            pay_status
        })
    },
    //查看订单详情
    ordersDesc(id) {
        return service.get(`orders/${id}`)
    },
    //修改地址

    //查看物流信息
    logisticsDesc(id) {
        return service.get(`kuaidi/${id}`)
    },
    //基于时间统计的折线图
    chart() {
        return service.get(`reports/type/1`)
    }
}