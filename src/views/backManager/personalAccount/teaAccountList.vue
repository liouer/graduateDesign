<template>
  <div class="list_cont">
    <div class="tableTab">
      <div class="table_title">
        教职工账号
        <el-button plain class="fresh_btn" size="small" @click="getList()"
          >刷新
        </el-button>
      </div>
    </div>
    <div class="table_title_btn">
      <div class="title_btn">
        <el-button type="primary" plain size="medium" @click="showDialog()"
          >Excel导入账号</el-button
        >
        <el-button type="primary" plain size="medium" @click="showBox(1)"
          >手动录入账号</el-button
        >
      </div>
      <div class="search_head">
        <el-input
          size="small"
          v-model="searchUserParam.search_name"
          placeholder="请输入姓名"
        >
          <el-button
            size="small"
            slot="append"
            icon="el-icon-search"
            @click="getList()"
            >搜索</el-button
          >
        </el-input>
        <el-popover class="popoverBox" placement="bottom">
          <!-- <div> -->
          <el-form :model="searchUserParam">
            <el-form-item label="学院">
              <el-select
                v-model="searchUserParam.search_college_id"
                placeholder="请选择学院"
                size="small"
                @click.native="
                  selectColleges(searchUserParam.search_college_id)
                "
              >
                <el-option
                  v-for="item in colleges"
                  :key="item.college_id"
                  :label="item.name"
                  :value="item.college_id"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="账号">
              <el-input
                size="small"
                v-model="searchUserParam.search_sno"
                placeholder="请输入账号"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input
                size="small"
                v-model="searchUserParam.search_phone"
                placeholder="请输入电话号码"
              >
              </el-input
            ></el-form-item>
          </el-form>
          <!-- </div> -->
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="danger" @click="getList()"
              >搜索</el-button
            >
            <el-button size="mini" @click="freshUserList()">重置</el-button>
          </div>
          <el-button
            size="small"
            class="advance_search"
            icon="el-icon-d-arrow-right"
            slot="reference"
            >高级筛选</el-button
          >
        </el-popover>
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
      v-if="isTea"
    >
      <!-- <el-table-column type="selection" width="55px"> </el-table-column> -->
      <el-table-column width="55px"> </el-table-column>
      <el-table-column prop="name" label="姓名" sortable> </el-table-column>
      <el-table-column prop="sno" label="工号（账号）" sortable>
      </el-table-column>
      <el-table-column prop="college_name" label="学院" sortable>
      </el-table-column>
      <el-table-column prop="phone" label="电话" sortable> </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="mini" @click="showBox(2, scope.$index, tableData)"
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
      <el-table-column width="45px"> </el-table-column>
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
    <div class="dialog">
      <el-dialog title="教职工账号信息" :visible.sync="addFormVisible">
        <el-form :model="form">
          <el-form-item label="工号（账号）" :label-width="formLabelWidth">
            <el-input v-model="form.sno" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            v-if="boxType === 1"
            label="密码"
            :label-width="formLabelWidth"
          >
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="学院" :label-width="formLabelWidth">
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
          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="isAdd(form)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="inputDialog">
      <el-dialog
        title="导入教职工信息"
        :visible.sync="exportFormVisible"
        :before-close="handleClose"
      >
        <el-upload
          :limit="1"
          class="upload-demo"
          ref="upload"
          action="http://www.liouer.top/importTeacherUserAction"
          :on-change="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :data="uploadData"
          :on-success="uploadSuccess"
          :on-error="uploadError"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <div class="upload_tip">
            只能上传.xls、.xlsx文件
          </div>
        </el-upload>
        <el-button
          type="success"
          @click="submitAddFile"
          size="small"
          style="float:right"
          v-if="!isShowBtn"
          >提交</el-button
        >
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getUserList,
  deleteUserAction,
  getCollegeList,
  editUserAction,
  addUserAction
} from "@/api/api";
export default {
  data() {
    return {
      isShowBtn: true,
      fileList: [], // 上传签到文件的文件列表
      uploadData: {}, // 上传签到文件的data
      exportFormVisible: false,
      page: 1,
      tableData_count: 0,
      tableData: [],
      form: [],
      isTea: false,
      addFormVisible: false,
      formLabelWidth: "120px", //编辑框宽度
      boxType: 0,
      searchUserParam: {
        search_college_id: "",
        search_name: "",
        search_phone: "",
        search_sno: "",
        search_class: "",
        search_type: 2
      },
      colleges: []
    };
  },
  mounted() {
    this.getList();
    this.selectColleges();
  },
  methods: {
    /* 文件上传 start */
    // 文件上传失败返回
    uploadError(err, file, fileList) {
      console.log("err :>> ", err);
      console.log("file :>> ", file);
      console.log("fileList :>> ", fileList);
    },
    // 文件上传成功返回
    uploadSuccess(response, file, fileList) {
      console.log("response :>> ", response);
      console.log("file :>> ", file);
      console.log("fileList :>> ", fileList);
      if (response.code === "200") {
        this.exportFormVisible = false;
        this.getList();
        this.$message({
          type: "success",
          message: response.message
        });
      }
    },
    // 提交文件按钮
    async submitAddFile(file) {
      this.uploadData = {
        token: localStorage.getItem("token"),
        file: file
      };
      await this.$nextTick();
      console.log("this.uploadData :>> ", this.uploadData);
      console.log("this.$refs.upload :>> ", this.$refs.upload);
      this.$refs.upload.submit();
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(val, list) {
      console.log("list :>> ", list);
      if (list.length > 0) {
        this.isShowBtn = false;
        console.log("isShowBtn :>> ", this.isShowBtn);
      }
    },
    handleRemove(val, list) {
      console.log("remove:list :>> ", list);
      if (list.length < 1) {
        this.isShowBtn = true;
      }
    },
    handleClose() {
      this.fileList = [];
      this.exportFormVisible = false;
      this.isShowBtn = true;
    },
    showDialog() {
      this.uploadData = "";
      this.exportFormVisible = true;
    },
    /* 文件上传end */

    // 改变页数时刷新列表
    changePage(page) {
      console.log("changePage :>> ", page);
      this.page = page;
      this.getList();
    },
    // 将搜索框重置再刷新列表
    freshUserList() {
      Object.assign(
        this.$data.searchUserParam,
        this.$options.data().searchUserParam
      );
      this.tableData = [];
      this.getList();
    },
    showBox(type, index, row) {
      // type = 1,则弹框为添加账号框
      if (type === 1) {
        this.form = {};
        this.boxType = 1;
      } else {
        // 否则是编辑框
        console.log("type,index,row :>> ", type, index, row);
        console.log("row[index] :>> ", row[index]);
        this.form = { ...row[index] }; //开辟新内存空间，防止表格数据污染
        this.boxType = 2;
      }
      this.addFormVisible = true;
    },
    // 学院select框选择
    async selectColleges(val) {
      console.log("this.colleges :>> ", this.colleges);
      // 避免多次请求接口
      if (this.colleges.length > 1) {
        console.log(
          "searchUserParam.college :>> ",
          this.searchUserParam.college
        );
        return;
      }
      let res = await getCollegeList();
      console.log("res.content.list_data :>> ", res.content.list_data);
      res.content.list_data.forEach(element => {
        this.colleges.push(element);
      });
    },
    // 手动处理学生账号
    async isAdd(val) {
      val.type = 2; // 添加用户type属性，type=1为学生，type=2为教师
      val.college_id = 1;
      //执行添加接口
      if (this.boxType === 1) {
        console.log("添加接口");
        let res = await addUserAction(val);
        if (res.code === "200") {
          this.$message({
            type: "success",
            message: "添加成功"
          });
          this.addFormVisible = false;
          this.getList();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
      } else {
        // 执行编辑接口
        let res = await editUserAction(val);
        if (res.code === "200") {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.addFormVisible = false;
          this.getList();
        }
      }
      console.log("val :>> ", val);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async getList() {
      this.tableData = [];
      let data = {
        page: this.page,
        search_college_id: this.searchUserParam.search_college_id,
        search_name: this.searchUserParam.search_name,
        search_phone: this.searchUserParam.search_phone,
        search_sno: this.searchUserParam.search_sno,
        search_class: this.searchUserParam.search_class,
        search_type: 2
      };
      console.log("data :>> ", data);
      let res = await getUserList(data);
      this.tableData_count = res.content.data_count;
      console.log("res111:", res);
      res.content.list_data.forEach(element => {
        if (element.type === 2) {
          this.isTea = true;
          this.tableData.push(element);
        }
      });
      console.log("tableData:", this.tableData);
    },
    // 删除用户账号
    handleDelete(index, rows) {
      let user_id = rows[index].user_id;
      this.$confirm("此操作将永久删除该账号，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await deleteUserAction(user_id);
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
        }
        // lse if (res.code === "401") {
        //   this.$message({
        //     message: "token已过期，请重新登录"
        //   });
        // }
        else {
          this.$message({
            message: "删除失败，请重试"
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.list_cont {
  width: 98%;
  height: 100%;
  margin: 0 14px;
  position: absolute;
  top: 20px;
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
  margin-left: 15px;
}
.table_title_btn {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title_btn {
  margin-left: 15px;
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
.fresh_btn {
  margin-left: 15px;
}
.dialog >>> .el-dialog {
  width: 30%;
}
.dialog >>> .el-select {
  display: block;
  width: 300px;
}
.dialog >>> .el-input {
  display: block;
  margin-left: 25px;
  width: 300px;
}
.search_head {
  margin-right: 25px;
}
.search_head >>> .el-input-group {
  width: 207px;
  margin-right: 10px;
}
.popoverBox {
  margin-right: 40px;
}
.advance_search >>> .el-icon-d-arrow-right {
  transform: rotate(-90deg);
}
.advance_search:focus >>> .el-icon-d-arrow-right {
  transform: rotate(90deg);
}
.inputDialog >>> .el-dialog__body {
  height: 110px;
}
.inputDialog >>> .el-dialog {
  width: 30%;
}
.inputDialog >>> .el-form-item__content {
  display: flex;
}
.inputDialog >>> .el-input {
  width: 65%;
}
.inputDialog >>> .el-input__inner {
  width: 75%;
}
.upload {
  display: inline-block;
  width: 70px;
  height: 38px;
  line-height: 38px;
  background: #3a8ff0;
  position: relative;
  text-align: center;
  color: #fff;
}
/*input 标签有默认的宽高border,outline*/
.upload > input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*透明度为0*/
  opacity: 0;
  cursor: pointer;
}
.upload_tip {
  font-size: 16px;
  color: #606266;
  margin-top: 7px;
}
</style>