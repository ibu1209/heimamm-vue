<template>
  <el-dialog class="Add_Edit" :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="form" ref="ruleForm" :rules="rules">
      <el-form-item class="imgUpdata" label="头像" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="电话" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="role_id" label="角色" :label-width="formLabelWidth">
        <el-select v-model="form.role_id" placeholder="请选择角色">
          <el-option value></el-option>
          <el-option label="管理员" :value="2"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option value></el-option>
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="remark" label="用户备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { apiAddUser, apiEditUser } from "../../../../api/user";
import { validateEmail, validatePhone } from "../../../../utils/mycheck";
export default {
  data() {
    return {
      imageUrl: "",
      title: "",
      value: "",
      formLabelWidth: "80px",
      dialogFormVisible: false,
      form: {
        id: "",
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }]
      }
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.title == "新增用户") {
            apiAddUser(this.form).then(res => {
              if (res.data.code == 200) {
                this.$message.success("新增成功");
                //关闭面板
                this.dialogFormVisible = false;
                //重置面板中的数据
                this.$refs.ruleForm.resetFields();
              } else if (res.data.message == "邮箱已存在") {
                this.$message.error(res.data.message);
              } else if (res.data.message == "用户名已存在") {
                this.$message.error(res.data.message);
              } else if (res.data.message == "手机号重复") {
                this.$message.error(res.data.message);
              }
            });
          } else if (this.title == "修改用户") {
            apiEditUser(this.form).then(res => {
              //   window.console.log(res);
              if (res.data.code == 200) {
                //提示修改成功
                this.$message.success("修改成功");
                //关闭面板
                this.dialogFormVisible = false;
                //重置面板中的数据
                this.$refs.ruleForm.resetFields();
                //刷新数据：调用父组件中的方法
                this.$parent.getUser();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        } else {
          window.console.log("校验不通过");
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.Add_Edit {
  .el-dialog {
    width: 517px;

    .imgUpdata {
      text-align: center;
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
    .el-dialog__header {
      text-align: center;
      background-color: #0ea1fa;

      .el-dialog__title {
        color: white;
      }
    }
    .dialog-footer {
      text-align: center;
    }
  }
}
</style>