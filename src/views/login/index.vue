<template>
  <div class="login">
    <div class="leftBox">
      <div class="title">
        <img class="left_topImg" src="../../assets/矢量智能对象 拷贝 9.png" alt />
        <span class="title_name">黑马面面</span>
        <span class="title_line"></span>
        <span class="title_login">用户登录</span>
      </div>
      <div>
        <el-input placeholder="请输入手机号" prefix-icon="el-icon-search" v-model="input1"></el-input>
        <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="input2" show-password></el-input>
        <div>
          <el-input placeholder="请输验证码" prefix-icon="el-icon-key" v-model="input3"></el-input>
          <span></span>
        </div>
      </div>
    </div>
    <img class="rightImg" src="../../assets/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: "",
      input2: "",
      input3: ""
    };
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
  }
  .rightImg {
    width: 633px;
    height: 435px;
  }
}
</style>