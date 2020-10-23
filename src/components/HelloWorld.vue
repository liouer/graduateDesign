<template>
  <div class="hello">
    <el-row type="flex" class="row-bg" justify="center" align="middle">
      <el-col :span="6" style="text-align: right; margin-right: 20px">
        <el-checkbox v-model="item.isSelect" @change="sinSelect()" >
        </el-checkbox>
      </el-col>
      <el-col :span="6">
        <el-input
          class="read_text"
          v-model="item.eventText"
          readonly
        ></el-input>
      </el-col>
      <el-col :span="6" style="text-align: left; margin-left: 20px">
        <el-button class="el-button el-button--default" @click="edit(item)">更改</el-button>
        <el-button class="el-button el-button--danger" @click="del(index)">删除</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  // 获取父组件参数：   参数名：数据类型
  props: {
    item: Object,
    index: Number,
  },
  methods: {
    // 删除单个按钮
    del(index) {
      // this.$emit("delEvent", index); //触发父组件的delEvent方法，并将index传过去
      this.$parent.delEvent(index); //在这个子组件中直接调用父组件的方法，结果与上面一行的代码一样
    },
    sinSelect() {
      this.$emit("singleSelect");
    },
    edit(item) {
      this.$emit("handelEdit", item);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .input_text {
  width: 20%;
  margin-right: 10px;
  padding: 7px;
  outline: none;
  border: 1px solid #9e9e9e;
} */
/* .read_text {
  outline: none;
  border: none;
  text-decoration: underline;
  width: 30%;
  margin: 0 10px;
  padding: 10px;
  font-size: 16px;
} */
/* .edit_text {
  outline: none;
  border: 1px solid #9e9e9e;
  width: 30%;
  margin: 0 10px;
  padding: 10px;
  font-size: 16px;
} */
/* .head_btn {
  background: white;
  border: 1px solid #9e9e9e;
} */
/* .del_btn {
  color: white;
  background: #f76666;
  border: 1px solid #af9b9b;
} */
/* .clean{
  clear: both;
} */
</style>
