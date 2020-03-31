<template>
  <el-cascader
    :options="options"
    :props="{value:'label'}"
    @input="v=>$emit('input',v)"
    :value="value"
  ></el-cascader>
</template>

<script>
import { regionDataPlus } from "element-china-area-data";
export default {
  props: ["value"],
  data() {
    return {
      options: regionDataPlus
    };
  },
  methods: {}
};
</script>

<style>
</style>