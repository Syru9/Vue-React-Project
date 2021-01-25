<template>
  <div class="outer">
    <div class="box">
      <h1>小U商城后台管理</h1>
      <!-- 表单 -->
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username" class="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/utils/axios";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          // !调取接口
          const res = await login(this.loginForm).catch((err) =>
            console.log(err)
          );
          if (res.data.code === 200) {
            sessionStorage.setItem("login", JSON.stringify(res.data.list));
            this.$message.success(res.data.msg);
            this.$router.push("/index");
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.outer {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: #34495e;
  .box {
    background: #ecf0f1;
    width: 800px;
    height: 450px;
    position: relative;
    left: 50%;
    top: 50%;
    margin-left: -400px;
    margin-top: -225px;
    h1 {
      text-align: center;
      font-size: 26px;
      height: 100px;
      line-height: 100px;
    }
    .el-form {
      width: 80%;
      margin: 0 auto;
      .username,
      .password {
        height: 60px;
        line-height: 60px;
      }
      .btn {
        margin-left: 200px;
      }
    }
  }
}
</style>