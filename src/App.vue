<template>
  <div id="app">
    <!-- <el-header style="margin-bottom: 20px"> -->
      <router-link to="/PageA">页面A（登录表单）</router-link>
      <router-link to="/PageB">页面B</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from "@/components/HelloWorld.vue"; //引入组件
// import ListTable from "@/components/ListTable.vue"; //引入组件
export default {
  // components: { HelloWorld, ListTable }, //注册组件（即组件声明）
  data() {
    return {};
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background: gray; */
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
