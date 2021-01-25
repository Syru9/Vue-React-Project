<template>
  <div class="goodsList">
    <com-title />
    <search />

    <!-- 排序 -->
    <van-tabs>
      <van-tab v-for="item in nav" :key="item.id" :title="item.title">
      </van-tab>
    </van-tabs>
    <!-- 商品表 -->
    <van-card
      v-for="item in goodsList"
      :key="item.id"
      :price="item.price.toFixed(2)"
      :desc="item.goodsname"
      :title="item.goodsname"
      :thumb="$imgUrl + item.img"
      @click="getDetail(item.id)"
    >
      <template #tags>
        <van-tag plain type="danger">好评如潮</van-tag>
        <van-tag plain type="danger">新上架</van-tag>
      </template>
    </van-card>
  </div>
</template>

<script>
import { getGoodsList } from "@/utils";
export default {
  data() {
    return {
      goodsList: [],
      nav: [
        { id: 1, title: "综合推荐" },
        { id: 2, title: "销量" },
        { id: 3, title: "价格" },
        { id: 4, title: "好评度" },
        { id: 5, title: "店铺" },
      ],
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    // 获取商品列表
    async getGoodsList() {
      const fid = this.$route.query.id;
      // console.log(this.$route.query);
      const res = await getGoodsList(fid).catch((err) => console.log(err));
      if (res.code === 200) {
        this.goodsList = res.list;
      }
      // console.log(res);
    },

    // 获取详细信息
    getDetail(id) {
      this.$router.push("/goodsDetail?id=" + id);
    },
  },
};
</script>

<style lang='' scoped>
.goodsList {
  padding-top: 2.75rem;
  /* padding-bottom: 5.3rem; */
}
</style>