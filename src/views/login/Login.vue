<template>
  <div>
    <div class="bg">
      <div class="log">
        <h1 class="log-title">欢迎来到yolo后台管理系统</h1>
        <div class="log-content">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="请输入用户名" prop="username">
              <div style="width:400px"><el-input v-model="ruleForm.username"></el-input></div>
            </el-form-item>
            <el-form-item label="请输入密码" prop="password" show-password>
              <div style="width:400px"><el-input v-model="ruleForm.password"></el-input></div>
            </el-form-item>
          </el-form>
          <div class="text"> 特别提醒: 如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。</div>
          <div class="log-butn">
             <el-button type="primary" @click="login">立即登录</el-button>
          </div>
         {{usernames}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 12, message: "长度在 4 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    login(){
       this.$store.dispatch('user/login',this.ruleForm)
    }
  },
  mounted() {
    //  console.log(this.$store)
  },
  watch: {},
  computed: {
    usernames(){
      return this.$store.state.user.user.username
    }
  }
};
</script>

<style scoped lang='scss'>
.bg {
  background: url("../../assets/images/bg.jpg") no-repeat;
  position: absolute;
  top: 0;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-size: 100% 100%;
  background-position: center center;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .log {
    background: #fff;
    border: 1px solid#ebeef5;
    width: 635px;
    .log-title {
      text-align: center;
      border-bottom: 1px solid #d1d1d1;
      padding: 18px 0;
    }
    .log-content {
      padding: 18px;
    }
    .text{
      color: #303133
    }
    .log-butn{
      margin: 20px;
      display: flex;
      justify-content: center
    }
  }
}
</style>