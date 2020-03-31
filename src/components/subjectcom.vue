<template>
  <el-select :value="value" @input="v=>{$emit('input',v)}" placeholder="请选择学科">
    <el-option :label="item.name" :value="item.id" v-for="(item, index) in subList" :key="index"></el-option>
  </el-select>
  <!-- <el-select class="short" v-model="subject" placeholder="请选择学科">
    <el-option :label="item.name" :value="item.id" v-for="(item, index) in subList" :key="index"></el-option>
  </el-select>-->
</template>

<script>
import { apiGetSubject } from "../api/subject";
export default {
  props: ["value"],
  data() {
    return {
      // subject: "",
      subList: []
    };
  },
  methods: {
    getSubject() {
      apiGetSubject({}).then(res => {
        // window.console.log(res);
        this.subList = res.data.data.items;
      });
    }
  },
  created() {
    this.getSubject();
    // this.subject = this.value;
  }
  // watch: {
  //   subject: function() {
  //     this.$emit("input", this.subject);
  //   }
  // }
};
</script>

<style>
</style>