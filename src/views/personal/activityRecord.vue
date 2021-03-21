<template>
  <div class="content">
    <div class="list_head">
      活动记录
    </div>
    <div class="list_body">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column width="55px"> </el-table-column>
        <el-table-column prop="title" label="活动标题"> </el-table-column>
        <el-table-column prop="one_type_name" label="活动类型">
        </el-table-column>
        <el-table-column prop="start_time" label="活动举办时间">
        </el-table-column>
        <el-table-column prop="organizers_name" label="举办方">
        </el-table-column>
        <el-table-column prop="college_name" label="举办学院">
        </el-table-column>
        <el-table-column prop="type_str" label="对象类型"> </el-table-column>
        <el-table-column width="55px"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { joinActivityList } from "@/api/api";
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.tableData = [];
      let res = await joinActivityList();
      console.log("res:", res);
      res.content.list_data.forEach(element => {
        this.tableData.push(element);
      });
      console.log("tableData:", this.tableData);
    }
  }
};
</script>

<style scoped>
.content {
  /* display: flex; */
  width: 98%;
  height: 95%;
  margin: 0 14px;
  position: absolute;
  top: 20px;
}
.list_head {
  background-color: #fff;
  /* border: 2px solid rgb(120, 128, 208); */
  /* width: 160px; */
  height: 45px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.list_body {
  background-color: #fff;
  height: 94%;
  box-shadow: 0 10px 10px #888;
}
</style>