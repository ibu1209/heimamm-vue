<template>
  <div>
    <el-card class="box-card">
      <el-form class="demo-form-inline" :inline="true" ref="form" :model="form">
        <el-form-item label="学科编号">
          <el-input class="short" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input class="long" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="short" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="long" v-model="form.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary" @click="onSubmit">
            <i class="el-icon-plus"></i> 新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="infoCard">
      <template>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="name" label="学生编号"></el-table-column>
          <el-table-column prop="address" label="学科名称"></el-table-column>
          <el-table-column prop="date" label="简称"></el-table-column>
          <el-table-column prop="name" label="创建者"></el-table-column>
          <el-table-column prop="address" label="创建日期"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">{{scope.row.sb?'禁用':'启用'}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!--slot-scope="scope" 数据源-->
              <el-button type="text" size="small">编辑</el-button>
              <el-button
                type="text"
                size="small"
                @click="scope.row.sb=!scope.row.sb"
              >{{scope.row.sb?'启用':'禁用'}}</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        background
        class="myPage"
        :current-page="currentPage"
        :page-sizes="sizeMath"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      sizeMath: [10, 20, 30],
      pageSize: 10,
      total: 30,
      form: {
        name: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          sb: false
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          sb: false
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          sb: false
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          sb: false
        }
      ]
    };
  },
  methods: {
    onSubmit() {}
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