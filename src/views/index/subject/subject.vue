<template>
  <div>
    <el-card class="box-card">
      <el-form class="demo-form-inline" :inline="true" ref="form" :model="obj">
        <el-form-item label="学科编号">
          <el-input class="short" v-model="obj.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input class="long" v-model="obj.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="short" v-model="obj.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="obj.status">
            <el-option value label="所有"></el-option>
            <el-option :value="0" label="禁用"></el-option>
            <el-option :value="1" label="启用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="findE">筛选</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button type="primary" @click="onAdd">
            <i class="el-icon-plus"></i> 新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="infoCard">
      <template>
        <el-table :data="subjectList" style="width: 100%">
          <el-table-column type=index label="序号"></el-table-column>
          <el-table-column prop="rid" label="学生编号"></el-table-column>
          <el-table-column prop="name" label="学科名称"></el-table-column>
          <el-table-column prop="short_name" label="简称"></el-table-column>
          <el-table-column prop="username" label="创建者"></el-table-column>
          <el-table-column prop="create_time" label="创建日期">
            <template slot-scope="scope">{{scope.row.create_time|mytime}}</template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">{{scope.row.status==0?'禁用':'启用'}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--scope.row 数据源-->
              <el-button @click="eidtInfo(scope.row)" type="text" size="small">编辑</el-button>
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
        background
        class="myPage"
        @size-change="sizeChange"
        @current-change="curChange"
        :current-page="obj.page"
        :page-sizes="sizeMath"
        :page-size="obj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <addInfo ref="addInfo"></addInfo>
  </div>
</template>

<script>
import { apiGetSubject, apiStatus, apiDelSubject } from "../../../api/subject";
import addInfo from "./com/addInfo";
export default {
  data() {
    return {
      sizeMath: [2, 4, 8],
      total: 0,
      subjectList: [],
      value: "",
      obj: {
        name: "",
        page: 1,
        limit: 4,
        rid: "",
        username: "",
        status: ""
      }
    };
  },
  methods: {
    delInfo(row) {
      this.$confirm("此操作将永久删除该文件", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiDelSubject(row.id).then(res => {
            if (res.data.code == 200) {
              // console.log(this.subjectList.length)
              if (this.subjectList.length == 1) {
                this.obj.page = this.obj.page - 1;
              }
              this.$message.success("删除成功");
              this.getSubject();
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
    eidtInfo(row) {
      if (row.id != this.$refs.addInfo.form.id) {
        //解决同步修改问题：把数据源修改后就不再双向绑定了！
        this.$refs.addInfo.form = JSON.parse(JSON.stringify(row));
      }
      this.$refs.addInfo.title = "修改信息";
      this.$refs.addInfo.dialogFormVisible = true;
    },
    onAdd() {
      this.$refs.addInfo.form = {};
      this.$refs.addInfo.title = "新增学科";
      this.$refs.addInfo.dialogFormVisible = true;
    },
    clear() {
      this.obj.name = "";
      this.obj.rid = "";
      this.obj.username = "";
      this.obj.status = "";
    },
    findE() {
      this.getSubject();
    },
    getSubject() {
      apiGetSubject(this.obj).then(res => {
        this.subjectList = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    curChange(index) {
      //index为默认的值，当前选中的页面
      this.obj.page = index;
      this.getSubject();
    },
    sizeChange(index) {
      this.obj.limit = index;
      this.getSubject();
    },
    //切换状态
    changeStatus(row) {
      apiStatus(row.id).then(res => {
        console.log(res);
        if (res.data.code == 200) {
          if (row.status == 0) {
            this.$message.success("已启用");
          } else {
            this.$message.success("已禁用");
          }
          this.getSubject();
        }
      });
    }
  },
  created() {
    //得到学科列表信息
    this.getSubject();
  },
  components: {
    addInfo
  }
};
</script>

<style lang="less">
.demo-form-inline {
  .short {
    width: 100px;
  }
  .long {
    width: 149px;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
}
.infoCard {
  margin-top: 20px;
  .myPage {
    text-align: center;
    margin-top: 30px;
  }
}
</style>