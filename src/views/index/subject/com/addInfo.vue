<template>
  <el-dialog class="Add_Edit" :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="addInfoForm">
      <el-form-item prop="rid" label="活动名称" :label-width="formLabelWidth">
        <el-input v-model="form.rid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="学科名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="add_eidt">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { apiAddSubject, apiEidtSubject } from "../../../../api/subject.js";
export default {
  data() {
    return {
      form: {
        id: "",
        rid: "",
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
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    add_eidt() {
      this.$refs.addInfoForm.validate(valid => {
        if (valid) {
          if (this.title == "新增学科") {
            apiAddSubject(this.form).then(res => {
              if (res.data.code == 200) {
                //提示新增成功
                this.$message.success("添加完成");
                //关闭面板
                this.dialogFormVisible = false;
                //重置面板中的数据
                this.$refs.addInfoForm.resetFields();
                //重置面板中其它数据
                this.form.short_name = "";
                this.form.intro = "";
                this.form.remaark = "";
                this.title = "";
                //刷新数据：调用父组件中的方法
                this.$parent.getSubject();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else if (this.title == "修改信息") {
            apiEidtSubject(this.form).then(res => {
              // window.console.log(res);
              if (res.data.code == 200) {
                //提示修改成功
                this.$message.success("修改成功");
                //关闭面板
                this.dialogFormVisible = false;
                //重置面板中的数据
                this.$refs.addInfoForm.resetFields();
                //重置面板中其它数据
                this.form.short_name = "";
                this.form.intro = "";
                this.form.remark = "";
                //刷新数据：调用父组件中的方法
                this.$parent.getSubject();
              } else{
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

<style scoped lang="less">
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