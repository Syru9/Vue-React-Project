<template>
  <div>
    <breadcrumb />
    <el-button round size="small" @click="add">添加</el-button>
    <banner-table @getOne="getOne" />
    <hover-form :inState="inState" ref="form" />
  </div>
</template>

<script>
import hoverForm from "./hoverForm";
import bannerTable from "./table";
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
    bannerTable,
  },
  methods: {
    add() {
      this.inState.isShow = true;
      this.inState.mode = "add";
    },
    getOne(id){
      this.$refs.form.getOne(id)
    }
  },
};
</script>

<style lang='' scoped>
.el-button{
  margin: 20px 0;
}
</style>