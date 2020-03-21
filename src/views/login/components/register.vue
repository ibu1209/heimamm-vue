<template>
  <el-dialog
    :close-on-click-modal="false"
    class="reg_dialog"
    title="用户注册"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :rules="rules" ref="registerForm">
      <el-form-item prop="imgUpdata" label="头像" :label-width="formLabelWidth" class="imgUpdata">
        <el-upload
          class="avatar-uploader"
          :action="imageUpload"
          name="image"
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
            <el-input placeholder="请输入图形码" v-model="form.imgCode"></el-input>
          </el-col>
          <el-col class="codeRight" :span="7">
            <img @dblclick="newUrl" class="zcCode" :src="imgCodeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="yzm" label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input placeholder="请输入验证码" v-model="form.yzm"></el-input>
          </el-col>
          <el-col class="codeRight" :span="7">
            <button
              :disabled="time!==0"
              @click="getCode"
              class="zcCode"
            >{{time===0?'获取手机验证码':time+'s'}}</button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="submitData">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入api方法
import { apiGetCode, apiRegister } from "@/api/register";
import { validatePhone, validateEmail } from "@/utils/mycheck";

export default {
  data() {
    return {
      formLabelWidth: "67px",
      dialogFormVisible: false,
      imageUrl: "",
      imageUpload: process.env.VUE_APP_URL + "/uploads",
      timer: null,
      time: 0,
      imgCodeUrl:
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t" + Date.now(),
      // imgCodeUrl:
      //   "http://127.0.0.1/heimamm/public" +
      //   "/captcha?type=sendsms&t=" +
      //   Math.random(),
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        imgCode: "",
        yzm: "",
        imgUpdata: ""
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
    cancle() {
      this.$refs.registerForm.resetFields();
      this.imageUrl = "";
      this.dialogFormVisible = false;
    },
    submitData() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          apiRegister({
            username: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.imgUpdata,
            password: this.form.password,
            rcode: this.form.yzm
          })
            .then(res => {
              window.console.log(res);
              if (res.data.code == 200) {
                this.$message.success("注册成功");
                this.cancle();
              } else if (res.data.message == "用户名已存在") {
                this.$message.error(res.data.message);
              } else if (res.data.message == "邮箱已存在") {
                this.$message.error(res.data.message);
              }
            })
            .catch(err => {
              window.console.log(err);
            });
        } else {
          this.$message.error("注册失败");
        }
      });
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.imgUpdata = res.data.file_path;
      window.console.log(this.form.imgUpdata);
      this.$refs.registerForm.validateField("imgUpdata");
    },

    beforeAvatarUpload(file) {
      const isType = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isType) {
        this.$message.error("不支持当前上传头像图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isType && isLt2M;
    },

    newUrl() {
      this.imgCodeUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t" + Date.now();
    },

    getCode() {
      //手机号正则表达式
      var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      //判断手机号是否符合这个正则
      if (!phoneReg.test(this.form.phone)) {
        this.$message.error("手机号格式不正确");
        //return就不执行后续代码
        return;
      } else if (this.form.imgCode.trim().length !== 4) {
        this.$message.error("图形码为4位数");
        return;
      }

      this.time = 60;
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        } else if (this.time === 0) {
          clearInterval(this.timer);
        }
      }, 1000);

      //获取手机验证码
      apiGetCode(this.form.imgCode, this.form.phone)
        .then(res => {
          window.console.log(res);
          if (res.data.message == "ok") {
            this.$message.success("手机验证码为：" + res.data.data.captcha);
          } else if (res.data.message == "验证码错误") {
            this.$message.error("图形验证码错误");
          } else if (res.data.message == "已经注册过该手机号") {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          window.console.log(err);
        });
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