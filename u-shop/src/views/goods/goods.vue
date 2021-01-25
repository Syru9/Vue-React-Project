<template>
  <div>
    <breadcrumb />
    <el-button round size="small" @click="add">添加</el-button>
    <goods-table @getOne="getOne" />
    <hover-form :inState="inState" ref="form" />
  </div>
</template>

<script>
import goodsTable from "./table";
import hoverForm from "./hoverForm";
export default {
  data() {
    return {
      inState: {
        isShow: false,
        mode: "add",
      },
    };
  },
  methods: {
    add() {
      this.inState = {
        isShow: true,
        mode: "add",
      };
    },
    getOne(id) {
      this.$refs.form.getOne(id);
    },
  },
  components: {
    goodsTable,
    hoverForm,
  },
};
</script>

<style lang='less' scoped>
.el-button {
  margin: 20px 0;
}
</style>