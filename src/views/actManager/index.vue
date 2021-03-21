<template>
  <div class="back_cont">
    <el-aside width="200px">
      <div style="background-color: #353152;font-weight: bold;">
        活动管理员工作台
      </div>
      <div>
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#1f1c38"
          text-color="#fff"
        >
          <el-submenu index="1">
            <template slot="title">
              活动管理
            </template>
            <el-menu-item index="1-1">德育活动</el-menu-item>
            <el-menu-item index="1-2">智育活动</el-menu-item>
            <el-menu-item index="1-3">文体活动</el-menu-item>
          </el-submenu>
          <el-menu-item index="2">申述处理</el-menu-item>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="userBox">
          <el-popover placement="bottom" width="150" trigger="hover">
            <div>
              <el-button
                class="header_btn"
                type="text"
                @click="getCollegeAdminInfo()"
                >账号信息
              </el-button>
              <el-button
                class="header_btn"
                type="text"
                @click="openModifyPassword"
                >修改密码
              </el-button>
              <el-button class="header_btn" type="text" @click="outlog"
                >退出账号
              </el-button>
            </div>
            <el-button slot="reference">Hello，{{ username }}</el-button>
          </el-popover>
        </div>
      </el-header>
      <el-main>
        <div class="bg_color"></div>
        <router-view></router-view>
      </el-main>
    </el-container>
    <div class="dialog">
      <el-dialog title="账号信息" :visible.sync="userInfoBox">
        <el-form :model="form">
          <el-form-item label="账号：" :label-width="formLabelWidth">
            <el-input
              readonly
              v-model="form.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="学院：" :label-width="formLabelWidth">
            <el-input
              readonly
              v-model="form.college_name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userInfoBox = false">关 闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCollegeAdminInfo, collegeAdminEditPasswordAction } from "@/api/api";
export default {
  data() {
    return {
      form: {},
      formLabelWidth: "170px",
      userInfoBox: false

      // activeIndex: "2"
    };
  },
  computed: {
    username() {
      return JSON.parse(localStorage.getItem("userInfo")).college_admin_data
        .username;
    }
  },
  mounted() {
    // getMsg(){
    // }
  },
  methods: {
    // 获取账号信息
    async getCollegeAdminInfo() {
      this.userInfoBox = true;
      let {
        college_admin_data: { college_admin_id }
      } = JSON.parse(localStorage.getItem("userInfo"));
      let data = { college_admin_id: college_admin_id };
      let res = await getCollegeAdminInfo(data);
      this.form = res.content.data;
      if (res.code === "200") {
        console.log("获取成功");
      }
    },
    handleSelect(key, keyPath) {
      console.log("key:", key, "keypath:", keyPath);
      switch (key) {
        case "1-1":
          this.$router.push({ path: "/actManager/moralityList" });
          break;
        case "1-2":
          this.$router.push({ path: "/actManager/intelligenceList" });
          break;
        case "1-3":
          this.$router.push({ path: "/actManager/sportsList" });
          break;
        case "2":
          this.$router.push({ path: "/actManager/handleList" });
          break;
        default:
          break;
      }
    },
    openModifyPassword() {
      this.$prompt("请输入新的密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: "邮箱格式不正确"
      })
        .then(async ({ value }) => {
          // 调用修改密码接口
          let data = { password: value };
          let res = await collegeAdminEditPasswordAction(data);
          console.log("res:", res);
          this.$message({
            type: "success",
            message: "修改成功"
          });
        })
        .catch(err => {
          console.log("err :>> ", err);
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    outlog() {
      // 清除token
      localStorage.removeItem("token");
      // 跳转到登录界面
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style scoped>
.userBox >>> .el-button:focus,
.el-button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #fff;
}
.header_btn {
  display: flex;
  font-size: 16px;
  /* margin-left: 20px; */
  margin: 0 auto;
  color: #413c69;
  border: none;
}
.userBox {
  display: flex;
  float: right;
}
.line {
  width: 15px;
  height: 25px;
  border-right: 1px solid;
  margin: auto;
  color: #646cc5;
}
.back_cont {
  display: flex;
  height: 100%;
}
.bg_color {
  height: 200px;
  background-color: #646cc5;
}
.el-header {
  height: 55px;
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
  justify-content: space-between;
  width: 98%;
}
.back_cont >>> .el-menu {
  width: 100%;
  border: 0px;
}
.el-main {
  position: relative;
  /* width: 100%; */
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
  padding: 0;
  border-top: solid 3px #e9eef3;
  /* background-image: linear-gradient(#646cc5, #d8d8ee); */
}
.el-aside {
  background-color: #413c69;
  color: #fff;
  text-align: center;
  line-height: 60px;
  height: 100%;
}

.el-menu-item {
  text-decoration: none;
  font-size: 16px;
}
.back_cont >>> .el-submenu__title {
  font-size: 16px;
  text-decoration: none;
}
.dialog >>> .el-dialog {
  width: 30%;
}
.dialog >>> .el-form-item__label {
  font-size: 16px;
}
.dialog >>> .el-input {
  display: block;
  width: 300px;
}
.dialog >>> .el-input__inner {
  border: 0px;
  font-size: 16px;
}
</style>