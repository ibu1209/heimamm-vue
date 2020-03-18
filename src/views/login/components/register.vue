<template>
  <el-dialog class="reg_dialog" title="用户注册" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="registerForm">
      <el-form-item prop="imgUpdata" label="头像" :label-width="formLabelWidth" class="imgUpdata">
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
      <el-form-item prop="name" label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="imgCode" label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input placeholder="请输图形码" v-model="form.imgCode"></el-input>
          </el-col>
          <el-col class="codeRight" :span="7">
            <img class="zcCode" src="../../../assets/login_banner_ele.png" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="yzm" label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input placeholder="请输验证码" v-model="form.yzm"></el-input>
          </el-col>
          <el-col class="codeRight" :span="7">
            <button class="zcCode">获取用户验证码</button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitData">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("手机号码格式不正确"));
      }
    };

    var validateEmail = (rule, value, callback) => {
      var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("邮箱填写不正确"));
      }
    };

    return {
      formLabelWidth: "67px",
      dialogFormVisible: false,
      imageUrl: "",
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        imgCode: "",
        yzm: ""
      },

      rules: {
        imgUpdata: [{ required: true, message: "请上传头像" }],
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: validateEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        imgCode: [
          { required: true, message: "请输入图形码", trigger: "blur" },
          { min: 4, max: 4, message: "图形码为4位数", trigger: "blur" }
        ],
        yzm: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码为4位数", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitData() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$message({
            showClose: true,
            message: "注册成功",
            type: "success"
          });
        } else {
          this.$message.error("注册失败");
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
.reg_dialog {
  .el-dialog__header {
    padding: 0;
    height: 53px;
    line-height: 53px;
    text-align: center;
    background: linear-gradient(to right, #03c0f9, #1396fb);

    .el-dialog__title {
      color: #fff;
    }
  }

  .codeRight {
    height: 41px;
    text-align: right;
    .zcCode {
      width: 143px;
      height: 41px;
    }
  }

  .dialog-footer {
    text-align: center;
  }

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
}
</style>