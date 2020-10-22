<template>
  <div class="hello">
    <label for="singleCheck"></label>
    <input class="read_text" v-model="item.eventText" readonly />
    <div style="display: inline">
      <button class="del_btn" @click="del(index)">删除</button>
      <button class="done_btn" >编辑</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
    }
  },
  // 获取参数：   参数名：数据类型
  props: {
    item: String,
    index: Number
  },
  methods:{
    // 删除单个按钮
    del(index) {
      
      this.$emit('delEvent',index)          //触发父组件的delEvent方法，并将index传过去
    },
  }
}
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
  width: 20%;
  margin-right: 10px;
  padding: 10px;
  font-size: 16px;
}
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
