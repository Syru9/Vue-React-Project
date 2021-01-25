<!-- 管理员管理 -->
<template>
  <div>
    <breadcrumb />
    <el-button round size="small" @click="add">添加</el-button>
    <admin-table @edit="edit" />
    <hover-form ref="hoverForm" :inState="inState" />
  </div>
</template>

<script>
import adminTable from "./table";
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
    adminTable,
    hoverForm,
  },
  methods: {
    add() {
      this.inState.isShow = true;
      this.inState.mode = "add";
    },
    edit(e) {
      this.inState.isShow = true;
      this.inState.mode = 'edit';
      this.$refs.hoverForm.form = e;
    },
  },
};
</script>

<style lang='less' scoped>
.el-button {
  margin: 20px 0;
}
</style>