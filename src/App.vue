<template>
  <div id="app">
    <!-- <el-header style="margin-bottom: 20px"> -->
    <!-- <router-link to="/PageA">页面A（登录表单）</router-link>
      <router-link to="/PageB">页面B</router-link> -->
    <!-- <headerDiv v-if="logined"></headerDiv> -->
    <!-- 嵌套路由 router-view是用来渲染通过路由映射过来的组件，
         当路径发生变化时，router-view中的内容也会发生变化 -->
    <router-view></router-view>
    <!-- <footerDiv v-if="logined"></footerDiv> -->
  </div>
</template>

<script>
// import HelloWorld from "@/components/ListHead.vue"; //引入组件
// import ListTable from "@/components/ListTable.vue"; //引入组件
export default {
  // components: { HelloWorld, ListTable }, //注册组件（即组件声明）
  data() {
    return {};
  }
};
</script>

<style>
* {
  margin: 0;
  border: 0;
}
ul > li,
p {
  text-decoration: none;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
ul {
  padding: 0;
}
li {
  text-decoration: underline;
  list-style: none;
  margin-bottom: 5px;
}
</style>
