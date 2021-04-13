<template>
  <div class="list_cont">
    <div class="tableTab">
      <div class="table_title">
        活动记录
        <el-button plain class="fresh_btn" size="small" @click="getList()"
          >刷新
        </el-button>
      </div>
    </div>
    <div class="table_title_btn">
      <el-button
        style="margin-left:15px"
        type="primary"
        size="medium"
        @click="showBox()"
        >录入活动</el-button
      >
      <div class="search_box">
        <div class="search_input">
          <el-input
            size="small"
            v-model="searchParam.search_title"
            placeholder="请输入活动标题"
          >
            <el-button slot="append" icon="el-icon-search" @click="getList()"
              >搜索</el-button
            >
          </el-input>
        </div>
        <el-popover placement="bottom">
          <!-- <div> -->
          <el-form :model="searchParam">
            <!-- <el-form-item label="活动举办年度">
              <el-date-picker
                v-model="searchParam.year"
                type="year"
                placeholder="选择年份"
                value-format="yyyy"
              >
              </el-date-picker>
            </el-form-item> -->
            <el-form-item label="活动级别">
              <el-select
                size="small"
                v-model="searchParam.search_organizers_type"
                placeholder="请选择活动级别"
              >
                <el-option
                  v-for="item in select_organizers_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="举办方">
              <el-input
                size="small"
                v-model="searchParam.search_organizers_name"
                placeholder="请输入举办方名称"
              ></el-input>
            </el-form-item>
          </el-form>
          <!-- </div> -->
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="danger" @click="getList()"
              >搜索</el-button
            >
            <el-button size="mini" @click="refresh()">重置</el-button>
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
    >
      <el-table-column width="30px"> </el-table-column>
      <el-table-column sortable prop="title" label="活动标题">
      </el-table-column>
      <el-table-column sortable prop="organizers_type_str" label="活动级别">
      </el-table-column>
      <el-table-column sortable prop="start_time" label="活动举办时间">
      </el-table-column>
      <el-table-column sortable prop="organizers_name" label="举办方">
      </el-table-column>
      <el-table-column sortable prop="type_str" label="对象类型">
      </el-table-column>
      <el-table-column label="操作" width="380px">
        <template slot-scope="scope">
          <el-popover placement="bottom" width="120" trigger="hover">
            <div>
              <el-button
                class="header_btn"
                size="mini"
                @click="signedBox(scope.$index, tableData)"
                >查看签到</el-button
              >
              <el-button
                class="header_btn"
                size="mini"
                @click="signBox(scope.$index, tableData)"
                >手动添加签到</el-button
              >
              <el-button
                class="header_btn"
                size="mini"
                @click="signExcelBox(scope.$index, tableData)"
                >Excel录入签到</el-button
              >
            </div>
            <el-button slot="reference" size="mini">签到</el-button>
          </el-popover>
          <el-button
            style="margin-left: 10px"
            size="mini"
            @click="summaryBox(scope.$index, tableData)"
            >活动纪要</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="mini"
            @click="activityTalkBtn(scope.$index, tableData)"
            >活动展示</el-button
          >
          <el-popover
            placement="bottom"
            width="80"
            trigger="hover"
            style="margin-left: 10px"
          >
            <div>
              <el-button
                class="header_btn"
                size="mini"
                @click="modifyActivity(scope.$index, tableData)"
                >编辑</el-button
              >
              <el-button
                class="header_btn"
                size="mini"
                @click="deleteActivity(scope.$index, tableData)"
                >删除</el-button
              >
            </div>
            <el-button slot="reference" size="mini">活动操作</el-button>
          </el-popover>
        </template>
      </el-table-column>
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
      <el-dialog title="编辑活动记录" :visible.sync="addFormVisible">
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
          <el-form-item label="活动级别" :label-width="formLabelWidth">
            <el-radio v-model="form.organizers_type" :label="3">院级</el-radio>
            <el-radio v-model="form.organizers_type" :label="2">校级</el-radio>
          </el-form-item>
          <el-form-item label="举办方" :label-width="formLabelWidth">
            <el-input
              v-model="form.organizers_name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="举办学院" :label-width="formLabelWidth">
            <el-input
              :disabled="true"
              v-model="form.college_name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="参与对象类型" :label-width="formLabelWidth">
            <el-radio v-model="form.type" :label="1">个人</el-radio>
            <el-radio v-model="form.type" :label="2">团队</el-radio>
          </el-form-item>
          <!-- <el-form-item label="活动封面" :label-width="formLabelWidth"> -->
          <!-- <el-upload
              :limit="1"
              ref="uploadImg"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload"
                >上传到服务器</el-button
              >
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload> -->
          <!-- </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="isAdd(form)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="signDialog">
      <el-dialog
        title="导入活动到场人员"
        :visible.sync="exportSignFormVisible"
        :before-close="handleClose"
      >
        <!-- <input
          type="file"
          id="fileExport"
          @change="handleFileChange"
          ref="inputer"
          style="margin-left:70px;"
          accept=".xls,.xlsx"
        /> -->
        <el-upload
          :limit="1"
          class="upload-demo"
          ref="upload"
          action="http://www.liouer.top/importActivityJoinLogAction"
          :on-change="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :data="uploadSignData"
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
      <el-dialog title="添加活动到场人员" :visible.sync="signFormVisible">
        <el-form :model="signForm" ref="signForm" label-width="80px">
          <!-- <el-form-item
            @keyup.enter.native="addDomain"
            v-for="(domain, index) in signForm.domains"
            :label="index + 1 + ''"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true,
              message: '请输入内容',
              trigger: 'blur'
            }"
          >
            <el-input v-model="domain.value"></el-input>
            <el-button type="primary" plain @click="addDomain"
              >继续添加</el-button
            > -->
          <el-form-item>
            学号或工号：
            <el-input v-model="signForm.sno"></el-input>
            <!-- <el-button @click.prevent="removeDomain(domain)">删除</el-button> -->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="signFormVisible = false">取 消</el-button>
          <el-button @click="submitSign(signForm)">提交</el-button>
          <!-- <el-button type="primary" @click="submitForm(signForm)"
            >确 定</el-button
          > -->
        </div>
      </el-dialog>
    </div>
    <div class="signedDialog">
      <el-dialog title="查看签到信息" :visible.sync="signedFormVisible">
        <el-table :data="signedForm" style="width: 100%">
          <el-table-column prop="sno" label="学号/工号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="college_name" label="学院"> </el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <div class="summaryDialog">
      <el-dialog title="活动纪要" :visible.sync="summaryFormVisible">
        <el-input
          type="textarea"
          placeholder="活动纪要内容"
          v-model="summary_content"
          maxlength="200"
          show-word-limit
        >
        </el-input>
        <div style="float:right; margin-top:10px">
          <el-button type="primary" plain="" @click="submitSummary(1)"
            >发布</el-button
          >
          <!-- <el-button type="primary" plain="" @click="submitSummary(0)"
            >保存草稿</el-button
          > -->
          <el-button @click="summaryFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
    <actDetail
      ref="actDetail"
      :actid="activity_id"
      :activity="activity"
    ></actDetail>
  </div>
