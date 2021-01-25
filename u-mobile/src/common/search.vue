<template>
  <div class="search">
    <van-search v-model="value" placeholder="按内容搜索" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
};
</script>

<style lang='' scoped>
.search {
  height: 3.25rem;
}
.van-search {
  background-image: linear-gradient(180deg, #ff6040 0%, #ff8a80 100%);
}
</style>