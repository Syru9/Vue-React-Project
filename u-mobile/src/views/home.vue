// 商城首页
<template>
  <div class="home">
    <com-title />
    <u-header />
    <u-banner />
    <u-mall-nav />
    <shops />
    <van-tabs>
      <van-tab title="最新商品">
        <van-card
          v-for="item in newGoods"
          :key="item.id"
          :price="item.price.toFixed(2)"
          :centered="item.goodsname"
          :title="item.goodsname"
          :thumb="$imgUrl+item.img"
        />
      </van-tab>
      <van-tab title="爆款商品">
        <van-card
          v-for="item in hotGoods"
          :key="item.id"
          :price="item.price.toFixed(2)"
          :centered="item.goodsname"
          :title="item.goodsname"
          :thumb="$imgUrl+item.img"
        />
      </van-tab>
      <van-tab title="所有商品">
        <van-card
          v-for="item in allGoods"
          :key="item.id"
          :price="item.price.toFixed(2)"
          :centered="item.goodsname"
          :title="item.goodsname"
          :thumb="$imgUrl+item.img"
        />
      </van-tab>
    </van-tabs>
    <bottom-nav />
  </div>
</template>

<script>
import uHeader from "./../components/header";
import uBanner from "./../components/banner";
import uMallNav from "./../components/mallNav";
import bottomNav from "./../components/bottomNav";
import { getGoods } from "@/utils";
export default {
  data() {
    return {
      newGoods: [],
      hotGoods: [],
      allGoods: [],
    };
  },
  mounted() {
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      const res = await getGoods().catch((err) => console.log(err));
      if (res.code === 200) {
        this.newGoods = res.list[0].content;
        this.hotGoods = res.list[1].content;
        this.allGoods = res.list[2].content;
      }
      console.log(res);
    },
  },
  components: {
    uHeader,
    uBanner,
    uMallNav,
    bottomNav,
  },
};
</script>

<style lang='' scoped>
.home {
  padding-top: 2.75rem;
  padding-bottom: 5.3rem;
}
.van-card{
  width: 90%;
  margin: 4px auto;
  border-radius: 10px;
}
</style>