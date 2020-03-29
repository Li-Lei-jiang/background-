<template>
  <div>
    <div class="slot-title">{{path}}</div>
    <div class="body">
      <el-card class="box-card">
        <div class="top">
          <div class="input">
            <el-input v-model="query" placeholder="请输入搜索内容">
              <el-button slot="append" icon="el-icon-search" @click="seek"></el-button>
            </el-input>
          </div>
          <div class="button">
            <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
          </div>
        </div>
        <div class="form">
          <el-table :data="adminList" style="width: 100%" border>
            <el-table-column
              prop="order"
              label="#"
              align="center"
              type="index"
              :index="index"
              width="100px"
            ></el-table-column>
            <el-table-column prop="username" label="姓名" align="center" width="160px"></el-table-column>
            <el-table-column prop="role_name" label="角色" align="center" width="160px"></el-table-column>
            <el-table-column prop="mobile" label="电话" align="center" width="160px"></el-table-column>
            <el-table-column prop="email" label="邮箱" align="center" width="160px"></el-table-column>

            <el-table-column prop="mg_state" label="状态" align="center" width="100px">
              <template scope="scope">
                <el-switch
                  :active-value="true"
                  v-model="scope.row.mg_state"
                  active-color="#409eff"
                  inactive-color="#ff4949"
                  @change="changeState(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" align="center" width="160px">
              <!-- <div class="icon"> -->
              <template scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="clear(scope.row.id)"
                ></el-button>
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                  @click="setting(scope.row)"
                ></el-button>
              </template>
              <!-- </div> -->
            </el-table-column>
          </el-table>
        </div>
        <Page :total="total"></Page>
      </el-card>

      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <div style="width:400px">
              <el-input v-model="ruleForm.username"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="密码" prop="password" show-password>
            <div style="width:400px">
              <el-input v-model="ruleForm.password"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <div style="width:400px">
              <el-input v-model="ruleForm.email"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <div style="width:400px">
              <el-input v-model="ruleForm.mobile"></el-input>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="编辑用户" :visible.sync="editLock">
        <el-form
          :model="user"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <div style="width:400px">
              <el-input v-model="user.username"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <div style="width:400px">
              <el-input v-model="user.email"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="电话" prop="mobile">
            <div style="width:400px">
              <el-input v-model="user.mobile"></el-input>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editLock = false">取 消</el-button>
          <el-button type="primary" @click="editCertain(user)">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="分配角色" :visible.sync="settingLock">
        <div>当前用户：{{user.username}}</div>
        <div style="margin:20px 0">当前角色：{{user.role_name}}</div>
        <el-select v-model="role_name" placeholder="请选择" @change="select">
          <el-option
            v-for="(item,index) in rights"
            :key="index"
            :label="item.roleName"
            :value="item"
          ></el-option>
        </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button @click="settingLock = false">取 消</el-button>
          <el-button type="primary" @click="roleCertain(user)">确 定</el-button>
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
      pagesize: 5, //每页显示条数
      query: "", //查询参数
      dialogFormVisible: false, //添加用户弹出层
      editLock: false, //编辑弹出层
      settingLock: false, //分配角色弹出层
      user: {},
      rid: "",
      role_name: "",
      rights: [
        { id: 47, roleName: "主管" },
        { id: 48, roleName: "普通员工" },
        { id: 49, roleName: "游客" },
        { id: 56, roleName: "管理员" },
        { id: 57, roleName: "超级管理员" }
      ],
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 12, message: "长度在 4 到 12 个字符", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机", trigger: "blur" }]
      }
    };
  },
  components: {
    Page
  },
  methods: {
    usersLists() {
      this.$store.dispatch("user/usersList", {
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      });
    },
    seek(){
     this.$store.dispatch("user/usersList", {
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        query: this.query
      });
    },
    add() {
      // 添加用户
      this.$store
        .dispatch("user/usersAdd", this.ruleForm)
        .then(res => {
          if (res) {
            this.dialogFormVisible = false;
            this.usersLists();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeState(val) {
      //改变状态
      this.$store.dispatch("user/usersAlter", {
        uId: val.id,
        type: val.mg_state
      });
    },
    edit(val) {
      this.editLock = true;
      this.user = val;
    },
    editCertain(user) {
      this.editLock = false;
      this.$store.dispatch("user/usersUp", {
        id: user.id,
        email: user.email,
        mobile: user.mobile
      });
    },
    clear(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("user/usersDel", id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    setting(val) {
      this.settingLock = true;
      this.user = val;
    },
    roleCertain(user) {
      this.settingLock = false;
      this.$store.dispatch("user/usersAssign", {
        id: user.id,
        rid: this.rid
      });
    },
    select(val) {
      console.log(val);
      this.rid = val.id;
      this.role_name = val.roleName;
    }
  },
  mounted() {
    this.path = this.$router.app._router.history.current.meta.path.join(">");
    this.usersLists();
  },
  watch: {},
  computed: {
    adminList() {
      console.log(this.$store.state.user, 111);
      return this.$store.state.user.userList.users;
    },
    total() {
      return this.$store.state.user.userList.total;
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
</style>