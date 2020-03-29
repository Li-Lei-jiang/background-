<template>
  <div>
    <div class="slot-title">{{path}}</div>
    <div class="body">
      <el-card class="box-card">
        <div>
          <div class="top">
            <div class="input">
              <el-input v-model="input" placeholder="请输入搜索内容">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div class="button">
              <el-button type="primary" @click="add">添加商品</el-button>
            </div>
          </div>
          <div class="form">
            <el-table :data="goodsList" style="width: 100%">
              <el-table-column
                prop="order"
                label="#"
                align="center"
                type="index"
                :index="index"
                width="50px"
              ></el-table-column>
              <el-table-column prop="goods_name" label="商品名称" align="center" width="395px"></el-table-column>
              <el-table-column prop="goods_price" label="商品价格（元）" align="center" width="140px"></el-table-column>
              <el-table-column prop="goods_weight" label="商品重量" align="center" width="100px"></el-table-column>
              <el-table-column prop="upd_time" label="创建时间" align="center" width="180px"></el-table-column>
              <el-table-column prop="operation" label="操作" align="center" width="150px">
                <!-- <div class="icon"> -->
                <template scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    icon="el-icon-edit"
                    @click="edit(scope.row)"
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="clear(scope.row.goods_id)"
                  ></el-button>
                </template>
                <!-- </div> -->
              </el-table-column>
            </el-table>
          </div>
          <Page :goodstotal="total"></Page>
        </div>
      
      </el-card>
      <el-dialog title="编辑商品" :visible.sync="editLock">
        <el-form
          :model="goods"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品名称" prop="goods_name">
            <div style="width:400px">
              <el-input v-model="goods.goods_name"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="商品价格" prop="goods_price">
            <div style="width:400px">
              <el-input v-model="goods.goods_price"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="商品数量" prop="goods_number">
            <div style="width:400px">
              <el-input v-model="goods.goods_number"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="商品重量" prop="goods_weight">
            <div style="width:400px">
              <el-input v-model="goods.goods_weight"></el-input>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editLock = false">取 消</el-button>
          <el-button type="primary" @click="editCertain()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Page from "../../components/page/Page";
export default {
  data() {
    return {
      path: "",
      input: "",
      index: 1,
      pagenum: 1, //当前页
      pagesize: 10, //每页显示条数
      query: "", //查询参数
      editLock: false,
      goods:{},
      rules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    Page
  },
  methods: {
    goodsLists() {
      this.$store
        .dispatch("product/goodsList", {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.query
        })
        .then(res => {
          res.goods.map(item => {
            item.upd_time = this.$dayjs(item.upd_time).format(
              "YYYY-MM-DD  hh:mm:ss"
            );
          });
        });
    },
    add() {
      this.$router.push('addGoods')
      
    },
    
    edit(val) {
      this.editLock = true;
      this.goods = val;
    },
    editCertain() {
      this.editLock = false;
      this.$message({
        message: "编辑商品成功",
        type: "success"
      });
    },
    clear(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("product/goodsDel", id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.path = this.$router.app._router.history.current.meta.path.join(">");
    this.goodsLists();
   
  },
  watch: {},
  computed: {
    goodsList() {
      return this.$store.state.product.goodsList.goods;
    },
    total() {
      return this.$store.state.product.goodsList.total;
    }
  }
};
</script>
<style scoped lang='scss'>
.body {
  padding: 20px;
  .top {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    .input {
      width: 300px;
    }
    .button {
      margin-left: 20px;
    }
  }
  .icon {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
.add_top {
  margin-left: 120px;
  margin-bottom: 20px;
}
.card {
  width: 1050px;
  height: 455px;
}
.add-but {
  display: flex;
}
.left {
  height: 100%;
}
.alert {
  padding: 8px 16px;
  margin-bottom: 10px;
}
.classify {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding-right: 16px;
  display: inline-block;
  width: 106px;
  text-align: right;
}
</style>