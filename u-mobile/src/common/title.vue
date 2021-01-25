<template>
  <van-nav-bar
    fixed
    :title="$route.name"
    left-arrow
    @click-left="$router.back()"
  />
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.van-nav-bar {
  background: #ff6040;
  height: 2.75rem;
  font-size: 1.06rem;
  text-align: center;
  font-weight: normal;
  color: #ffffff;
  line-height: 2.75rem;
}
</style>