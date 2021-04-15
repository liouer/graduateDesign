<template>
  <div class="back_cont">
    <el-aside width="200px">
      <div style="background-color: #353152;font-weight: bold;">
        账号管理员工作台
      </div>
      <div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#1f1c38"
          text-color="#fff"
          active-text-color=""
          style="width:100%"
        >
          <el-submenu index="1">
            <template slot="title">
              个人用户账号
            </template>
            <el-menu-item index="1-1">学生账号</el-menu-item>
            <el-menu-item index="1-2">教职工账号</el-menu-item>
          </el-submenu>
          <el-menu-item index="2">管理员账号</el-menu-item>
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
                @click="openModifyPassword"
                >修改密码</el-button
              >
              <el-button class="header_btn" type="text" @click="outlog"
                >退出账号</el-button
              >
            </div>
            <el-button slot="reference">Hello, {{ username }}</el-button>
          </el-popover>
        </div>
      </el-header>
      <el-main>
        <div class="bg_color"></div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { editBackAdminPasswordAction } from "@/api/api";
export default {
  data() {
    return {
      // activeIndex: "2"
    };
  },
  computed: {
    username() {
      return JSON.parse(localStorage.getItem("userInfo")).back_admin_data
        .username;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log("key:", key, "keypath:", keyPath);
      switch (key) {
        case "1-1":
          this.$router.push({ path: "/sysManager/stuAccountList" });
          break;
        case "1-2":
          this.$router.push({ path: "/sysManager/teaAccountList" });
          break;
        case "2":
          this.$router.push({ path: "/sysManager/sysAccountList" });
          break;
        default:
          break;
      }
    },
    openModifyPassword() {
      this.$prompt("请输入新的密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async ({ value }) => {
          // 调用修改密码接口
          console.log(
            'JSON.parse(localStorage.getItem("userInfo")) :>> ',
            JSON.parse(localStorage.getItem("userInfo"))
          );
          let {
            back_admin_data: { back_admin_id }
          } = JSON.parse(localStorage.getItem("userInfo"));
          let data = { back_admin_id: back_admin_id, password: value };
          let res = await editBackAdminPasswordAction(data);
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
.el-menu {
  border-right: 0;
}
.el-menu-item {
  text-decoration: none;
  font-size: 16px;
}
.back_cont >>> .el-submenu__title {
  font-size: 16px;
  text-decoration: none;
}
</style>