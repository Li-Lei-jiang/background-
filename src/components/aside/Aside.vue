<template>
<div>
   <el-menu
          class="el-menu-vertical-demo"
          @select="selectMenu"
          :default-active="$route.path"
          router
          unique-opened
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu :index="item.key" v-for="(item,index) in menu" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="children.key"
              v-for="(children,index1) in item.children"
              :key="index1"
            >
              <template slot="title">
                <i :class="children.icon"></i>
                <span>{{children.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
</div>
  
</template>

<script>
export default {
  name: "Aside",
  components: {},
  props: {},
  data() {
    return {
      menu: [],
      list: [
        { name: "用户管理", icon: "el-icon-user" },
        { name: "用户列表", icon: "el-icon-folder-opened" },
        { name: "权限管理", icon: "el-icon-folder" },
        { name: "角色列表", icon: "el-icon-setting" },
        { name: "权限列表", icon: "el-icon-c-scale-to-original" },
        { name: "商品管理", icon: "el-icon-goods" },
        { name: "商品列表", icon: "el-icon-tickets" },
        { name: "分类参数", icon: "el-icon-bell" },
        { name: "商品分类", icon: "el-icon-date" },
        { name: "订单管理", icon: "el-icon-s-order" },
        { name: "订单列表", icon: "el-icon-document" },
        { name: "数据统计", icon: "el-icon-data-analysis" },
        { name: "数据报表", icon: "el-icon-pie-chart" }
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.state.path = vm.$router.currentRoute.meta.path;
    });
  },
  methods: {
    getMenu() {
      this.$api
        .getMenus()
        .then(res => {
          // console.log(res);
          res.data.map(item => {
            this.$set(item, "key", `/${item.path}`);
            this.list.map(one => {
              if (item.authName === one.name) {
                this.$set(item, "icon", one.icon);
              }
            });
            item.children.map(children => {
              this.$set(children, "key", `/${item.path}/${children.path}`);
              this.list.map(one => {
                if (children.authName === one.name) {
                  this.$set(children, "icon", one.icon);
                }
              });
            });
          });
          this.menu = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectMenu(key, keyPath) {
      // console.log(key, keyPath);
      this.$router.push(key);
    }
  },

  mounted() {
    this.getMenu()
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.tac {
  position: fixed;
  margin-top: 60px;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
}
.el-menu-vertical-demo {
  height: 100%;
}
.el-col-24 {
  height: 100%;
}
</style>