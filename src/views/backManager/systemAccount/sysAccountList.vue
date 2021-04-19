<template>
  <div class="listCont">
    <div class="listBox">
      <div class="table_title">
        活动管理员账号
        <el-button plain class="fresh_btn" size="small" @click="freshActList()"
          >刷新</el-button
        >
      </div>
      <div class="tableTab">
        <div class="table_title_btn">
          <el-button type="primary" plain size="medium" @click="addCount(1)"
            >添加账号</el-button
          >
        </div>
        <div class="search_box">
          <div class="search_select">
            <el-select
              v-model="searchActParam.college_id"
              placeholder="请选择学院"
              size="small"
              @click.native="selectColleges(searchActParam.college_id)"
            >
              <el-option
                v-for="item in colleges"
                :key="item.college_id"
                :label="item.name"
                :value="item.college_id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="search_input">
            <el-input
              size="small"
              v-model="searchActParam.username"
              placeholder="请输入账号"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                style="width:80px"
                @click="searchActBtn()"
                >搜索</el-button
              >
            </el-input>
          </div>
        </div>
      </div>
      <el-table
        class="list_table"
        stripe
        ref="multipleTable1"
        :data="tableData1"
        tooltip-effect="dark"
        height="85%"
        @selection-change="handleSelectionChange1"
      >
        <!-- <el-table-column type="selection" width="55px"> </el-table-column> -->
        <el-table-column width="55px"> </el-table-column>
        <el-table-column prop="username" label="账号" width="120px" sortable>
        </el-table-column>
        <el-table-column prop="college_name" label="学院" sortable>
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="添加时间"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, tableData1)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="handleDelete1(scope.$index, tableData1)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <el-table-column width="30px"> </el-table-column>
      </el-table>
      <div style="text-align:right; margin:10px 20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="tableData_count1"
          :page-size="30"
          @current-change="changePage1"
          style="padding: 10px 30px;"
        >
        </el-pagination>
      </div>
    </div>
    <div class="listBox">
      <div class="table_title">
        账号管理员账号
        <el-button plain class="fresh_btn" size="small" @click="freshSysList()"
          >刷新</el-button
        >
      </div>
      <div class="tableTab">
        <div class="table_title_btn">
          <el-button type="primary" plain size="medium" @click="addCount(2)"
            >添加账号</el-button
          >
        </div>
        <div class="search_box" style="margin-right:15px">
          <el-input
            size="small"
            v-model="searchSysParam.username"
            placeholder="请输入账号"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchSysBtn()"
              >搜索</el-button
            >
          </el-input>
        </div>
      </div>
      <el-table
        class="list_table"
        stripe
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        height="85%"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55px"> </el-table-column> -->
        <el-table-column width="55px"> </el-table-column>
        <el-table-column prop="username" label="账号" sortable>
        </el-table-column>
        <el-table-column
          prop="add_time"
          label="添加时间"
          sortable
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, tableData)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="handleDelete(scope.$index, tableData)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <el-table-column width="30px"> </el-table-column>
      </el-table>
      <div style="text-align:right; margin:10px 20px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="tableData_count"
          :page-size="30"
          @current-change="changePage"
          style="padding: 10px 30px;"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 修改账号内容弹窗 -->
    <el-dialog title="编辑账号内容" :visible.sync="dialogFormVisible">
      <el-form :model="editorDetail">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input
            v-model="editorDetail.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="学院"
          :label-width="formLabelWidth"
          v-if="editorDetail.college_name"
        >
          <el-select v-model="editorDetail.college_id" placeholder="请选择学院">
            <el-option
              v-for="item in colleges"
              :key="item.college_id"
              :label="item.name"
              :value="item.college_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          v-if="editorDetail.college_name"
          type="primary"
          @click="editCollegeAdminAction(editorDetail)"
          >确 定</el-button
        >
        <el-button
          v-else
          type="primary"
          @click="editBackAdminAction(editorDetail)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 添加账号弹窗 -->
    <el-dialog title="添加账号" :visible.sync="dialogFormVisible1">
      <el-form :model="addDetail">
        <el-form-item label="账号" :label-width="formLabelWidth">
          <el-input v-model="addDetail.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="addDetail.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学院" :label-width="formLabelWidth" v-if="isAct">
          <el-select v-model="addDetail.college_id" placeholder="请选择学院">
            <el-option
              v-for="item in colleges"
              :key="item.college_id"
              :label="item.name"
              :value="item.college_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd">取 消</el-button>
        <el-button
          v-if="isAct"
          type="primary"
          @click="addCollegeAdminAction(addDetail)"
          >确 定</el-button
        >
        <el-button v-else type="primary" @click="addBackAdminAction(addDetail)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getBackAdminList,
  deleteBackAdminAction,
  getCollegeAdminList,
  deleteCollegeAdminAction,
  getBackAdminInfo,
  getCollegeList,
  editCollegeAdminAction,
  editBackAdminAction,
  addCollegeAdminAction,
  addBackAdminAction
} from "@/api/api.js";
export default {
  data() {
    return {
      page: 1,
      tableData_count: 0,
      page1: 1,
      tableData_count1: 0,
      isAct: false, // 添加账号类型控制
      dialogFormVisible: false, // 编辑框开关
      dialogFormVisible1: false, // 添加账号框开关
      formLabelWidth: "120px", //编辑框宽度
      // 活动管理员编辑内容
      editorDetail: {
        // username: "", // 登录账号
        // college_admin_id: "", //管理员id
        // collegee_id: 0, // 学院id
        // type: 1 //1为院级，0为校级
      },
      addDetail: {},
      searchActParam: {
        college_id: "",
        username: ""
      },
      searchSysParam: {
        username: ""
      },
      search_type: "",
      colleges: [{ college_id: 0, name: "华南理工大学广州学院" }],
      tableData: [],
      tableData1: [],
      back_admin_id: ""
      // multipleSelection: [], // 这大概是多选的元素吧
      // multipleSelection1: []
    };
  },
  async mounted() {
    console.log("mounted");
    this.getList();
    this.getList1();
    this.selectColleges();
  },
  methods: {
    changePage(page) {
      console.log("changePage :>> ", page);
      this.page = page;
      this.getList();
    },
    changePage1(page1) {
      console.log("changePage1 :>> ", page1);
      this.page1 = page1;
      this.getList1();
    },
    cancelAdd() {
      this.dialogFormVisible1 = false;
      this.isAct = false;
    },
    // 添加账号按钮
    addCount(addType) {
      if (addType === 1) {
        this.isAct = true;
      } else {
        this.isAct = false;
      }
      this.addDetail = {};
      this.dialogFormVisible1 = true;
    },
    // 添加活动管理员账号提交
    async addCollegeAdminAction(val) {
      let data = val;
      if (val.college_id === 0) {
        data.type = 2;
      } else {
        data.type = 1;
      }
      console.log("data :>> ", data);
      let res = await addCollegeAdminAction(data);
      if (res.code) {
        this.$message({
          type: "success",
          message: "添加成功"
        });
        this.getList1();
      }
      this.dialogFormVisible1 = false;
      console.log("res :>> ", res);
    },
    // 添加系统管理员账号提交
    async addBackAdminAction(val) {
      console.log("val1 :>> ", val);
      let res = await addBackAdminAction(val);
      if (res.code) {
        this.$message({
          type: "success",
          message: "添加成功"
        });
        this.getList();
      }
      this.dialogFormVisible1 = false;
      console.log("res :>> ", res);
    },
    // 编辑按钮
    handleEdit(index, rows) {
      // 显示原来的数据
      this.editorDetail = { ...rows[index] }; //开辟新内存空间，防止表格数据污染
      this.dialogFormVisible = true;
    },
    // 修改活动管理员提交
    async editCollegeAdminAction(val) {
      console.log("val :>> ", val);
      let res = await editCollegeAdminAction(val);
      if (res.code) {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.getList1();
      }
      this.dialogFormVisible = false;
    },
    // 修改系统管理员提交
    async editBackAdminAction(val) {
      console.log("val :>> ", val);
      let res = await editBackAdminAction(val);
      if (res.code) {
        this.$message({
          type: "success",
          message: "修改成功"
        });
        this.getList();
      }
      this.dialogFormVisible = false;
    },
    // 活动管理员搜索按钮
    searchActBtn() {
      console.log("活动管理员搜索按钮click");
      this.getList1();
    },
    // 系统管理员搜索按钮
    searchSysBtn() {
      console.log("系统管理员搜索按钮click");
      this.getList();
    },
    // 重新获取活动管理员列表
    freshActList() {
      this.tableData1 = [];
      Object.assign(
        this.$data.searchActParam,
        this.$options.data().searchActParam
      );
      Object.assign(this.$data.search_type, this.$options.data().search_type);
      this.getList1();
    },
    // 重新获取系统管理员列表
    freshSysList() {
      this.tableData = [];
      Object.assign(
        this.$data.searchSysParam,
        this.$options.data().searchSysParam
      );
      this.getList();
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelectionChange1(val) {
      this.multipleSelection1 = val;
    },
    // 删除系统管理员账号
    handleDelete(index, rows) {
      console.log("rows[index] :>> ", rows[index]);
      this.back_admin_id = rows[index].back_admin_id;
      this.$confirm("此操作将永久删除该账号，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await deleteBackAdminAction(this.back_admin_id);
        console.log("res:", res);
        console.log("delete:tableData:", this.tableData);
        console.log("index:", index);
        console.log("rows:", rows);
        if (res.code === "200") {
          // 页面移除
          this.$message({
            type: "success",
            message: "刪除成功"
          });
          rows.splice(index, 1);
        } else {
          this.$message({
            message: "删除失败，请重试"
          });
        }
      });
    },
    // 获取系统管理员账号列表
    async getList() {
      this.tableData = [];
      // let arr
      let res = await getBackAdminList({
        search_username: this.searchSysParam.username,
        page: this.page
      });
      console.log("res111:", res.content.list_data);
      this.tableData_count = res.content.data_count;
      res.content.list_data.forEach(element => {
        this.tableData.push(element);
      });
      console.log("tableData:", this.tableData);
    },
    // 删除活动管理员账号
    handleDelete1(index, rows) {
      this.college_admin_id = rows[index].college_admin_id;
      this.$confirm("此操作将永久删除该账号，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await deleteCollegeAdminAction(this.college_admin_id);
        console.log("res:", res);
        console.log("delete:tableData:", this.tableData);
        console.log("index:", index);
        console.log("rows:", rows);
        if (res.code === "200") {
          // 页面移除
          this.$message({
            type: "success",
            message: "刪除成功"
          });
          rows.splice(index, 1);
        } else {
          this.$message({
            message: "删除失败，请重试"
          });
        }
      });
    },
    // 获取活动管理员账号列表
    async getList1() {
      this.tableData1 = [];
      let res = await getCollegeAdminList({
        search_username: this.searchActParam.username,
        search_college_id: this.searchActParam.college_id,
        search_type: this.search_type,
        page: this.page1
      });
      this.tableData_count1 = res.content.data_count;
      res.content.list_data.forEach(element => {
        this.tableData1.push(element);
      });
      console.log("tableData1:", this.tableData);
    }
  }
};
</script>

