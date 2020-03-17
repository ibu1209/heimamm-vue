<template>
  <div class="login">
    <div class="leftBox">
      <!--title区域-->
      <div class="title">
        <img class="left_topImg" src="../../assets/矢量智能对象 拷贝 9.png" alt />
        <span class="title_name">黑马面面</span>
        <span class="title_line"></span>
        <span class="title_login">用户登录</span>
      </div>
      <!--表单区域-->
      <el-form class="loginFrom" :rules="rules" ref="form" :model="form" label-width="0">
        <el-form-item prop="name">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="yzm">
          <el-row>
            <el-col :span="17">
              <el-input placeholder="请输验证码" prefix-icon="el-icon-key" v-model="form.yzm"></el-input>
            </el-col>
            <el-col :span="7">
              <img class="loginCode" src="../../assets/login_banner_ele.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="form.check">
            我已阅读并同意
            <el-link type="primary" href="#" target="_blank">用户协议</el-link>和
            <el-link type="primary" href="#" target="_blank">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" class="loginBtn">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginBtn" @click="dialogFormVisible = true">注册</el-button>
          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="活动名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>
    <img class="rightImg" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: "",
        yzm: "",
        check: []
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
        name: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度应为11位数字", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 14, message: "密码不低于6位数字", trigger: "blur" }
        ],
        yzm: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "请输入正确验证码", trigger: "blur" }
        ],
        check: [
          {
            type: "array",
            required: true,
            message: "请先阅读用户相关条款",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message({
            showClose: true,
            message: "登录成功",
            type: "success"
          });
        } else {
          this.$message.error("登录失败");
        }
      });
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(1, 198, 250, 1),
    rgba(20, 147, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;

  .leftBox {
    padding: 48px 42px 86px;
    box-sizing: border-box;
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);

    .title {
      display: flex;
      align-items: center;

      .left_topImg {
        width: 22px;
        height: 17px;
      }
      .title_login {
        margin-left: 11.9px;
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
      .title_line {
        margin-left: 14.4px;
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
      }
      .title_name {
        margin-left: 16px;
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }

    .loginFrom {
      margin-top: 29px;

      .loginCode {
        width: 100%;
        height: 40px;
      }

      /deep/ .el-form-item__content {
        line-height: 20px;
      }

      .loginBtn {
        width: 100%;
      }
    }
  }
  .rightImg {
    width: 633px;
    height: 435px;
  }
}
</style>