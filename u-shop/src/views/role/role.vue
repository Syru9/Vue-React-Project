<template>
  <div>
    <breadcrumb />
    <el-button @click="add" round size="small">添加</el-button>
    <roleTable @edit="edit" />
    <hoverForm ref="form" :inState="inState" />
  </div>
</template>

<script>
import roleTable from "./table";
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
  components: {
    roleTable,
    hoverForm,
  },
  methods: {
    add() {
      this.inState.isShow = true;
      this.inState.mode = "add";
    },
    edit(e) {
      this.inState.isShow = true;
      this.inState.mode = "edit";
      this.$refs.form.getOne(e)
    },
  },
};
</script>

<style lang='less' scoped>
.el-button {
  margin: 20px 0;
}
</style>