<style scoped>
.listCont >>> .el-dialog {
  width: 30%;
}
.listCont >>> .el-select {
  width: 100%;
}
.listCont >>> .el-dialog__body {
  width: 75%;
}
.fresh_btn {
  margin-left: 15px;
}
.search_box {
  display: flex;
}
.search_input {
  width: 210px;
  margin-right: 15px;
}
.search_select {
  width: 210px;
  margin-right: 10px;
}
.listCont {
  display: flex;
  width: 98%;
  height: 100%;
  margin: 0 14px;
  position: absolute;
  top: 20px;
}
.listCont >>> .el-drawer__header > :first-child :focus {
  outline: none;
}
.tableTab {
  background-color: rgb(255, 255, 255);
  /* border: 2px solid rgb(120, 128, 208); */
  /* width: 160px; */
  height: 45px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.table_title {
  padding: 15px;
  background: #fff;
  font-size: 23px;
  /* float: left; */
  display: flex;
}
.table_title_btn {
  margin-left: 15px;
}
.listBox {
  height: 100%;
  width: 50%;
  margin-right: 20px;
}

.list_button {
  position: absolute;
  top: 3px;
  right: 0px;
  width: 300px;
  z-index: 1;

  /* height: 100px; */
}
.list_table {
  /* width: 100%; */
  /* border-radius: 5px; */
  box-shadow: 0 10px 10px #888;
}
.list_table >>> .cell {
  padding-left: 14px;
}
.list_head {
  background-color: #fff;
  height: 50px;
}
</style>>
</style>