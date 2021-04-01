<template>
  <div class="content">
    <div class="list_head">
      <div style="margin-left:15px">
        申述记录
        <el-button style="margin-left:15px" size="mini" @click="getList()"
          >刷新</el-button
        >
      </div>
    </div>
    <div>
      <el-select
        style="background-color:#fff; float:right; width:150px; margin-right:65px"
        size="small"
        v-model="search_status"
        placeholder="请选择申述状态"
        @change="getList()"
      >
        <el-option
          v-for="item in searchStatus"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="list_body">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column width="30px"> </el-table-column>
        <el-table-column
          sortable
          prop="statement_id"
          label="申述ID"
          width="100px"
        >
        </el-table-column>
        <el-table-column sortable prop="title" label="活动标题">
        </el-table-column>
        <el-table-column sortable prop="one_type_name" label="活动类型">
        </el-table-column>
        <el-table-column sortable prop="organizers_type_str" label="举办方类型">
        </el-table-column>
        <el-table-column sortable prop="organizers_name" label="举办方">
        </el-table-column>
        <el-table-column sortable prop="start_time" label="活动举办时间">
        </el-table-column>
        <el-table-column sortable prop="add_time" label="提交申述时间">
        </el-table-column>
        <el-table-column sortable prop="status_str" label="申述状态">
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button
              :disabled="tableData[scope.$index].status !== 0"
              type="success"
              plain
              size="mini"
              @click="handleBtn(1, scope.$index, tableData)"
              >通 过
            </el-button>
            <el-button
              :disabled="tableData[scope.$index].status !== 0"
              plain
              type="danger"
              size="mini"
              @click="handleBtn(0, scope.$index, tableData)"
              >不通过
            </el-button>
          </template>
        </el-table-column>
        <el-table-column width="20px"> </el-table-column>
      </el-table>
    </div>
    <div class="addAskDialog">
      <el-dialog title="请选择通过的活动" :visible.sync="selectActBox">
        <el-form>
          <el-form-item label="活动标题" :label-width="formLabelWidth">
            <el-input
              v-model="form.search_title"
              placeholder="请输入活动标题"
            ></el-input>
            <el-button style="margin-left:15px" @click="searchBtn()"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
        <div>
          <el-table
            class="list_table"
            stripe
            :data="activities"
            tooltip-effect="dark"
            height="85%"
          >
            <el-table-column prop="title" label="活动标题"> </el-table-column>
            <el-table-column prop="one_type_name" label="活动类型">
            </el-table-column>
            <el-table-column prop="start_time" label="活动举办时间">
            </el-table-column>
            <el-table-column prop="organizers_name" label="举办方">
            </el-table-column>
            <el-table-column prop="type_str" label="对象类型">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="success"
                  size="mini"
                  @click="passBtn(scope.$index, activities)"
                  >选择</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getCollegeList,
  getCollegeStatementList,
  handleJoinStatementAction,
  getActivityList
} from "@/api/api";
export default {
  data() {
    return {
      searchStatus: [
        { label: "全部", value: "" },
        { label: "申述中", value: "0" },
        { label: "已通过", value: "1" },
        { label: "已拒绝", value: "2" },
        { label: "已取消", value: "3" }
      ],
      search_status: "", //申述状态：0申述中，1已通过，2已拒绝，3已取消
      statement_id: 0, //选择的申述id
      status: 0, //选择的申述状态
      activities: [], //申述活动归属列表选择
      selectActBox: false,
      tableData: [], //申述列表数据
      form: {}, // 申述通过表单数据
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
    async passBtn(index, row) {
      console.log("row[index] :>> ", row[index]);
      let data = {
        statement_id: this.statement_id,
        status: this.status,
        activity_id: row[index].activity_id
      };
      let res = await handleJoinStatementAction(data);
      if (res.code === "200") {
        this.selectActBox = false;
        this.$message({
          type: "success",
          message: "添加成功"
        });
      }
    },
    async searchBtn() {
      this.activities = [];
      //搜索活动，选择通过的活动
      let search_data = {
        search_title: this.form.search_title,
        search_organizers_name: JSON.parse(localStorage.getItem("userInfo"))
          .college_admin_data.college_name
      };
      //查找活动接口
      let res = await getActivityList(search_data);
      this.activities = res.content.list_data;
      console.log("res :>> ", res);
    },
    // 申述操作按钮逻辑控制
    async handleBtn(type, index, row) {
      // 如果申请通过
      if (type === 1) {
        this.status = type;
        this.statement_id = row[index].statement_id;
        // 弹出活动选择框
        this.selectActBox = true;
      } else {
        let data = {
          statement_id: row[index].statement_id,
          status: 2
        };
        let res = await handleJoinStatementAction(data);
        if (res.code === "200") {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          this.getList();
        }
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
    // 获取申述列表
    async getList() {
      this.tableData = [];
      let data = {
        search_status: this.search_status
      };
      let res = await getCollegeStatementList(data);
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
  width: 50%;
  max-height: 80%;
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
  display: flex;
}
.addAskDialog >>> .el-radio {
  width: 80px;
}
</style>