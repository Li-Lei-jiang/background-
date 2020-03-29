<template>
  <div>
    <div class="body">
      <el-card>
        <div class="card">
          <div class="add_top">
            <div class="alert">
              <el-alert title="商品信息 alert" type="info" :closable="false" show-icon center></el-alert>
            </div>
            <el-steps :active="active" finish-status="success">
              <el-step title="基本信息"></el-step>
              <el-step title="商品参数"></el-step>
              <el-step title="商品属性"></el-step>
              <el-step title="商品图片"></el-step>
              <el-step title="商品内容"></el-step>
              <el-step title="完成"></el-step>
            </el-steps>
          </div>
          <div class="add-but">
            <div class="left">
              <el-tabs tab-position="left" v-model="tab">
                <el-tab-pane label="基本信息">
                  <div class="form">
                    <el-form
                      :model="ruleForm"
                      ref="ruleForm"
                      label-width="120px"
                      class="demo-ruleForm"
                    >
                      <el-form-item label="商品名称" prop="goods_name" required>
                        <div style="width:760px">
                          <el-input v-model="ruleForm.goods_name"></el-input>
                        </div>
                      </el-form-item>
                      <el-form-item label="商品价格" prop="goods_price" required>
                        <div style="width:760px">
                          <el-input v-model="ruleForm.goods_price"></el-input>
                        </div>
                      </el-form-item>
                      <el-form-item label="商品数量" prop="goods_number" required>
                        <div style="width:760px">
                          <el-input v-model="ruleForm.goods_number"></el-input>
                        </div>
                      </el-form-item>
                      <el-form-item label="商品重量" prop="goods_weight" required>
                        <div style="width:760px">
                          <el-input v-model="ruleForm.goods_weight"></el-input>
                        </div>
                      </el-form-item>
                      <span class="classify">商品分类</span>
                      <el-cascader :options="categories" :props="props" clearable v-model='ruleForm.goods_cat' @change='choose'></el-cascader>
                    </el-form>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="商品参数"></el-tab-pane>
                <el-tab-pane label="商品属性">暂无属性</el-tab-pane>
                <el-tab-pane label="商品图片">
                  <div class="upload">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="https://jsonplaceholder.typicode.com/posts/"
                      multiple
                    >
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">
                        将文件拖到此处，或
                        <em>点击上传</em>
                      </div>
                      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="商品内容">
                  <mavon-editor v-model="ruleForm.goods_introduce"/>
                </el-tab-pane>
                <div v-if='active===4'>
                  <el-button
                  style="background-color: #67c23a;color:#fff;margin:12px"
                  @click="add"
                >提交</el-button>
                </div>
                <div v-else>
                  <el-button
                  style="background-color: #67c23a;color:#fff;margin:12px"
                  @click="next"
                >下一步</el-button>
                </div>
              </el-tabs>
            </div>
            <div class="right"></div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tab: "",
      props: { label: "cat_name",
      value:'cat_id' },
      pagesize: "",
      pagenum: "",
       query: "", //查询参数
      ruleForm: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: "",
        attrs: ""
      }
    };
  },
  components: {},
  methods: {
    categoriesList() {
      this.$store.dispatch("product/categoriesList", {
        type: [1, 2, 3],
        pagesize: this.pagesize,
        pagenum: this.pagenum
      });
    },
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
    next() {
      // if (this.active++ > 4) this.active = 0;
      this.active++
      this.tab = this.active.toString();
    },
    add(){
    // // 添加商品
    this.$store
      .dispatch("product/goodsAdd", this.ruleForm)
      .then(res => {
        if (res) {
          this.dialogFormVisible = false;
          this.goodsLists();
        }
      })
      .catch(err => {
        console.log(err);
      });
    },
    choose(val){
      console.log(val);
      this.ruleForm.goods_cat=val.join(',')
    }
  },
  mounted() {
    this.categoriesList();
  },
  watch: {},
  computed: {
    categories() {
      return this.$store.state.product.categoriesList;
    }
  }
};
</script>

<style scoped lang='scss'>
.body {
  padding: 20px;
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