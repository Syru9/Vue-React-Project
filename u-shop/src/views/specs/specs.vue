<template>
  <div>
    <breadcrumb />
    <el-button round size="small" @click="add">添加</el-button>
    <specs-table @getOne="getOne" />
    <hover-form :inState="inState" ref="form" />
  </div>
</template>

<script>
import hoverForm from "./hoverForm";
import specsTable from "./table";
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
    hoverForm,
    specsTable,
  },
  methods: {
    // 获取一条数据
    getOne(id){
      this.inState.isShow = true;
      this.inState.mode = 'edit';
      this.$refs.form.getOne(id);
    },
    add() {
      this.inState.isShow = true;
      this.inState.mode = "add";
    },
  },
};
</script>

<style lang='' scoped>
.el-button{
  margin: 20px 0;
}
</style>