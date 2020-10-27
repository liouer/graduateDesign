<template>
  <div id="pageB">
    <el-header style="margin-bottom: 20px">
      <h1>{{ todolistTitle }}</h1>

      <el-row type="flex" align="middle">
        <el-col :span="8" style="text-align: right; margin-right: 20px">
          <el-checkbox
            v-model="allEvents.isSelect"
            @change="allSelect()"
          ></el-checkbox>
        </el-col>
        <el-col :span="8">
          <el-input
            class="input_text"
            v-model.trim="newEventText"
            placeholder="请输入待办事项"
            v-on:keyup.enter.native="addEvent"
          ></el-input>
        </el-col>
        <el-col :span="8" style="text-align: left; margin-left: 20px">
          <button @click="addEvent" class="el-button el-button--default">
            新增
          </button>
          <button @click="delEvents" class="el-button el-button--default">
            删除
          </button>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="margin-bottom: 10px">
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
    </el-main>
    <el-footer>
      <ListTable
        :eventList="eventList"
        @handelEdit="edit"
        @delEvent="delEvent"
      ></ListTable>
    </el-footer>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue"; //引入组件
import ListTable from "@/components/ListTable.vue"; //引入组件
export default {
  components: { HelloWorld, ListTable }, //注册组件（即组件声明）
  data() {
    return {
      todolistTitle: "TO DO LIST BY Liou",
      allEvents: {
        isSelect: false,
        text: " ",
      },
      newEventText: "",
      eventList: [], //id,eventText,isSelect,creatTime
      newEventId: "",
    };
  },
  methods: {
    // 更改按钮
    async edit(item) {
      console.log(item);
      // let editText = prompt("请输入需要修改的内容：");
      // if (editText != null && editText != "") {
      //   item.eventText = editText; //赋值回给原来的item
      // }

      /** 写法一
      //使用elementUI弹窗
      this.$prompt('请输入修改的内容', '修改', {
        // inputValidator: isEditNull(value),
        //判空
        inputValidator: (value) =>{
          if (value === null || value === "") {
            return false;
          }
        },
        inputErrorMessage: '修改内容不能为空'
      }).then(({ value }) => {
        item.eventText = value;
        this.$message({
          type: 'success',
          message: '修改成功',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      }); 
      */

      /**
      
     需求：

     let a = ?
     if(a){
       post(接口a)
     }
     post(接口b)

    #1

    let F = true
    if(F){
      post(a).then((resA)=>{
        post(b,参数：resA.xx).then((res)=>{

        })
      })
     return
    }
    post(b).then((res)=>{

    })
    

    #2

    let resA = ''
    if(F){
      resA = await post(a)
    }
    await post(b,F ？ 参数：resA ：'')


     */

      //使用elementUI弹窗
      let value = await this.$prompt("请输入修改的内容", "修改", {
        inputValidator: (value) => {
          if (value === null || value === "") {
            return false;
          }
        },
        inputErrorMessage: "修改内容不能为空",
      }).catch((err) => {
        console.log("err :>> ", err);
      });

      if (value) {
        console.log("value :>> ", value);
        item.eventText = value.value;

        this.$message({
          type: "success",
          message: "修改成功",
        });
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
          creatTime: new Date().toLocaleDateString(),
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
    // 批量删除按钮
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
#pageB {
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
