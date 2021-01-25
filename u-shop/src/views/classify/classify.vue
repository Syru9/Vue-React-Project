<template>
  <div>
    <breadcrumb />
    <el-button round size="small" @click="add">添加</el-button>
    <classify-table @getClassifyInfo="getClassifyInfo" />
    <hover-form :inState="inState" ref="hoverForm" />
  </div>
</template>

<script>
import hoverForm from "./hoverForm";
import classifyTable from "./table";
export default {
  data() {
    return {
      inState: {
        isShow: false,
        mode: "add",
      },
    };
  },
  components: {
    classifyTable,
    hoverForm,
  },
  methods: {
    add() {
      this.inState = {
        isShow: true,
        mode: "add",
      };
    },
    getClassifyInfo(data) {
      this.$refs.hoverForm.getOne(data);
    },
  },
};
</script>

<style lang='' scoped>
.el-button {
  margin: 20px 0;
}
</style>