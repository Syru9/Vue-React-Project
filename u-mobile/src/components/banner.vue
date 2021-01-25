<template>
  <!-- 轮播图 -->
  <div class="banner">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerImg" :key="item.id">
        <img :src="$imgUrl + item.img" alt="" width="100%" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from "@/utils";
export default {
  data() {
    return {
      bannerImg: [],
    };
  },
  mounted() {
    this.getBannerList();
  },
  methods: {
    async getBannerList() {
      const res = await getBanner().catch((err) => console.log(err));
      // console.log(res);
      if (res.code === 200) {
        this.bannerImg = res.list;
      }
    },
  },
};
</script>

<style lang='less' scoped>
</style>