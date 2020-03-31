<template>
  <div>
    <el-card class="box-card">
      <el-form class="demo-form-inline" :inline="true">
        <el-form-item label="用户名称">
          <el-input class="short" v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input class="long" v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="userInfo.role_id" class="long" placeholder="请选择状态">
            <el-option value></el-option>
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clear">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser">
            <i class="el-icon-plus"></i> 新增用户
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="someCard">
      <template>
        <el-table :data="userList" :border="true" style="width: 100%">
          <el-table-column header-align="center" type="index" label="序号"></el-table-column>
          <el-table-column header-align="center" prop="username" label="用户名"></el-table-column>
          <el-table-column header-align="center" prop="phone" label="电话"></el-table-column>
          <el-table-column header-align="center" prop="email" label="邮箱"></el-table-column>
          <el-table-column header-align="center" prop="role" label="角色"></el-table-column>
          <el-table-column header-align="center" prop="remark" label="备注"></el-table-column>
          <el-table-column header-align="center" label="状态">
            <template slot-scope="scope">{{scope.row.status==0?'禁用':'启用'}}</template>
          </el-table-column>
          <el-table-column header-align="center" label="操作">
            <template slot-scope="scope">
              <!--scope.row 数据源-->
              <el-button @click="editUser(scope.row)" type="text" size="small">编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="changeStatus(scope.row)"
              >{{scope.row.status==0?'启用':'禁用'}}</el-button>
              <el-button type="text" size="small" @click="delInfo(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        class="myPage"
        background
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="userInfo.page"
        :page-sizes="sizeMath"
        :page-size="userInfo.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <addInfo ref="addInfo"></addInfo>
  </div>
</template>

<script>
import { apiGetUser, apiRemoveUser, apiUserStatus } from "../../../api/user";
import addInfo from "./com/addInfo";

export default {
  data() {
    return {
      userList: [],
      sizeMath: [2, 4, 8],
      total: 0,
      value: "",
      userInfo: {
        username: "",
        email: "",
        role_id: "",
        page: 1,
        limit: 4
      }
    };
  },
  methods: {
    editUser(row) {
      if (row.id != this.$refs.addInfo.form.id) {
        //解决同步修改问题：把数据源修改后就不再双向绑定了！
        this.$refs.addInfo.form = JSON.parse(JSON.stringify(row));
      }
      this.$refs.addInfo.title = "修改用户";
      this.$refs.addInfo.dialogFormVisible = true;
    },
    addUser() {
      if (this.$refs.addInfo.form.id) {
        this.$refs.addInfo.$refs.ruleForm.resetFields();
      }
      this.$refs.addInfo.title = "新增用户";
      this.$refs.addInfo.dialogFormVisible = true;
    },
    changeStatus(row) {
      apiUserStatus(row.id).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          if (row.status == 0) {
            this.$message.success("已启用");
          } else {
            this.$message.success("已禁用");
          }
        }
        this.getUser();
      });
    },
    delInfo(row) {
      this.$confirm("此操作将永久删除该数据", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiRemoveUser(row.id).then(res => {
            if (res.data.code == 200) {
              // console.log(this.subjectList.length)
              if (this.userList.length == 1) {
                this.userInfo.page = this.userInfo.page - 1;
              }
              this.$message.success("删除成功");
              this.getUser();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    clear() {
      this.userInfo.username = "";
      this.userInfo.email = "";
      this.userInfo.role_id = "";
    },
    search() {
      this.getUser();
    },
    sizeChange(index) {
      this.userInfo.limit = index;
      this.getUser();
    },
    currentChange(index) {
      this.userInfo.page = index;
      this.getUser();
    },
    getUser() {
      apiGetUser(this.userInfo).then(res => {
        // window.console.log(res);
        this.userList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    }
  },
  created() {
    this.getUser();
  },
  components: {
    addInfo
  }
};
</script>

<style lang="less">
.box-card {
  .el-form-item {
    margin-bottom: 0px;
  }
  .short {
    width: 100px;
  }
  .long {
    width: 150px;
  }
}
.someCard {
  margin-top: 20px;
  .myPage {
    text-align: center;
    margin-top: 30px;
  }
}
</style>