<template>
  <el-container class="box">
    <el-header>
      <div class="left">
        <i class="el-icon-s-fold" @click="isCollapse=!isCollapse"></i>
        <img src="../../assets/矢量智能对象 拷贝 9 (1).png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="$store.state.userImg" alt />
        <span class="word">{{$store.state.username}},您好!</span>
        <el-button type="primary" size="mini" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <!--侧边栏-->
        <el-menu :router="true" class="el-menu-vertical-demo" :collapse="isCollapse">
          <template v-for="(item, index) in child">
            <el-menu-item
              :key="index"
              v-if="item.meta.roles.includes($store.state.role)"
              :index="item.meta.fullpath"
            >
              <i class="el-icon-pie-chart"></i>
              <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </template>
          <!-- <el-menu-item v-if="['管理员','老师'].includes($store.state.role)" index="chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>-->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import child from "../../router/childRouter";
import { apiLogout } from "@/api/index.js";
import { removeToken } from "../../utils/mytoken";

export default {
  data() {
    return {
      userImg: "",
      userInfo: "",
      isCollapse: false,
      //生成导航的数据源
      child: child
    };
  },
  methods: {
    //推迟登录
    logout() {
      this.$confirm("请确认退出登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiLogout().then(res => {
            if (res.data.code == 200) {
              removeToken();
              this.$router.push("/login");
              this.$message({
                type: "success",
                message: "已退出登录!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消"
          });
        });
    }
  }
};
</script>

<style lang="less">
.box {
  height: 100%;

  .el-header {
    background-color: #ffffff;
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        margin-right: 22px;
      }
      img {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      span {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        border-radius: 43px;
        width: 43px;
        height: 43px;
        margin-right: 9px;
      }
      .word {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }

  .el-aside {
    background-color: #ffffff;
    color: #333;

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 201px;
      min-height: 400px;
    }
  }

  .el-main {
    background-color: #e8e9ec;
    color: #333;
  }
}
</style>