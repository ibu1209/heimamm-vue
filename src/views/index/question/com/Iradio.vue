<template>
  <div class="cutRadio">
    <el-radio :label="label">
      <span class="cutSpan">{{label}}</span>
      <el-input :value="text" @input="v=>{$emit('changeTxt',v)}" class="cutIpt"></el-input>
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-radio>
  </div>
</template>

<script>
export default {
  props: ["label", "text", "image"],
  data() {
    return {
      imageUrl: process.env.VUE_APP_URL + this.image,
      uploadUrl: process.env.VUE_APP_URL + "/question/upload"
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);

      //上传成功后的图片信息
      var imgPath = res.data.url;
      //图片上传成功后，将修改后的图片数据发送给外界的select_options中的image里
      this.$emit("changeImg", imgPath);
    },
    beforeAvatarUpload(file) {
      const isType = file.type == "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isType) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isType && isLt2M;
    }
  }
};
</script>

<style lang="less">
.cutRadio {
  margin-top: 45px;
  .el-radio {
    display: flex;
    align-items: center;
  }
  .el-radio__label {
    display: flex;
    align-items: center;
  }
  .cutSpan {
    margin: 0 30px 0 10px;
  }
  .cutIpt {
    margin-right: 20px;
    width: 476px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>