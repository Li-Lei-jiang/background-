<template>
  <div>
    <div class="slot-title">{{path}}</div>
    <div class="body">
      <el-card>
        <div class="top">
          <el-button type="primary" @click="dialogFormVisible = true">添加角色</el-button>
        </div>
        <div class="table">
          <el-table :data="role" style="width: 100%" border stripe>
            <el-table-column type="expand">
              <template slot-scope="props" v-if="props.row.children">
                <div class="tab">
                  <div v-for="(item,index) in props.row.children" :key="index" class="first">
                    <div class="firstTab">
                      <el-tag closable type>{{item.authName}}</el-tag>
                    </div>
                    <div v-if="item.children">
                      <div v-for="(item1,index1) in item.children" :key="index1" class="listone">
                        <el-tag closable type="success">{{item1.authName}}</el-tag>
                        <div>
                          <div v-if="item1.children" class="list">
                            <div
                              v-for="(item2,index2) in item1.children"
                              :key="index2"
                              class="listtwo"
                            >
                              <el-tag closable type="warning">{{item2.authName}}</el-tag>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="#" prop="index" align="center" type="index" :index="index"></el-table-column>
            <el-table-column label="职位" prop="roleName" width="280px" align="center"></el-table-column>
            <el-table-column label="描述" prop="roleDesc" width="280px" align="center"></el-table-column>
            <el-table-column label="操作" prop="operation" width="350px" align="center">
              <template scope="scope">
                <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="clear(scope.row.id)">删除</el-button>
                <el-button type="warning" size="mini" @click="sign(scope.row)">分配权限</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="400px">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名" prop="roleName">
            <div style="width:200px">
              <el-input v-model="ruleForm.roleName"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <div style="width:200px">
              <el-input v-model="ruleForm.roleDesc"></el-input>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑角色" :visible.sync="editLock" width="400px">
        <el-form
          :model="role_one"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="角色名" prop="roleName">
            <div style="width:200px">
              <el-input v-model="role.roleName"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <div style="width:200px">
              <el-input v-model="role.roleDesc"></el-input>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editLock = false">取 消</el-button>
          <el-button type="primary" @click="editCertain(role_one)">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="分配权限" :visible.sync="signLock" width="400px">
        <el-tree
          :data="right"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="defaultProps"
          :default-expanded-keys="checkList"
        ></el-tree>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      index: 1,
      role_one: {},
      dialogFormVisible: false,
      editLock: false, //编辑弹出层
      settingLock: false, //分配角色弹出层
      signLock: false,
      // id: "",
      defaultProps: {
        children: "children",
        label: "authName"
      },
      right: [],
      checkList: [],
      ruleForm: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [{ required: true, message: "请输入角色", trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    getRoles() {
      this.$store.dispatch("role/getRoles");
    },
    add() {
      this.$store
        .dispatch("role/addRoles", this.ruleForm)
        .then(res => {
          if (res) {
            this.dialogFormVisible = false;
            this.getRoles();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    edit(val) {
      console.log(val);
      this.editLock = true;
      this.role_one = val;
    },
    editCertain(val) {
      this.editLock = false;
      this.$store.dispatch("role/putRoles", {
        id: val.id,
        roleName: val.roleName,
        roleDesc: val.roleDesc
      });
    },
    clear(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("role/delRoles", id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    sign(val) {
      this.signLock = true;
      this.$store.dispatch("role/rightsList", "tree").then(res => {
        this.right = res;
        // this.id = val.id;
        console.log(res);
        this.checkList = [];
        if (val.children.length > 0) {
          val.children.map(item => {
            item.children.map(item1 => {
              item1.children.map(item2 => {
                this.checkList.push(item2.id);
              });
            });
          });
        }
      });
      // console.log(val);
      console.log(this.checkList);
    }
  },
  mounted() {
    this.path = this.$router.app._router.history.current.meta.path.join(">");
    this.getRoles();
  },
  watch: {},
  computed: {
    role() {
      return this.$store.state.role.role;
    }
  }
};
</script>

<style scoped lang='scss'>
.body {
  padding: 20px;
  .top {
    margin-bottom: 20px;
  }
  .button {
    display: flex;
    justify-content: space-around;
  }
}
.tab {
  margin: 10px;
}
.listone {
  margin: 0 20px;
  display: flex;
}
.first {
  display: flex;
}
.listtwo {
  margin: 0 20px 20px 20px;
  display: flex;
}
.list {
  display: flex;
  flex-wrap: wrap;
}
</style>