<template>
  <div>
    <el-upload
      class="upload-demo"
      :action="mvPath"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传视频格式文件</div>
    </el-upload>
    <!--添加一个容器显示上传视频-->
    <video style="width:300px;height:150px;" v-if="videoUrl" :src="videoUrl" controls loop></video>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      videoUrl: "",
      mvPath: process.env.URL_APP_URL + "/question/upload"
    };
  },
  methods: {
    //上传成功的回调
    handleAvatarSuccess(res, file) {
      //将上传好的视频文件赋值给videoUrl
      this.videoUrl = URL.createObjectURL(file.raw);
      //将视频的路径返回
      this.$emit("input", res.data.url);
    },
    //上传之前的回调
    beforeAvatarUpload(file) {
      const isType = file.type == "video/mp4";
      const isLt8M = file.size / 1024 / 1024 < 8;

      if (!isType) {
        this.$message.error("上传视频只能是 MP4 格式!");
      }
      if (!isLt8M) {
        this.$message.error("上传视频大小不能超过 8MB!");
      }
      return isType && isLt8M;
    }
  }
};
</script>

<style>
</style>