</template>

<script>
import {
  getActivityList,
  getCollegeList,
  addActivityAction,
  importActivityJoinLogAction,
  addActivityJoinLogAction,
  getActivityJoinList,
  setActivitySummaryAction,
  getActivitySummaryAction,
  saveActivitySummaryDraftAction,
  deleteCollegeActivity,
  editCollegeActivity
} from "@/api/api";
import actDetail from "@/views/activitySquare/actDetail.vue";

export default {
  components: {
    actDetail
  },
  data() {
    return {
      page: 1,
      tableData_count: 0,
      isEdit: false,
      uploadSignData: {}, // 上传签到文件的data
      fileList: [], // 上传签到文件的文件列表
      isShowBtn: true,
      activityDetail: {},
      file: [],
      formData: {},
      summary_content: "", //活动纪要内容
      signForm: {},
      signedForm: [], // 签到列表数据
      tableData: [], // 表格数据
      form: {
        one_type_id: 2,
        organizers_type: JSON.parse(localStorage.getItem("userInfo"))
          .college_admin_data.college_id
          ? 3
          : 2,
        college_name: JSON.parse(localStorage.getItem("userInfo"))
          .college_admin_data.college_name,
        college_id: JSON.parse(localStorage.getItem("userInfo"))
          .college_admin_data.college_id,
        organizers_name: JSON.parse(localStorage.getItem("userInfo"))
          .college_admin_data.college_name,
        type: 1
      }, // 添加框数据
      // fileList: [], // 文件数据
      addFormVisible: false, // 添加活动记录框
      signFormVisible: false, //手动录入签到框
      exportSignFormVisible: false, //excel导入签到框
      signedFormVisible: false, //查看签到详情框
      summaryFormVisible: false, //添加活动纪要框
      formLabelWidth: "120px", //编辑框宽度
      college_id: JSON.parse(localStorage.getItem("userInfo"))
        .college_admin_data.college_id,
      college_name: JSON.parse(localStorage.getItem("userInfo"))
        .college_admin_data.college_name,
      isOrgType: true,
      isCollegeType: true,
      activity_id: 0,
      activity: {},
      searchParam: {
        search_one_type_id: "",
        search_organizers_type: "",
        search_organizers_name: "",
        search_title: "",
        search_year: ""
      },
      select_organizers_type: [
        { value: "3", label: "院级" },
        { value: "2", label: "校级" }
      ],
      colleges: []
    };
  },
  mounted() {
    this.getList();
    this.selectColleges();
  },
  methods: {
    changePage(page) {
      console.log("changePage :>> ", page);
      this.page = page;
      this.getList();
    },
    handleClose() {
      this.fileList = [];
      this.exportSignFormVisible = false;
      this.isShowBtn = true;
    },
    // 活动删除方法
    async deleteActivity(index, rows) {
      this.activity_id = rows[index].activity_id;
      console.log("this.activity_id :>> ", this.activity_id);
      let res = await deleteCollegeActivity({ activity_id: this.activity_id });
      if (res.code == 200) {
        this.refresh();
        this.$message({
          type: "success",
          message: res.message
        });
      } else {
        this.$message({
          type: "error",
          message: res.message
        });
      }
    },
    // 活动编辑
    modifyActivity(index, rows) {
      this.addFormVisible = true;
      this.form = rows[index];
      this.isEdit = true;
    },
    // 活动广场详情
    activityTalkBtn(index, tableData) {
      this.activity_id = tableData[index].activity_id;
      this.activity = tableData[index];
      console.log("this.activity :>> ", this.activity);
      console.log("this.activity_id :>> ", this.activity_id);
      this.$refs["actDetail"].showDialogVisible();
      console.log('this.$refs["actDetail"] :>> ', this.$refs["actDetail"]);
    },
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
        this.exportSignFormVisible = false;
        this.$message({
          type: "success",
          message: response.message
        });
      }
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
    // 刷新按钮，并重置搜索框的内容
    refresh() {
      Object.assign(this.$data.searchParam, this.$options.data().searchParam);
      this.tableData = [];
      this.getList();
    },
    // 学院select框选择
    async selectColleges(val) {
      console.log("this.colleges :>> ", this.colleges);
      // 避免多次请求接口
      if (this.colleges.length > 1) {
        console.log("searchObj.college :>> ", this.searchObj.college);
        return;
      }
      let res = await getCollegeList();
      console.log("res.content.list_data :>> ", res.content.list_data);
      res.content.list_data.forEach(element => {
        this.colleges.push(element);
      });
    },
    // 活动纪要提交按钮
    async submitSummary(type) {
      let data = {
        activity_id: this.activity_id,
        summary_content_draft: this.summary_content
      };
      // 保存、提交活动纪要
      let res = await saveActivitySummaryDraftAction(data);
      console.log("res :>> ", res);
      let res1 = await setActivitySummaryAction({
        activity_id: this.activity_id
      });
      if (res1.code == 200) {
        this.summaryFormVisible = false;
        this.$message({
          type: "success",
          message: res1.message
        });
      } else {
        this.$message({
          type: "error",
          message: res1.message
        });
      }
      console.log("res1 :>> ", res1);
    },
    // 添加活动纪要框
    async summaryBox(index, row) {
      this.summaryFormVisible = true;
      this.activity_id = row[index].activity_id;
      // 获取纪要活动内容
      let res = await getActivitySummaryAction({
        activity_id: this.activity_id
      });
      console.log("res :>> ", res);
      // this.summary_content = res.content.data.summary_content;
    },
    // 打开查看签到框、获取签到列表
    async signedBox(index, row) {
      this.signedForm = [];
      this.signedFormVisible = true;
      let data = { activity_id: row[index].activity_id };
      let res = await getActivityJoinList(data);
      res.content.list_data.forEach(element => {
        this.signedForm.push(element);
      });
      console.log("this.signedForm :>> ", this.signedForm);
    },
    // 去重
    // unique(arr) {
    //   const res = new Map();
    //   return arr.filter(arr => !res.has(arr.id) && res.set(arr.id, 1));
    // },
    //提交单个签到按钮
    async submitSign(val) {
      val.activity_id = this.activityDetail.activity_id;
      let res = await addActivityJoinLogAction(val);
      console.log("res :>> ", res);
      if (res.code === "200") {
        this.signFormVisible = false;
        this.$message({
          type: "success",
          message: res.message
        });
        this.addFormVisible = false;
        this.refresh();
      } else {
        this.$message({
          type: "error",
          message: res.message
        });
      }
    },
    // 选择文件按钮
    handleFileChange(e) {
      console.log("e :>> ", e);
      let inputDOM = this.$refs.inputer;
      this.file = inputDOM.files[0]; // 通过DOM取文件数据
      let size = Math.floor(this.file.size / 1024); //计算文件的大小
      this.formData = new FormData(); //new一个formData事件
      this.formData.append("file", this.file); //将file属性添加到formData里 //此时formData就是我们要向后台传的参数了
      this.formData.append("activity_id", this.activityDetail.activity_id);
      console.log(
        "this.activityDetail.activity_id :>> ",
        this.activityDetail.activity_id
      );
      console.log("this.file :>> ", this.file);
      console.log("this.formData :>> ", this.formData);
    },
    // 提交文件按钮
    async submitAddFile(file) {
      this.uploadSignData = {
        token: localStorage.getItem("token"),
        activity_id: this.activityDetail.activity_id,
        file: file
      };
      await this.$nextTick();
      console.log("this.uploadSignData :>> ", this.uploadSignData);
      // let res = await importActivityJoinLogAction(this.uploadSignData);
      console.log("this.$refs.upload :>> ", this.$refs.upload);
      this.$refs.upload.submit();
    },

    //打开excel导入签到框
    signExcelBox(index, row) {
      Object.assign(this.$data.signForm, this.$options.data().signForm);
      this.exportSignFormVisible = true;
      this.activityDetail = row[index];
      console.log("row[index] :>> ", row[index]);
    },
    //打开手工签到框
    signBox(index, row) {
      // Object.assign(this.$data.signForm, this.$options.data().signForm);
      this.signForm = {};
      this.signFormVisible = true;
      this.activityDetail = row[index];
      console.log("row[index] :>> ", row[index]);
    },
    //打开添加活动框
    showBox() {
      // 还原 原data的form数据
      Object.assign(this.$data.form, this.$options.data().form);
      if (this.college_id) {
        this.isCollegeType = false;
      } else {
        this.isOrgType = false;
      }
      // this.form.one_type_id = 1;
      // this.form.type = 1;
      console.log("this.form :>> ", this.form);
      this.addFormVisible = true;
    },
    // 手动处理活动记录
    async isAdd(val) {
      //执行添加接口
      val.two_type_id = 1; //活动类型二级目录，当前需求不需要，设个默认值。
      val.cover_image = "";
      if (this.isEdit === true) {
        let res = await editCollegeActivity(val);
        if (res.code === "200") {
          this.$message({
            type: "success",
            message: res.message
          });
          this.addFormVisible = false;
          this.refresh();
        } else {
          this.$message({
            type: "error",
            message: res.message
          });
        }
        return;
      }
      console.log("添加接口");
      // 转换数据类型传给后端
      console.log("this.form :>> ", this.form);
      let res = await addActivityAction(val);
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
      console.log("val :>> ", val);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    async getList() {
      this.tableData = [];
      let data = {
        search_one_type_id: 2,
        search_organizers_type: this.searchParam.search_organizers_type,
        search_organizers_name: this.searchParam.search_organizers_name,
        search_title: this.searchParam.search_title,
        search_year: this.searchParam.search_year,
        page: this.page,
        page_count: this.page_count
      };
      console.log("data :>> ", data);
      let res = await getActivityList(data);
      this.tableData_count = res.content.data_count;
      console.log("res111:", res);
      res.content.list_data.forEach(element => {
        if (element.one_type_id === 2) {
          this.tableData.push(element);
        }
      });
      console.log("tableData:", this.tableData);
    }
    // 删除用户账号
    // handleDelete(index, rows) {
    //   let user_id = rows[index].user_id;
    //   this.$confirm("此操作将永久删除该账号，是否继续？", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(async () => {
    //     let res = await deleteUserAction(user_id);
    //     console.log("res:", res);
    //     console.log("delete:tableData:", this.tableData);
    //     console.log("index:", index);
    //     console.log("rows:", rows);
    //     if (res.code === "200") {
    //       // 页面移除
    //       this.$message({
    //         type: "success",
    //         message: "刪除成功"
    //       });
    //       rows.splice(index, 1);
    //     }
    //     // lse if (res.code === "401") {
    //     //   this.$message({
    //     //     message: "token已过期，请重新登录"
    //     //   });
    //     // }
    //     else {
    //       this.$message({
    //         message: "删除失败，请重试"
    //       });
    //     }
    //   });
    // }
    // submitForm(formName) {
    //   console.log("formName :>> ", formName);
    //   console.log("this.$refs[formName] :>> ", this.$refs[formName]);
    //   // this.$refs[formName].validate(valid => {
    //   //   if (valid) {
    //   //     alert("submit!");
    //   //   } else {
    //   //     console.log("error submit!!");
    //   //     return false;
    //   //   }
    //   // });
    // },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // },
    // removeDomain(item) {
    //   var index = this.signForm.domains.indexOf(item);
    //   if (index !== -1) {
    //     this.signForm.domains.splice(index, 1);
    //   }
    // },
    // addDomain() {
    //   this.signForm.domains.push({
    //     value: "",
    //     key: Date.now()
    //   });
    // }
  }
};
</script>

