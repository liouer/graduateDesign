<template>
  <div id="app">
    <h1>{{ todolistTitle }}</h1>
    <div style="">
      <el-row type="flex" class="row-bg" justify="center" align="middle">
        <el-col :span="6" style="text-align: right; margin-right: 20px">
          <el-checkbox v-model="allEvents.isSelect" @change="allSelect()">
          </el-checkbox>
        </el-col>
        <el-col :span="6">
          <el-input
            class="input_text"
            v-model="newEventText"
            placeholder="请输入代办事项"
          ></el-input>
        </el-col>
        <el-col :span="6" style="text-align: left; margin-left: 20px">
          <button @click="addEvent()" class="el-button el-button--default">
            新增
          </button>
          <button @click="delEvents()" class="el-button el-button--default">
            删除
          </button>
        </el-col>
      </el-row>
      <div class="">
      </div>

      <div class="">
        <ul>
          <li v-for="(item, index) in eventList" :key="item.id">
            <!-- 使用组件，并传参 -->
            <HelloWorld
              :index="index"
              :item="item"
              @delEvent="delEvent"
              @singleSelect="singleSelect"
              @handelEdit="edit"
            ></HelloWorld>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue"; //引入组件
export default {
  components: { HelloWorld }, //注册组件
  data() {
    return {
      todolistTitle: "TO DO LIST BY Liou",
      allEvents: {
        isSelect: false,
        text: " ",
      },
      newEventText: "",
      eventList: [
        {
          id: 1,
          isSelect: false,
          eventText: "吃饭",
        },
        {
          id: 2,
          isSelect: false,
          eventText: "睡觉",
        },
      ],
      newEventId: 3,
    };
  },
  methods: {
    edit(item) {
      console.log(item);
      let editText = prompt("请输入需要修改的内容：");
      if (editText != null && editText != "") {
        item.eventText = editText; //赋值回给原来的item
      }
    },
    // 新增按钮
    addEvent() {
      console.log("click add");
      if (this.newEventText == "") {
        alert("内容为空，请输入内容。");
      } else {
        this.eventList.push({
          id: this.newEventId++,
          eventText: this.newEventText,
          isSelect: false,
        }),
          console.dir(this.eventList);
        console.log(this.newEventId);
      }
    },
    // 删除单个按钮
    delEvent(index) {
      // alert(index);
      this.eventList.splice(index, 1);
      console.log(index);
    },
    //批量删除按钮
    delEvents() {
      //定义一个数组，存放原数组中没有被选中的元素
      let arr = [];
      //筛选元素组中没有被选中的元素然后push到新数组arr中
      for (let i = 0; i < this.eventList.length; i++) {
        if (!this.eventList[i].isSelect) {
          arr.push(this.eventList[i]);
        }
      }
      //将新的数组赋值给原数组
      this.eventList = arr;
    },
    // 全选复选框
    allSelect() {
      this.eventList.forEach((item) => {
        item.isSelect = this.allEvents.isSelect; //子复选框等于全选框的勾选状态
      });
    },
    my() {},
    // 单选复选框
    singleSelect() {
      //定义一个n来存储用户选了多少个复选框以作判断
      let n = 0; // eslint-disable-line no-unused-vars
      this.eventList.forEach((item, index) => {
        if (item.isSelect) {
          n++;
          console.log("index :>> ", index);
        }
      });
      //若用户在全选了，则全选的勾也打上
      if (n == this.eventList.length) {
        this.allEvents.isSelect = true;
      }
      //在全选过后不全选时，取消全选勾
      else {
        this.allEvents.isSelect = false;
      }
    },
  },
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
/* button {
  margin-right: 10px;
  padding: 5px 23px;
  border-radius: 3px;
} */
/* .input_text {
  width: 200px;
  margin: 0 10px;
  padding: 10px;
  outline: none; 
  border: 1px solid #9e9e9e; 
  font-size: 15px;
} */
/* .read_text {
  outline: none;
  border: none;
  text-decoration: underline;
  width: 20%;
  margin-right: 10px;
  padding: 10px;
  font-size: 16px;
} */
/* .head_btn {
  background: white;
  border: 1px solid #9e9e9e;
  outline: none; 
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
