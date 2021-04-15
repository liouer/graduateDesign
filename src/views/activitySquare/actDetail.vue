<template>
  <div class="actDetail">
    <!-- <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    > -->
    <!-- fullscreen:全屏显示对话框
         :before-close 关闭按钮的动作
     -->
    <el-dialog
      title="活动详情互动"
      :visible.sync="dialogVisible"
      fullscreen
      :actid="actid"
      :activity="activity"
    >
      <!-- 活动介绍 -->
      <div>
        <el-row :gutter="30">
          <el-col :span="12">
            <!-- 活动官方图片 -->
            <div class="imgBox">
              <div v-if="userType" style="text-align:right">
                <el-button
                  icon="el-icon-picture-outline-round"
                  size="small"
                  plain
                  style="font-size:14px; margin-bottom:3px"
                  @click="isShowBanner()"
                  >设置大图</el-button
                >
              </div>
              <div class="bannerBox">
                <p>{{ activity.title }}</p>
                <el-carousel height="460px">
                  <el-carousel-item
                    v-for="imgItem in imgs"
                    :key="imgItem.index"
                  >
                    <img class="imgStyle" :src="imgItem.url" />
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            <!-- 活动详细内容 -->
            <div style="text-align:left; margin-left:15%; margin-top:20px">
              <div style="font-size:20px; color:#000">
                <div style="display:flex;justify-content: space-between;">
                  <div>活动级别：{{ activity.organizers_type_str }}</div>
                  <div>{{ activity.start_time }}</div>
                </div>
                <div style="display:flex;justify-content: space-between;">
                  <div>举办方：{{ activity.organizers_name }}</div>
                  <div>举办学院：{{ activity.organizers_name }}</div>
                </div>
                <div v-if="summary">
                  活动纪要：
                  <p>
                    {{ summary.summary_content }}
                    <span style="color:#999">({{ summary.summary_time }})</span>
                  </p>
                </div>
                <!-- <div>活动参与人数：{{}}</div> -->
              </div>
              <!-- 活动剪影 -->
              <div class="imgsBox">
                <div>
                  <el-divider>
                    <i
                      class="el-icon-picture-outline"
                      style="color: blue; font-size:20px"
                    ></i>
                    <span style="color: blue; font-size:20px"
                      >精彩剪影</span
                    ></el-divider
                  >
                  <el-button size="mini" @click="isShowUpPic()"
                    >我要上传</el-button
                  >
                </div>
                <div class="talkImgsBox">
                  <div v-for="(img, index) in talkimgs" :key="img.index">
                    <el-image
                      style="width: 120px; height: 120px; margin: 3px"
                      :src="img.url"
                      :preview-src-list="[talkimgs[index].url]"
                    >
                    </el-image>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <!-- 讨论专区 -->
            <div class="talkContent">
              <div
                style="font-size:20px; color: blue; text-align:left; margin:5px 15px;"
              >
                <i
                  class="el-icon-chat-square"
                  style="cursor:pointer"
                  @click="getActivityComment()"
                >
                  精彩讨论区</i
                >
              </div>
              <el-card class="box-card" shadow="hover">
                <div class="text">
                  <el-input
                    style="width:90%; float:left"
                    maxlength="200"
                    show-word-limit
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="我也來讨论......"
                    v-model="mytalk"
                  >
                  </el-input>
                  <el-button
                    type="success"
                    size="medium"
                    icon="el-icon-check"
                    circle
                    style="margin-top:7px"
                    @click="submitTalk()"
                  ></el-button>
                </div>
              </el-card>
              <el-card
                shadow="never"
                class="box-card"
                v-for="(item, index) in mytalks"
                :key="index"
              >
                <div>
                  <div style="font-size:16px;text-align: left;">
                    <p style="font-weight: 700; margin-right:15px">
                      <span style="margin-right:10px">
                        {{ item.user_name }}</span
                      >
                      <span>{{ item.college_name }}</span>
                      <span style="color: #999;font-weight: 100;float:right">{{
                        item.add_time
                      }}</span>
                    </p>
                  </div>
                  <div
                    style="text-align: left;font-size:16px;padding-top: 5px;"
                  >
                    {{ item.content }}
                  </div>
                </div>
                <div v-if="userType" style="text-align:right">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    plain
                    @click="deleteTalk(item.comment_id)"
                  ></el-button>
                </div>
              </el-card>
              <div style="margin-right:6%">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="tableData_count"
                  :page-size="30"
                  @current-change="changePage"
                  style="float:right"
                >
                </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- banner展示 -->
    </el-dialog>
    <div>
      <!-- 活动banner图上传框 -->
      <el-dialog :visible.sync="isShowBannerBox" width="500px">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="http://www.liouer.top/uploadActivityImageAction"
          :on-success="handleSuccess"
          :on-change="handleChange"
          :auto-upload="false"
          :file-list="image"
          :data="imageUploadData"
          list-type="picture"
          :limit="5"
        >
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，最多5张。
          </div>
        </el-upload>
        <el-button size="small" type="success" @click="submitUpload"
          >点击发布</el-button
        >
      </el-dialog>

      <!-- 精彩剪影上传框 -->
      <el-dialog :visible.sync="isShowUpPicrBox" width="500px">
        <el-upload
          ref="upload"
          class="upload-demo"
          action="http://www.liouer.top/uploadActivityImageAction"
          :on-success="handleSuccess"
          :on-change="handleChange"
          :auto-upload="false"
          :file-list="image"
          :data="imageUploadData"
          list-type="picture"
          :limit="5"
        >
          <el-button size="small" type="primary">选择图片</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，最多5张。
          </div>
        </el-upload>
        <el-button size="small" type="success" @click="submitUploadImage"
          >点击发布</el-button
        >
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  submitCommentAction,
  getActivityComment,
  getActivitySummaryAction,
  uploadActivityImageAction,
  submitBannerAction,
  collegeDeleteActivityComment,
  getActivityPictureList,
  submitUserActivityPictureAction,
  getUserActivityPictureList
} from "@/api/api";
export default {
  name: "actDetail",
  // 获取父组件参数：   参数名：数据类型
  props: {
    actid: Number,
    activity: Object
  },
  data() {
    return {
      tableData_count: 0, // 评论数
      imageUploadData: {},
      image: [],
      imageUrl: [], //图片上传成功后返回的地址，如果要同时提交两个图片地址，请用英文逗号拼接
      summary: {},
      mytalks: [],
      mytalk: "",
      isShowBannerBox: false,
      isShowUpPicrBox: false,
      userType: JSON.parse(localStorage.getItem("userInfo")).college_admin_data
        ? 1
        : 0, // 1为活动管理员，0为非活动管理员
      dialogVisible: false,
      imgs: [
        // { url: require("@/assets/imgs/地板吧.jpg") },
        // { url: require("@/assets/imgs/四姐妹.jpg") },
        // { url: require("@/assets/imgs/旺仔.jpg") },
        // { url: require("@/assets/imgs/截过的下象棋.jpg") },
        // { url: require("@/assets/imgs/晚饭.jpg") }
      ],
      talkimgs: []
    };
  },
  mounted() {
    // this.getActivityComment(); // 获取评论
    // this.getActivityPictureList(); // 获取banner图
    // this.getUserActivityPictureList(); // 获取剪影
  },
  methods: {
    isShowUpPic() {
      this.imageUrl = [];
      this.isShowUpPicrBox = true;
    },
    isShowBanner() {
      this.imageUrl = [];
      this.isShowBannerBox = true;
    },
    // 评论分页
    changePage(page) {
      this.page = page;
      console.log("changePage :>> ", page);
      this.getActivityComment();
    },
    // 删除评论
    async deleteTalk(comment_id) {
      console.log("comment_id :>> ", comment_id);
      let res = await collegeDeleteActivityComment({ comment_id: comment_id });
      if (res.code === "200") {
        this.getActivityComment();
        this.$message({
          type: "success",
          message: "删除成功"
        });
      } else {
        this.$message({
          type: "error",
          message: res.message
        });
      }
    },
    async handleChange(file, fileList) {
      console.log("file :>> ", file);
      this.imageUploadData = {
        image: file.raw
      };
      await this.$nextTick();
      console.log("this.imageUploadData :>> ", this.imageUploadData);
      this.$refs.upload.submit();
    },
    // 获取图片上传的地址
    handleSuccess(response, file, fileList) {
      console.log("图片上传返回 :>> ");
      console.log("response :>> ", response);
      this.imageUrl.push(response.content.url);
      console.log("this.imageUrl.toString :>> ", this.imageUrl.toString());
      console.log("this.imageUrl :>> ", this.imageUrl);
      console.log("file :>> ", file);
      console.log("fileList :>> ", fileList);
    },
    // 发布精彩剪影
    async submitUploadImage() {
      this.uploadSignData = {
        token: localStorage.getItem("token"),
        activity_id: this.actid,
        image: this.imageUrl.toString()
      };
      await this.$nextTick();
      let res = await submitUserActivityPictureAction(this.uploadSignData);
      if (res.code == 200) {
        this.isShowUpPicrBox = false;
        this.$message({
          type: "success",
          message: res.message
        });
        this.getUserActivityPictureList();
      } else {
        this.$message({
          type: "error",
          message: res.message
        });
      }
      console.log("res :>> ", res);
    },
    // 发布banner图
    async submitUpload() {
      this.uploadSignData = {
        token: localStorage.getItem("token"),
        activity_id: this.actid,
        image: this.imageUrl.toString()
      };
      await this.$nextTick();
      let res = await submitBannerAction(this.uploadSignData);
      if (res.code == 200) {
        this.isShowBannerBox = false;
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
      console.log("res :>> ", res);
      // 提交banner图接口 获取组件action中返回的接口数据，再提交到 submitBannerAction
    },
    // 提交评论
    async submitTalk() {
      let data = {
        activity_id: this.actid,
        content: this.mytalk
      };
      let res = await submitCommentAction(data);
      if (res.code == 200) {
        this.mytalk = "";
        this.getActivityComment();
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
    // 获取评论
    async getActivityComment() {
      this.mytalks = [];
      await this.$nextTick();
      console.log("111111 :>> ");
      console.log("this.actid :>> ", this.actid);
      let res = await getActivityComment({
        search_activity_id: this.actid,
        page: this.page
      });
      this.mytalks = res.content.list_data;
      this.tableData_count = res.content.data_count;
      console.log("this.mytalks :>> ", this.mytalks);
      console.log("res :>> ", res);
    },
    // 获取banner图
    async getActivityPictureList() {
      this.imgs = [];
      await this.$nextTick();
      let res = await getActivityPictureList({ activity_id: this.actid });
      console.log("res1111111111111111111 :>> ", res);
      res.content.list.forEach(element => {
        this.imgs.push(element);
      });
      console.log("this.imgs :>> ", this.imgs);
    },
    // 获取剪影
    async getUserActivityPictureList() {
      this.talkimgs = [];
      await this.$nextTick();
      let data = {
        search_activity_id: this.actid
      };
      let res = await getUserActivityPictureList(data);
      console.log("res2222222222 :>> ", res);
      res.content.list_data.forEach(element => {
        this.talkimgs.push(element);
      });
      console.log("this.talkimgs :>> ", this.talkimgs);
    },
    // 获取活动纪要
    async getActivitySummaryAction() {
      this.summary = {};
      await this.$nextTick();
      console.log("this.actid111111111 :>> ", this.actid);
      let res1 = await getActivitySummaryAction({
        activity_id: this.actid
      });
      this.summary = res1.content;
      console.log("this.summary1111111111111 :>> ", this.summary);
    },
    showDialogVisible() {
      console.log("typeof actid", typeof this.actid);
      console.log("actid", this.actid);
      this.dialogVisible = true;
      console.log("dialogVisible :>> ", this.dialogVisible);
    }
  }
};
</script>

<style scoped>
/* .actDetail {
  border: black 1px solid;
} */
.actDetail >>> .el-dialog__header {
  text-align: left;
}
/* 控制轮播图的样式 */
.el-carousel__item {
  width: 100%;
  height: 100%;
  background: #e6e6e648;
}
.imgBox {
  /* width: 700px; */
  margin-left: 15%;
  /* padding-top: 26px; */
  /* float: left; */
}
/* 图片样式自适应 */
.imgStyle {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
}
/* 精彩剪影放图的容器 */
.imgsBox {
  /* margin-right: 10%; */
  /* width: 700px; */
  /* float: right; */
  /* display: flex; */
}
.talkImgsBox {
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  /* justify-content: space-around; */
}
/* 评论区 */
.talkContent {
  /* margin-left: 40px; */
  margin-right: 11%;
}
.box-card {
  width: 90%;
  margin: 0 15px 15px 15px;
}
.bannerBox {
  position: relative;
  display: block;
}
.bannerBox > p {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  padding: 10px 5px;
  color: #fff;
  font-size: 20px;
  overflow-wrap: break-word;
  text-align: left;
  font-weight: 600;
  z-index: 999;
}
.el-upload-list {
  padding: 0 80px;
}
</style>
