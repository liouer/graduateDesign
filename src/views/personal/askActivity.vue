<template>
  <div class="content">
    <div class="list_head">
      <div style="margin-left:15px">
        申述记录
        <el-button style="margin-left:15px" size="mini" @click="getList()"
          >刷新</el-button
        >
      </div>
      <div style="float:right; margin-right:40px">
        <el-button size="small" type="primary" @click="showAskBox()"
          >发起申述</el-button
        >
      </div>
    </div>
    <div class="list_body">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column width="50px"> </el-table-column>
        <el-table-column
          prop="statement_id"
          label="申述ID"
          width="90px"
          sortable
        >
        </el-table-column>
        <el-table-column prop="title" label="活动标题" sortable>
        </el-table-column>
        <el-table-column
          prop="one_type_name"
          label="活动类型"
          width="150px"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="organizers_type_str"
          label="举办方类型"
          width="150px"
          sortable
        >
        </el-table-column>
        <el-table-column prop="organizers_name" label="举办方">
        </el-table-column>
        <el-table-column prop="start_time" label="活动举办时间" sortable>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left:5px">{{ scope.row.start_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="add_time" label="提交申述时间" sortable>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left:5px">{{ scope.row.add_time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status_str"
          label="申述状态"
          width="150px"
          sortable
        >
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button
              :disabled="tableData[scope.$index].status !== 0"
              type="danger"
              plain
              size="mini"
              @click="cancelAsk(scope.$index, tableData)"
              >取消申述</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="addAskDialog">
      <el-dialog title="提交活动申述" :visible.sync="askFormVisible">
        <el-form :model="form">
          <el-form-item label="活动标题" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动类型" :label-width="formLabelWidth">
            <el-radio v-model="form.one_type_id" :label="1">德育活动</el-radio>
            <el-radio v-model="form.one_type_id" :label="2">智育活动</el-radio>
            <el-radio v-model="form.one_type_id" :label="3">文体活动</el-radio>
          </el-form-item>
          <el-form-item label="活动举办时间" :label-width="formLabelWidth">
            <el-input
              placeholder="例如：2021-01-01"
              v-model="form.start_time"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="举办方类型" :label-width="formLabelWidth">
            <el-radio v-model="form.organizers_type" :label="3">院级</el-radio>
            <el-radio v-model="form.organizers_type" :label="2">校级</el-radio>
            <el-radio v-model="form.organizers_type" :label="1">校外</el-radio>
          </el-form-item>
          <el-form-item
            label="学院"
            :label-width="formLabelWidth"
            v-if="form.organizers_type === 3"
          >
            <el-select v-model="form.college_id" placeholder="请选择学院">
              <el-option
                v-for="item in colleges"
                :key="item.college_id"
                :label="item.name"
                :value="item.college_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="举办方" :label-width="formLabelWidth" v-else>
            <el-input
              v-model="form.organizers_name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="askFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="isAddAsk(form)">提 交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  submitStatementAction,
  getStatementList,
  getCollegeList,
  cancelStatementAction
} from "@/api/api";
export default {
  data() {
    return {
      tableData: [], //申述列表数据
      form: {}, // 提交申述表单数据
      askFormVisible: false, //提交申述框
      formLabelWidth: "120px", //编辑框宽度
      colleges: [{ college_id: 0, name: "华南理工大学广州学院" }] //获取学院列表
    };
  },
  mounted() {
    this.getList();
    this.selectColleges();
  },
  methods: {
    // 取消申述按钮
    async cancelAsk(index, row) {
      let data = {
        statement_id: row[index].statement_id
      };
      console.log("data :>> ", data);
      let res = await cancelStatementAction(data);
      if (res.code === "200") {
        this.$message({
          type: "success",
          message: "取消成功"
        });
        this.getList();
      } else {
        this.$message({
          type: "error",
          message: res.message
        });
      }
    },
    // 学院select框选择
    async selectColleges(val) {
      console.log("this.colleges :>> ", this.colleges);
      // 避免多次请求接口
      if (this.colleges.length > 1) {
        console.log("searchActParam.college :>> ", this.searchActParam.college);
        return;
      }
      let res = await getCollegeList();
      console.log("res.content.list_data :>> ", res.content.list_data);
      res.content.list_data.forEach(element => {
        this.colleges.push(element);
      });
    },
    // 点击提交申述按钮
    async isAddAsk() {
      let data = this.form;
      data.two_type_id = 1;
      console.log("data :>> ", data);
      // 如果是院级，则举办方自动赋值为学院名字
      if (data.college_id !== 0) {
        data.organizers_name = this.colleges.filter(
          val => val.college_id === data.college_id
        )[0].name;
      } else {
        data.college_id = 0;
      }
      let res = await submitStatementAction(data);
      if (res.code === "200") {
        this.$message({
          type: "success",
          message: "提交成功"
        });
        this.askFormVisible = false;
        this.getList();
      } else {
        this.$message({
          type: "error",
          message: res.message
        });
      }
    },
    // 提交申述框
    showAskBox() {
      Object.assign(this.$data.form, this.$options.data().form);
      this.askFormVisible = true;
    },
    // 获取申述列表
    async getList() {
      this.tableData = [];
      let res = await getStatementList();
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
.addAskDialog >>> .el-dialog {
  width: 30%;
}
/* .dialog >>> .el-select {
  display: block;
  width: 300px;
} */
.addAskDialog >>> .el-input {
  display: block;
  margin-left: 25px;
  width: 300px;
}
.addAskDialog >>> .el-form-item__content {
  width: 67%;
}
.addAskDialog >>> .el-radio {
  width: 80px;
}
</style>