<style scoped>
.userBox >>> .el-button:focus,
.el-button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #fff;
}
.header_btn {
  display: flex;
  font-size: 14px;
  /* margin-left: 20px; */
  margin: 0 auto;
  color: #413c69;
  border: none;
}
.userBox {
  display: flex;
  float: right;
}
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
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
/* .dialog >>> .el-select {
  display: block;
  width: 300px;
} */
.dialog >>> .el-input {
  display: block;
  margin-left: 25px;
  width: 300px;
}
.dialog >>> .el-form-item__content {
  width: 67%;
}
.dialog >>> .el-radio {
  width: 80px;
}
.signDialog >>> .el-dialog__body {
  height: 110px;
}
.signDialog >>> .el-dialog {
  width: 30%;
}
.signDialog >>> .el-form-item__content {
  display: flex;
}
.signDialog >>> .el-input {
  width: 65%;
}
.signDialog >>> .el-input__inner {
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
.signedDialog >>> .el-dialog {
  width: 35%;
}
.summaryDialog >>> .el-dialog {
  width: 35%;
  height: 350px;
}
.summaryDialog >>> textarea {
  height: 200px;
}
.advance_search >>> .el-icon-d-arrow-right {
  transform: rotate(-90deg);
}
.advance_search:focus >>> .el-icon-d-arrow-right {
  transform: rotate(90deg);
}
.search_box {
  margin-right: 75px;
  display: flex;
}
.search_input {
  width: 290px;
  margin-right: 5px;
}
.upload_tip {
  font-size: 16px;
  color: #606266;
  margin-top: 7px;
}
</style>