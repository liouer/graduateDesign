<template>
  <div class="listTable">
    <el-row type="flex" justify="center">
      <el-col :span="3"></el-col>
      <el-col>
        <el-table :data="eventList" border style="width: 50%; margin: 0 auto">
          <el-table-column
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column prop="eventText" label="待办事项"></el-table-column>
          <el-table-column
            prop="creatTime"
            label="创建时间"
            :formatter="formatterDate"
            width="120"
          ></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">   <!-- 相当于table的prop绑定数据属性，这里是获取这一片单元数据包含row,column,#index,sotre -->
              <el-button size="mini" @click="edit(scope.row)">更改</el-button>
              <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <!-- <el-col :span="4"></el-col> -->
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ListTable",
  data() {
    return {};
  },
  props: {
    eventList: Array,
  },
  methods: {
    //格式化时间输出
    formatterDate(row) {
      //判空
      if (row == null || row == "") {
        return "";
      }
      // 获取当前单元格的数据，然后进行字符串操作，再输出。
      //   console.log("row :>> ", row.creatTime);
      //   let time = row.creatTime;
      //   let M = time.substr(5, 2);
      //   let D = time.substr(8, 2);
      //   return M + "-" + D;
      return `${new Date(row.creatTime).getMonth() + 1} 月 ${new Date(
        row.creatTime
      ).getDate()} 日`;
    },
    //调用父级的编辑方法
    edit(row) {
      this.$emit("handelEdit", row);
    },
    //调用父级的删除方法
    del(row) {
      this.$emit("delEvent", row);
    },
  },
};
</script>
