<template>
  <div>
    <div class="slot-title">{{path}}</div>
    <div class="body">
      <el-card>
        <el-alert title="注意:只允许为第三级分类设置相关参数!" type="warning" show-icon :closable="false"></el-alert>
        <div class="inputs">
          <span class="classify">选择商品分类：</span>
          <el-cascader
            :options="categories"
            :props="props"
            clearable
            v-model="props.label"
            @change="choose"
          ></el-cascader>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="动态参数" name="first">
            <el-button type="primary" size="mini" @click="dialogVisible = true">添加参数</el-button>
            <div class="form">
              <el-table :data="params" style="width: 100%">
                <el-table-column
                  prop="order"
                  label="#"
                  align="center"
                  type="index"
                  :index="index"
                  width="50px"
                ></el-table-column>
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                    ></el-input>
                    <el-button
                      v-else
                      class="button-new-tag"
                      size="small"
                      @click="showInput"
                    >+ New Tag</el-button>
                  </template>
                </el-table-column>

                <el-table-column prop="attr_name" label="参数名称" align="center" width="455px"></el-table-column>
                <el-table-column prop="operation" label="操作" align="center" width="455px">
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
                      @click="clear(scope.row.attr_id)"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="静态属性" name="second">
            <el-button type="primary" size="mini" @click="dialogVisibles = true">添加属性</el-button>
            <div class="form">
              <el-table :data="params" style="width: 100%">
                <el-table-column
                  prop="order"
                  label="#"
                  align="center"
                  type="index"
                  :index="index"
                  width="50px"
                ></el-table-column>
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                    ></el-input>
                    <el-button
                      v-else
                      class="button-new-tag"
                      size="small"
                      @click="showInput"
                    >+ New Tag</el-button>
                  </template>
                </el-table-column>

                <el-table-column prop="attr_name" label="参数名称" align="center" width="455px"></el-table-column>
                <el-table-column prop="operation" label="操作" align="center" width="455px">
                  <template scope="scope">
                    <el-button
                      type="primary"
                      size="mini"
                      icon="el-icon-edit"
                      @click="editJ(scope.row)"
                    ></el-button>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      @click="clear(scope.row.attr_id)"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <el-dialog title="添加静态属性" :visible.sync="dialogVisible" width="30%">
        <el-form label-width="80px">
          <el-form-item label="动态参数" required>
            <el-input v-model="attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibles = false">取 消</el-button>
          <el-button type="primary" @click="only">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改静态属性" :visible.sync="editLock" width="30%">
        <el-form label-width="80px">
          <el-form-item label="动态参数" required>
            <el-input v-model="onlyP.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editLock = false">取 消</el-button>
          <el-button type="primary" @click="onlyEdit">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改动态参数" :visible.sync="editJLock" width="30%">
        <el-form label-width="80px">
          <el-form-item label="动态参数" required>
            <el-input v-model="manyP.attr_name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editLock = false">取 消</el-button>
          <el-button type="primary" @click="manyEdit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      goods_cat: "",
      props: { label: "cat_name", value: "cat_id" },
      pagesize: 1,
      pagenum: 5,
      activeName: "first",
      index: 1,
      id: "",
      dialogVisible: false,
      dialogVisibles:false,
      attr_name: "",
      onlyP: {},
      editLock: false,
      inputVisible: false,
      inputValue: "",
      manyP:'',
      editJLock: false,
    };
  },
  components: {},
  methods: {
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    attributesList(sel) {
      this.$store.dispatch("product/attributesList", {
        id: this.id,
        sel: sel
      });
    },
    categoriesList() {
      this.$store.dispatch("product/categoriesList", {
        type: [1, 2, 3],
        pagesize: this.pagesize,
        pagenum: this.pagenum
      });
    },
    add(sel) {
      this.$store
        .dispatch("product/attributesAdd", {
          id: this.id,
          attr_name: this.attr_name,
          attr_sel: sel
        })
        .then(res => {
          console.log(res);
          if (res.attr_sel === "only") {
            this.attributesList("only");
          }
          if (res.attr_sel === "many") {
            this.attributesList("many");
          }
        });
    },
    many() {
      this.dialogVisible = false;
      this.add("many");
    },
    only() {
      this.dialogVisibles = false;
      this.add("only");
    },
    choose(val) {
      // console.log(val);
      this.id = val[val.length - 1];
      // console.log(this.id);
      this.attributesList("many");
    },
    handleClick(tab, event) {
      // console.log(tab.label);
      if(tab.label==='动态参数'){
        this.attributesList("many");
      }
      if(tab.label==='静态属性'){
        this.attributesList("only");
      }
    },
    
    editJ(val) {
      this.manyP = val;
      this.editJLock = true;
      console.log(val);
    },
    manyEdit() {
      this.$store
        .dispatch("product/attributesEdit", {
          id: this.id,
          attrId: this.onlyP.attr_id,
          attr_name: this.onlyP.attr_name,
          attr_sel: "only"
        })
        .then(res => {
          if (res) {
            this.editJLock = false;
          }
        });
    },
    clear(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("product/attributesDel", {
            id: this.id,
            attrid: id
          });
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
    this.categoriesList();
  },
  watch: {},
  computed: {
    categories() {
      return this.$store.state.product.categoriesList;
    },
    params() {
      return this.$store.state.product.paramsList;
    }
  }
};
</script>

<style scoped lang='scss'>
.inputs {
  margin: 20px 0;
  .classify {
    margin-right: 5px;
  }
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>