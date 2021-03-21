<template>
  <div class="list_cont">
    <div class="tableTab">
      <div class="table_title">
        学生账号
        <el-button plain class="fresh_btn" size="small" @click="freshUserList()"
          >刷新
        </el-button>
      </div>
    </div>
    <div class="table_head">
      <div class="table_title_btn">
        <el-button type="primary" plain size="medium">Excel导入账号</el-button>
        <el-button type="primary" plain size="medium" @click="showBox(1)"
          >手动录入账号</el-button
        >
      </div>
      <div class="search">
        <div class="search_select">
          <el-select
            v-model="searchUserParam.search_college_id"
            placeholder="请选择学院"
            size="small"
            @click.native="selectColleges(searchUserParam.search_college_id)"
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
            v-model="searchUserParam.search_sno"
            placeholder="请输入账号"
          >
          </el-input>
          <el-input
            size="small"
            v-model="searchUserParam.search_name"
            placeholder="请输入姓名"
          >
          </el-input>
          <el-input
            size="small"
            v-model="searchUserParam.search_phone"
            placeholder="请输入电话号码"
          >
          </el-input>
          <el-button
            slot="append"
            icon="el-icon-search"
            style="width:80px"
            @click="searchActBtn()"
            >搜索</el-button
          >
        </div>
      </div>
    </div>
    <div class="list_table">
      <el-table
        stripe
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        height="85%"
        @selection-change="handleSelectionChange"
        v-if="isStu"
      >
        <!-- <el-table-column type="selection" width="55px"> </el-table-column> -->
        <el-table-column width="55px"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sno" label="学号（账号）"> </el-table-column>
        <el-table-column prop="college_name" label="学院"> </el-table-column>
        <el-table-column prop="grade" label="年级"> </el-table-column>
        <el-table-column prop="class" label="专业班级"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
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
        <el-table-column width="55px"> </el-table-column>
      </el-table>
    </div>
    <div class="dialog">
      <el-dialog title="修改学生账号" :visible.sync="addFormVisible">
        <el-form :model="form">
          <el-form-item label="学号" :label-width="formLabelWidth">
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
          <el-form-item label="年级" :label-width="formLabelWidth">
            <el-input v-model="form.grade" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="专业班级" :label-width="formLabelWidth">
            <el-input v-model="form.class" autocomplete="off"></el-input>
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
  </div>
</template>

<script>
import {
  getUserList,
  deleteUserAction,
  addUserAction,
  getCollegeList,
  editUserAction
} from "@/api/api";
export default {
  data() {
    return {
      tableData: [],
      isStu: false,
      addFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      colleges: [],
      boxType: 0,
      searchUserParam: {
        search_college_id: "",
        search_name: "",
        search_phone: "",
        search_sno: "",
        search_class: "",
        search_type: 1
      }
    };
  },
  mounted() {
    this.getList();
    this.selectColleges();
  },
  watch: {
    "searchUserParam.search_college_id": {
      handler(newVal) {
        this.getList();
      },
      deep: true
    },
    "searchUserParam.search_name": {
      handler(newVal) {
        this.getList();
      },
      deep: true
    }
  },
  methods: {
    // 用户搜索按钮
    searchActBtn() {
      console.log("搜索按钮click");
      this.getList();
    },
    // 讲搜索框重置再刷新列表
    freshUserList() {
      Object.assign(
        this.$data.searchUserParam,
        this.$options.data().searchUserParam
      );
      this.getList();
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    // 手动处理学生账号
    async isAdd(val) {
      val.type = 1; // 添加用户type属性，type=1为学生，type=2为教师
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
    // 获取学生账号列表
    async getList() {
      this.tableData = [];
      let data = this.searchUserParam;
      console.log("data :>> ", data);
      let res = await getUserList(data);
      console.log("res111:", res);
      res.content.list_data.forEach(element => {
        // 筛选用户列表里的学生账号
        if (element.type === 1) {
          this.isStu = true;
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
  /* display: flex; */
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
  height: 50px;
  font-size: 18px;
  display: flex;
  /* align-items: center;
  justify-content: space-between; */
}
.table_title {
  margin-left: 15px;
  margin-top: 10px;
}
.table_title_btn {
  margin-left: 15px;
  /* display: block; */
}
.table_head {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
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
.fresh_btn {
  margin-left: 15px;
}
.search {
  /* width: 520px; */
  display: flex;
}
.search_select {
  margin-right: 10px;
}
.search_input {
  display: flex;
  margin-right: 15px;
}
.search_input >>> el-input {
  margin-right: 10px;
}
</style>