<template>
  <div>
    <el-card shadow="hover" style="width: 400px; margin: 200px auto">
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
      <el-form-item style="float: right">
        <el-button type="primary" @click="submitForm('loginForm') "
          >提交</el-button
        >
        <el-button @click="resetForm('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </el-card>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      loginRules: {
        userName: [
          { required: true, message: "请输入账号" },
          { type: 'number', message: '账号必须为数字值' },
        ],
        password: [
          { required: true, message: "请输入密码" },
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style></style>
