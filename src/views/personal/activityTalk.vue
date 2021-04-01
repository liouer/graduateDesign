<template>
  <div class="content">
    <div class="list_head">
      <div style="margin-left:20px">
        全部活动
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
        <el-popover placement="bottom" v-model="visible">
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
            <!-- <el-form-item label="活动举办年度" :label-width="formLabelWidth">
              <el-date-picker
                v-model="searchObj.year"
                type="year"
                placeholder="选择年份"
                value-format="yyyy"
              >
              </el-date-picker>
            </el-form-item> -->
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
      <div
        class="card_size"
        v-for="(o, index) in 8"
        :key="o"
        :offset="index > 0 ? 0 : 0"
      >
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <img
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            class="image"
          />
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <div
        class="card_size"
        v-for="(o, index) in 5"
        :key="o"
        :offset="index > 0 ? 0 : 0"
      >
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <!-- src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" -->
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { joinActivityList, getCollegeList } from "@/api/api";
export default {
  data() {
    return {
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
  display: flex;
  padding-top: 20px;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  background-color: #fff;
  /* height: 94%; */
  box-shadow: 0 10px 10px #888;
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
/* 卡片样式 */
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 250px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.card_size {
  height: 380px;
  margin: 0 16px;
  width: 300px;
}
</style>