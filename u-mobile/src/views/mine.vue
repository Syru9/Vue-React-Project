// 个人信息
<template>
  <div class="main">
    <com-title />
    <user-info />
    <userOptions />
  </div>
</template>

<script>
import userInfo from "./../components/mine/userInfo";
import userOptions from "./../components/mine/userOptions";
export default {
  data() {
    return {
      title: "我的",
    };
  },
  components: {
    userInfo,
    userOptions,
  },
};
</script>

<style lang='less' scoped>
.main {
  padding-top: 2.75rem;
  padding-bottom: 5.3rem;
  height: 100vh;
  background: #f2f2f2;
}
</style>