<template>
  <div class="hello">
    <input
      type="checkbox"
      name=""
      id="singleCheck"
      v-model="item.isSelect"
      @change="sinSelect()"
    />
    <label for="singleCheck"></label>
    <input class="read_text" id="edit" v-model="item.eventText" readonly />
    <div style="display: inline">
      <button class="done_btn" @click="edit(item)">编辑</button>
      <button class="del_btn" @click="del(index)">删除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  // 获取参数：   参数名：数据类型
  props: {
    item: Object,
    index: Number,
  },
  methods: {
    // 删除单个按钮
    del(index) {
      this.$emit("delEvent", index); //触发父组件的delEvent方法，并将index传过去
    },
    sinSelect() {
      this.$emit("singleSelect");
    },
    edit(item) {
      console.log(item.id);
      let editText=prompt("请输入需要修改的内容：");
      if(editText != null && editText != ''){
        document.querySelector('#edit').innerHTML=editText;
        item.eventText = editText; //赋值回给原来的item
        console.log(item);
      }
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
.read_text {
  outline: none;
  border: none;
  text-decoration: underline;
  width: 30%;
  margin: 0 10px;
  padding: 10px;
  font-size: 16px;
}
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
.del_btn {
  color: white;
  background: #f76666;
  border: 1px solid #af9b9b;
}
/* .clean{
  clear: both;
} */
</style>
