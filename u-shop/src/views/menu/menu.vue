// *菜单管理
<template>
  <div>
    <breadcrumb />
    <el-button round size="small" @click="add">添加</el-button>
    <menu-table @getInfo="getInfo" ref="table"></menu-table>
    <hover-form
      :inState="inState"
      @cancel="cancel"
      ref="hoverForm"
    ></hover-form>
  </div>
</template>

<script>
import menuTable from "./table";
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
    menuTable,
    hoverForm,
  },
  methods: {
    cancel() {
      this.inState.isShow = false;
    },
    add() {
      this.inState.mode = "add";
      this.inState.isShow = true;
    },
    getInfo(e, id) {
      this.inState.mode = "edit";
      this.inState.isShow = true;
      this.$refs.hoverForm.form = e;
      // 执行修改
      console.log(id);
      this.$refs.hoverForm.editId = id;
    },
  },
};
</script>

<style lang='' scoped>
.el-button {
  margin: 20px 0;
}
</style>