<template>
  <el-dialog class="Add_Edit" :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="addInfoForm">
      <el-form-item prop="eid" label="企业编号" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="企业简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="企业简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="企业备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="add_edit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  apiAddEnterprise,
  apiEditEnterprise
} from "../../../../api/enterprise";
export default {
  data() {
    return {
      form: {
        id: "",
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      title: "",
      formLabelWidth: "102px",
      dialogFormVisible: false,
      dialogTableVisible: false,
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "blur" }
        ],
        intro: [{ required: true, message: "请输入企业简介", trigger: "blur" }],
        remark: []
      }
    };
  },
  methods: {
    add_edit() {
      this.$refs.addInfoForm.validate(valid => {
        if (valid) {
          if (this.title == "新增企业") {
            apiAddEnterprise(this.form).then(res => {
              // window.console.log(res);
              if (res.data.code == 200) {
                //提示新增成功
                this.$message.success("添加完成");
                //关闭面板
                this.dialogFormVisible = false;
                //重置面板中的数据
                this.$refs.addInfoForm.resetFields();
                //刷新数据：调用父组件中的方法
                this.$parent.getEnterprise();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else if (this.title == "修改信息") {
            apiEditEnterprise(this.form).then(res => {
              // window.console.log(res);
              if (res.data.code == 200) {
                //提示修改成功
                this.$message.success("修改成功");
                //关闭面板
                this.dialogFormVisible = false;
                //重置面板中的数据
                this.$refs.addInfoForm.resetFields();
                //刷新数据：调用父组件中的方法
                this.$parent.getEnterprise();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        } else {
          window.console.log("校验不通过");
        }
      });
    }
  }
};
</script>

<style lang="less">
.Add_Edit {
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
</style>