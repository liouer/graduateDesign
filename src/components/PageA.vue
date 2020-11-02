<template>
  <div id="pageA">
    <el-form
      :model="loginForm"
      :rules="loginRules"
      label-width="100px"
      status-icon
      ref="loginForm"
    >
      <!-- .trim 处理空格，这里为禁止输入空格 -->
      <el-form-item label="用户名" prop="userName">
        <el-input
          style="width: 200px"
          v-model.trim="loginForm.userName"
          placeholder="请输入8-11个字符"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="userPwd">
        <el-input
          style="width: 200px"
          type="password"
          v-model.trim="loginForm.userPwd"
          aria-autocomplete="off"
          placeholder="请输入您的密码"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="isLogin()">登录</el-button>
        <el-button @click="restForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import func from "../../vue-temp/vue-editor-bridge";
export default {
  data() {
    // es5的用法
    // var validatePass = function (rule, value, callback) {
    //   if (/^[^@]*@[^@]*$/.test(value)) {
    //     callback();
    //   } else {
    //     callback(new Error("请按要求输入"));
    //   }
    // };
    var validatePass = (rule, value, callback) => {
      if (/^[^@]*@[^@]*$/.test(value)) {
        callback();
      } else {
        callback(new Error("请按要求输入"));
      }
    };
    return {
      loginForm: {
        userName: "",
        userPwd: "",
      },
      //规则
      // required:会否必填的符号   message：触发后没填弹出的msg  trigger：'blur'失去焦点时触发（用来配合msg触发后但没填弹出msg）
      //pattern:使用正则验证   [^adgk]:查找给定集合外的任何字符  ^[^a]*a[^a]*$限定只匹配一次
      loginRules: {
        userName: [
          { required: true, message: "请输入用户名" },
          { min: 8, max: 11, message: "请输入8-11个字符" },
        ],
        userPwd: [
          { required: true, message: "请输入密码" },
          { validator: validatePass },
        ],
      },
    };
  },
  methods: {
    isLogin() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    login() {
      return new Promise((resolve) => {
        console.warn("登录触发");
        setTimeout(() => {
          console.warn("登录成功");
          resolve({ userName: this.loginForm.userName });
        }, 3000);
      });
    },
    restForm(loginForm) {
      this.$refs[loginForm].resetFields();
    },
  },
};
</script>

<style scoped>
</style>