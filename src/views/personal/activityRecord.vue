<template>
  <div class="content">
    <div class="list_head">
      <div style="margin-left:15px">
        活动记录
        <el-button style="margin-left:15px" size="mini" @click="refresh()"
          >刷新</el-button
        >
      </div>
      <div class="search_head">
        <el-input
          size="small"
          placeholder="请输入活动标题"
          v-model="searchObj.title"
          class="input_search"
        >
          <el-button slot="append" icon="el-icon-search" @click="search()"
            >搜索</el-button
          >
        </el-input>
        <el-popover placement="bottom">
          <!-- <div> -->
          <el-form :model="searchObj">
            <el-form-item label="活动类型" :label-width="formLabelWidth">
              <el-select
                size="small"
                v-model="searchObj.one_type_id"
                placeholder="请选择活动类型"
              >
                <el-option
                  v-for="item in select_one_type_id"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="searchObj.year"
                type="year"
                placeholder="选择年份"
                value-format="yyyy"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="活动级别" :label-width="formLabelWidth">
              <el-select
                size="small"
                v-model="searchObj.organizers_type"
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
            <el-form-item label="举办学院" :label-width="formLabelWidth">
              <el-select
                v-model="searchObj.college_id"
                placeholder="请选择学院"
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
          </el-form>
          <!-- </div> -->
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="danger" @click="search()"
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
    <div class="list_body">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column width="50px"> </el-table-column>
        <el-table-column prop="title" label="活动标题" sortable>
        </el-table-column>
        <el-table-column prop="one_type_name" label="活动类型" sortable>
        </el-table-column>
        <el-table-column prop="organizers_type_str" label="活动级别" sortable>
        </el-table-column>
        <el-table-column prop="start_time" label="活动举办时间" sortable>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left:5px">{{ scope.row.start_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="organizers_name" label="举办方" sortable>
        </el-table-column>
        <el-table-column prop="college_name" label="举办学院" sortable>
        </el-table-column>
        <el-table-column prop="type_str" label="对象类型" sortable>
        </el-table-column>
        <!-- <el-table-column width="55px"> </el-table-column> -->
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
  </div>
</template>

<script>
import { joinActivityList, getCollegeList } from "@/api/api";
export default {
  data() {
    return {
      tableData_count: 0,
      tableData: [],
      searchObj: {
        title: "",
        organizers_name: "",
        college_id: "",
        year: "",
        one_type_id: "",
        organizers_type: ""
      },
      select_organizers_type: [
        { value: "3", label: "院级" },
        { value: "2", label: "校级" }
      ],
      select_one_type_id: [
        { value: "1", label: "德育活动" },
        { value: "2", label: "智育活动" },
        { value: "3", label: "文体活动" }
      ],
      colleges: [],
      formLabelWidth: "80px" //编辑框宽度
    };
  },
  mounted() {
    this.getList();
    this.selectColleges();
  },
  methods: {
    changePage(page) {
      console.log("changePage :>> ", page);
      let data = {
        page: page
      };
      this.getList(data);
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
    // 重置搜索框内容
    reset() {
      Object.assign(this.$data.searchObj, this.$options.data().searchObj);
    },
    // 刷新按钮，并重置搜索框的内容
    refresh() {
      Object.assign(this.$data.searchObj, this.$options.data().searchObj);
      this.tableData = [];
      this.getList();
    },
    search() {
      let data = {
        search_title: this.searchObj.title,
        search_one_type_id: this.searchObj.one_type_id,
        search_organizers_type: this.searchObj.organizers_type,
        search_organizers_name: this.searchObj.organizers_name,
        search_year: this.searchObj.year
      };
      this.getList(data);
    },
    async getList(data) {
      this.tableData = [];
      let res = await joinActivityList(data);
      this.tableData_count = res.content.data_count;
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
  box-shadow: 0 10px 10px #888;
  margin-bottom: 25px;
}
.advance_search >>> .el-icon-d-arrow-right {
  transform: rotate(-90deg);
}
.advance_search:focus >>> .el-icon-d-arrow-right {
  transform: rotate(90deg);
}
.search_head {
  width: 450px;
  margin-top: 5px;
  margin-right: 40px;
}
.search_head >>> .el-input-group {
  width: 310px;
  margin-right: 10px;
}
.search_head >>> .el-popover {
  margin-right: 40px;
}
</style>