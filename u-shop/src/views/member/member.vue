<template>
  <div>
    <breadcrumb />
    <member-table @getOne="getOne" />
    <hover-form :inState="inState" ref="form" />
  </div>
</template>

<script>
import hoverForm from "./hoverForm";
import memberTable from "./table";
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
    memberTable,
  },
  methods: {
    getOne(uid){
      this.$refs.form.getOne(uid)
    }
  },
};
</script>

<style lang='' scoped>
.el-breadcrumb {
  margin: 0 0 20px;
}
</style>