<template>
  <div class="login_cont">
    <el-card class="login_card" shadow="hover">
      <div slot="header" class="clearfix">
        <span style="font-size: 28px;">用户登录</span>
      </div>
      <el-form
        status-icon
        :model="loginForm"
        ref="loginForm"
        class="demo-ruleForm"
        :rules="loginRules"
        label-width="50px"
      >
        <el-form-item label="账号" prop="userName">
          <el-input
            style="width: 100%"
            v-model.number="loginForm.userName"
            autocomplete="off"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input
            style="width: 100%"
            type="password"
            v-model.trim="loginForm.password"
            aria-autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="identity">
          <el-radio-group v-model="loginForm.identity">
            <el-radio :label="1">个人用户</el-radio>
            <el-radio :label="2">活动管理员</el-radio>
            <el-radio :label="3">系统管理员</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item style="float: right">
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { backLogin, activityLogin, userLogin } from "@/api/api.js";
export default {
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
        identity: 1
      },
      loginRules: {
        userName: [
          { required: true, message: "请输入账号" }
          // { type: "number", message: "账号必须为数字值" }
        ],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  methods: {
    submitForm(loginForm) {
      console.log("this.$router:", this.$router);
      this.$refs[loginForm].validate(async valid => {
        console.log("valid :>> ", valid);
        if (valid) {
          let res;
          switch (this.loginForm.identity) {
            case 1:
              // 请求个人用户登录接口
              // 跳转个人用户页面
              console.log("身份:", this.loginForm.identity);
              res = await userLogin({
                sno: this.loginForm.userName,
                password: this.loginForm.password
              });
              if (res.data.code === "200") {
                console.log("res:", res);
                localStorage.setItem("token", res.data.content.token);
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(res.data.content)
                );
                console.log("token:", localStorage.getItem("token"));
                this.$router.push({ path: "/personal/activityRecord" });
              } else {
                this.$message(res.data.message);
              }
              break;
            case 2:
              // 请求活动管理员登录接口
              // 跳转活动管理员页面
              console.log("身份:", this.loginForm.identity);
              res = await activityLogin({
                username: this.loginForm.userName,
                password: this.loginForm.password
              });
              if (res.data.code === "200") {
                console.log("res:", res);
                localStorage.setItem("token", res.data.content.token);
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(res.data.content)
                );
                console.log("token:", localStorage.getItem("token"));
                this.$router.push({ path: "/actManager/moralityList" });
              } else {
                this.$message(res.data.message);
              }
              break;
            case 3:
              // 请求系统管理员登录接口
              // 跳转系统管理员页面
              console.log("身份:", this.loginForm.identity);
              res = await backLogin({
                username: this.loginForm.userName,
                password: this.loginForm.password
              });
              if (res.data.code === "200") {
                console.log("res:", res);
                localStorage.setItem("token", res.data.content.token);
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(res.data.content)
                );
                console.log("token:", localStorage.getItem("token"));
                this.$router.push({ path: "/sysManager/sysAccountList" });
              } else {
                this.$message(res.data.message);
              }
              break;
            default:
              break;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(loginForm) {
      this.$refs[loginForm].resetFields();
    }
  }
};
</script>

<style>
.login_cont {
  display: flex;
  background: url(~@/assets/bg.png) no-repeat;
  height: 100%;
  width: 100%;
  background-size: 100%; /* 铺满 */
}
.login_card {
  width: 400px;
  margin: auto;
}
.el-radio__label {
  padding: 0;
}
</style>
