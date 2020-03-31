<template>
  <el-dialog :fullscreen="true" :title="title" :visible.sync="dialogFormVisible">
    <el-form class="aeStyle" label-position="left" :model="form" ref="form">
      <el-form-item label="学科" :label-width="formLabelWidth">
        <subjectcom class="itStyle" v-model="form.subject"></subjectcom>
      </el-form-item>
      <el-form-item label="阶段" :label-width="formLabelWidth">
        <el-select class="itStyle" v-model="form.step" placeholder="请选择阶段">
          <el-option value></el-option>
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" :label-width="formLabelWidth">
        <el-select class="itStyle" v-model="form.enterprise" placeholder="请选择企业">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in this.$parent.enterprise"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <city class="itStyle" v-model="form.city"></city>
      </el-form-item>
      <el-form-item label="题型" :label-width="formLabelWidth">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" :label-width="formLabelWidth">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div class="line"></div>
      </el-form-item>
      <el-form-item label="试题标题" :label-width="formLabelWidth">
        <quill-editor @change="titleChange($event)" :content="form.title"></quill-editor>
      </el-form-item>
      <el-form-item v-if="form.type==1" label="单选" :label-width="formLabelWidth">
        <el-radio-group v-model="form.single_select_answer">
          <Iradio
            :label="item.label"
            :text="item.text"
            :image="item.image"
            @changeTxt="v=>{item.text=v}"
            @changeImg="v=>{item.image=v}"
            v-for="(item, index) in form.select_options"
            :key="index"
          ></Iradio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="form.type==2" label="多选" :label-width="formLabelWidth">
        <el-checkbox-group v-model="form.multiple_select_answer">
          <Icheck
            :label="item.label"
            :text="item.text"
            :image="item.image"
            @changeTxt="v=>{item.text=v}"
            @changeImg="v=>{item.image=v}"
            v-for="(item, index) in form.select_options"
            :key="index"
          ></Icheck>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="form.type==3" label="简答" :label-width="formLabelWidth">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.short_answer"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="line"></div>
      </el-form-item>
      <el-form-item label="解析视频" :label-width="formLabelWidth">
        <Ivideo v-model="form.video"></Ivideo>
      </el-form-item>
      <el-form-item>
        <div class="line"></div>
      </el-form-item>
      <el-form-item label="答案解析" :label-width="formLabelWidth">
        <quill-editor @change="anChange($event)" :content="form.answer_analyze"></quill-editor>
      </el-form-item>
      <el-form-item>
        <div class="line"></div>
      </el-form-item>
      <el-form-item label="试题备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitQtion">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Iradio from "./Iradio";
import Icheck from "./Icheck";
import Ivideo from "./Ivideo";
import { apiAddQtion, apiEditQtion } from "../../../../api/question";
export default {
  data() {
    return {
      title: "",
      formLabelWidth: "72px",
      dialogFormVisible: false,
      form: {
        id: "",
        title: "",
        subject: "",
        step: "",
        enterprise: "",
        city: [],
        type: "",
        difficulty: "",
        multiple_select_answer: [],
        single_select_answer: "",
        short_answer: "",
        video: "",
        answer_analyze: "",
        remark: "",
        select_options: [],
        mvPath: process.env.VUE_APP_URL + "/question/upload"
      }
    };
  },
  methods: {
    titleChange(e) {
      this.form.title = e.text;
    },
    anChange(e) {
      this.form.answer_analyze = e.text;
    },
    submitQtion() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.title == "新增题库测试") {
            apiAddQtion(this.form).then(res => {
              if (res.data.code == 200) {
                //提示新增成功
                this.$message.success("添加完成");
                //关闭面板
                this.dialogFormVisible = false;
                //重置面板中的数据
                this.$refs.form.resetFields();
                //刷新数据：调用父组件中的方法
                this.$parent.getQuestion();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else if (this.title == "修改题目") {
            apiEditQtion(this.form).then(res => {
              // window.console.log(res);
              if (res.data.code == 200) {
                //提示修改成功
                this.$message.success("修改成功");
                //关闭面板
                this.dialogFormVisible = false;
                //重置面板中的数据
                this.$refs.form.resetFields();
                //刷新数据：调用父组件中的方法
                this.$parent.getQuestion();
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
  },
  components: {
    Iradio,
    Icheck,
    Ivideo
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #03c0f9, #1396fb);
  .el-dialog__title {
    color: white;
  }
}

.dialog-footer {
  text-align: center;
}
.aeStyle {
  width: 832px;
  margin: 0 auto;

  .itStyle {
    width: 364px;
  }

  .line {
    margin-top: 10px;
    height: 1px;
    background-color: rgba(170, 170, 170, 1);
  }
}
</style>