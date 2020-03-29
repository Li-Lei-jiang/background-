<template>
  <div>
    <div class="slot-title">{{path}}</div>
    <div class="body">
      <el-card>
        <div class="table">
          <zk-table :data="categories" ref="table" 
 border stripe :columns="columns" index-text="#" :show-index="props.showIndex" :tree-type="props.treeType" 
        :is-fold="props.isFold" 
        :expand-type="props.expandType"
        :selection-type="props.selectionType"
>
            <!-- <el-table-column
              label="#"
              prop="index"
              align="center"
              type="index"
              :index="index"
              width="50px"
            ></el-table-column> -->
            <!-- <el-table-column label="分类名称" prop="cat_name" width="238px" align="center"> -->
              <template slot="category" scope="scope">
                <!-- <el-tree :data="categories" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
              </template>
            <!-- </el-table-column> -->
            <!-- <el-table-column label="是否有效" prop="authName" width="238px" align="center"> -->
              <template slot="authName" scope="scope">
                <div class="el-icon-success" style="color:skyblue" v-if="scope.row.cat_deleted===false"></div>
                <div class="el-icon-error" v-else></div>
              </template>
            <!-- </el-table-column> -->
            <!-- <el-table-column label="排序" prop="cat_level" width="238px" align="center"> -->
              <template slot="index" scope="scope">
                <el-tag v-if="scope.row.cat_level===0">一级</el-tag>
                <el-tag v-if="scope.row.cat_level===1" type="success">二级</el-tag>
                <el-tag v-if="scope.row.cat_level===2" type="warning">三级</el-tag>
              </template>
            <!-- </el-table-column> -->
            <!-- <el-table-column prop="operation" label="操作" align="center" width="240px"> -->
              <template slot="operate" scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="clear(scope)"></el-button>
              </template>
            <!-- </el-table-column> -->
          </zk-table>
        </div>
        <Page :total="total"></Page>
      </el-card>
    </div>
  </div>
</template>

<script>
import Page from "../../components/page/Page";
export default {
  data() {
    return {
      path: "",
      pagesize: 5,
      pagenum: 1,
      props: {
          showIndex: true,//是否显示数据索引
          treeType: true,//是否为树形表格
          isFold: true,//树形表格中父级是否默认折叠
          expandType: false,//是否为展开行类型表格（为 True 时，需要添加作用域插槽, 它可以获取到 row, rowIndex)
          selectionType: false,//是否显示间隔斑马纹
        },
      columns:[
        // {
        //         label: "#",
        //         prop: "index",
        //         minWidth: "50px"
        //     },
        {
                label:"分类名称",
                prop:"cat_name" ,
                width:"238px",
                  type: "template",
                template: "category",
            },
        {
                label:"是否有效", 
                prop:"cat_deleted", 
                width:"238px",
                  type: "template",
                template: "authName"
            },
        {
                label:"排序", prop:"cat_level", width:"238px",
                  type: "template",
                template: "index"
            },
        {
                prop:"operation", label:"操作",width:"238px",
                type: "template",
                template: "operate"
            },

      ]
    };
  },
  components: {
    Page
  },
  methods: {
    categoriesList() {
      this.$store.dispatch("product/categoriesList", {
        type: [1, 2, 3],
        pagesize: this.pagesize,
        pagenum: this.pagenum
      });
    },
    handleNodeClick(data) {
      console.log(data);
    }
  },
  mounted() {
    this.path = this.$router.app._router.history.current.meta.path.join(">");
    this.categoriesList();
  },
  watch: {},
  computed: {
    categories() {
      return this.$store.state.product.categoriesList;
    },
    total() {
      return this.$store.state.user.userList.total;
    }
  }
};
</script>

<style scoped lang='scss'>
</style>