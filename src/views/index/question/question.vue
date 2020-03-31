<template>
  <div>
    <el-card class="box-card">
      <el-form
        label-width="60px"
        label-position="left"
        :inline="true"
        :model="obj"
        class="demo-form-inline"
      >
        <div class="qTop">
          <el-form-item label="学科" class="marginGo">
            <!-- <el-select class="short" v-model="obj.subject" placeholder="请选择学科">
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item, index) in subject"
                :key="index"
              ></el-option>
            </el-select>-->
            <!-- <subjectcom :value="obj.subject" @input="changeSub"></subjectcom> -->
            <subjectcom class="short" v-model="obj.subject"></subjectcom>
          </el-form-item>
          <el-form-item label="阶段" class="marginGo">
            <el-select class="short" v-model="obj.step" placeholder="请选择阶段">
              <el-option value></el-option>
              <el-option label="初级" :value="1"></el-option>
              <el-option label="中级" :value="2"></el-option>
              <el-option label="高级" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业" class="marginGo">
            <el-select class="short" v-model="obj.enterprise" placeholder="请选择企业">
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item, index) in enterprise"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型" class="marginGo">
            <el-select class="short" v-model="obj.type" placeholder="请选择题型">
              <el-option value></el-option>
              <el-option label="单选" :value="1"></el-option>
              <el-option label="多选" :value="2"></el-option>
              <el-option label="简答" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="qCenter">
          <el-form-item label="难度" class="marginGo">
            <el-select class="short" v-model="obj.difficulty" placeholder="请选择难度">
              <el-option value></el-option>
              <el-option label="简单" :value="1"></el-option>
              <el-option label="一般" :value="2"></el-option>
              <el-option label="困难" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者" class="marginGo">
            <el-input class="short" v-model="obj.username"></el-input>
          </el-form-item>
          <el-form-item label="状态" class="marginGo">
            <el-select class="short" v-model="obj.status" placeholder="请选择状态">
              <el-option value></el-option>
              <el-option label="禁用" :value="0"></el-option>
              <el-option label="启用" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" class="marginGo">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="obj.create_date"
              style="width: 150px;"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="qBottom">
          <el-form-item label="标题" class="marginGo">
            <el-input class="long" v-model="obj.title"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="findQtion" type="primary">搜索</el-button>
            <el-button @click="clearInfo">清除</el-button>
            <el-button type="primary" @click="onAdd">
              <i class="el-icon-plus"></i> 新增试题
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <el-card class="infoCard">
      <template>
        <el-table :data="question" border style="width: 100%">
          <el-table-column header-align="center" type="index" label="序号"></el-table-column>
          <el-table-column header-align="center" prop="title" label="题目">
            <template slot-scope="scope">
              <span v-html="scope.row.title"></span>
            </template>
          </el-table-column>
          <el-table-column header-align="center" prop="step" label="学科·阶段">
            <template slot-scope="scope">
              {{scope.row.subject_name}} ·
              <span v-if="scope.row.step==1">初级</span>
              <span v-if="scope.row.step==2">中级</span>
              <span v-if="scope.row.step==3">高级</span>
            </template>
          </el-table-column>
          <el-table-column header-align="center" prop="type" label="题型">
            <template slot-scope="scope">
              <span v-if="scope.row.type==1">单选</span>
              <span v-if="scope.row.type==2">多选</span>
              <span v-if="scope.row.type==3">简答</span>
            </template>
          </el-table-column>
          <el-table-column header-align="center" prop="enterprise_name" label="企业"></el-table-column>
          <el-table-column header-align="center" prop="username" label="创建者"></el-table-column>
          <el-table-column header-align="center" label="状态">
            <template slot-scope="scope">{{scope.row.status==0?"禁用":"启用"}}</template>
          </el-table-column>
          <el-table-column header-align="center" prop="reads" label="访问量"></el-table-column>
          <el-table-column header-align="center" label="操作">
            <template slot-scope="scope">
              <!--scope.row 数据源-->
              <el-button @click="onEdit(scope.row)" type="text" size="small">编辑</el-button>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="obj.page"
        :page-sizes="[2,4,8]"
        :page-size="obj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >></el-pagination>
    </el-card>
    <addInfo ref="addInfo"></addInfo>
  </div>
</template>

<script>
import addInfo from "./com/addInfo";
import subjectcom from "../../../components/subjectcom";
// import { apiGetSubject } from "../../../api/subject.js";
import { apiGetEnterprise } from "../../../api/enterprise";
import { apiGetQuestion, apiStatus, apiDelQtion } from "../../../api/question";
export default {
  data() {
    return {
      total: 0,
      question: [],
      // subject: [],
      enterprise: [],
      obj: {
        page: 1,
        limit: 4,
        title: "",
        subject: "",
        enterprise: "",
        type: "",
        step: "",
        username: "",
        status: "",
        difficulty: "",
        create_date: ""
      }
    };
  },
  components: {
    subjectcom,
    addInfo
  },
  methods: {
    onAdd() {
      if (this.$refs.addInfo.form.id) {
        this.$refs.addInfo.$refs.ruleForm.resetFields();
      }
      this.$refs.addInfo.title = "新增题库测试";
      this.$refs.addInfo.dialogFormVisible = true;
    },
    onEdit(row) {
      if (row.id != this.$refs.addInfo.form.id) {
        //解决同步修改问题：把数据源修改后就不再双向绑定了！
        this.$refs.addInfo.form = JSON.parse(JSON.stringify(row));
      }
      this.$refs.addInfo.title = "修改题目";
      this.$refs.addInfo.dialogFormVisible = true;
    },
    clearInfo() {},
    findQtion() {
      this.getQuestion();
    },
    delInfo(row) {
      this.$confirm("此操作将永久删除该文件", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiDelQtion(row.id).then(res => {
            if (res.data.code == 200) {
              if (this.subjectList.length == 1) {
                this.obj.page = this.obj.page - 1;
              }
              this.$message.success("删除成功");
              this.getQuestion();
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
    changeStatus(row) {
      apiStatus(row.id).then(res => {
        window.console.log(res);
        if (res.data.code == 200) {
          if (row.status == 0) {
            this.$message.success("已启用");
          } else {
            this.$message.success("已禁用");
          }
          this.getQuestion();
        }
      });
    },
    getEnterprise() {
      apiGetEnterprise({}).then(res => {
        // window.console.log(res);
        this.enterprise = res.data.data.items;
      });
    },
    getQuestion() {
      apiGetQuestion(this.obj).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          this.question = res.data.data.items;
          this.total = res.data.data.pagination.total;
        }
      });
    },
    // changeSub(value) {
    //   this.obj.subject = value;
    // },
    handleSizeChange(index) {
      this.limit = index;
      this.getQuestion();
    },
    handleCurrentChange(index) {
      this.page = index;
      this.getQuestion();
    }
  },
  created() {
    this.getEnterprise();
    this.getQuestion();
  }
};
</script>

<style scoped lang="less">
.box-card {
  .qTop,
  .qCenter,
  .qBottom {
    margin-bottom: 23px;
    .marginGo {
      margin-left: 21px;
    }
  }
  .short {
    width: 150px;
  }
  .long {
    width: 388px;
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