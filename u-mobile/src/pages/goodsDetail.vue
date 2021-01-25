<template>
  <div class="detail">
    <com-title />
    <div class="main">
      <img :src="$imgUrl + goodInfo.img" alt="" />
      <h3>
        ￥{{ goodInfo.price.toFixed(2) }}
        <span class="market">￥{{ goodInfo.market_price.toFixed(2) }}</span>
      </h3>
      <h1>{{ goodInfo.goodsname }}</h1>
      <p v-html="goodInfo.description"></p>
      <p class="attr">现在购买即可享受套餐优惠：</p>
      <van-button
        size="mini"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
      >
        {{ goodInfo.specsattr }}
      </van-button>
      <p class="amount">购买数量:</p>
      <van-stepper v-model="amount" />
    </div>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        type="warning"
        @click="addCart"
        text="加入购物车"
      />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
// import {} from 'vant';
import { getGoodInfo, addCart } from "@/utils";
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      goodInfo: {
				// 防止报 warning
        price: 0,
        market_price: 0,
      },
      amount: 1,
    };
  },
  mounted() {
    // console.log(this.$route.query);
    this.getGood(this.$route.query.id);
  },
  methods: {
    // 获取商品详情
    async getGood(id) {
      const res = await getGoodInfo(id).catch((err) => console.log(err));
      if (res.code === 200) {
        this.goodInfo = res.list[0];
      }
      console.log(res);
    },
    // 添加至购物车
    async addCart() {
      const user = JSON.parse(sessionStorage.getItem("userInfo"));

      if (sessionStorage.getItem("userInfo")) {
        const res = await addCart({
          uid: user.uid,
          goodsid: this.goodInfo.id,
          num: this.amount,
        }).catch((err) => console.log(err));
        if (res.code === 200) {
          Toast.success(res.msg);
          this.$router.push("/cart");
        } else {
          Toast.fail(res.msg);
        }
        console.log(res);
      } else {
        Dialog.alert({
          message: "您尚未登录！，将跳转至登录页面！",
        }).then(() => {
          this.$router.push("/login");
        });
      }
    },
  },
};
</script>

<style lang='less' scoped>
.detail {
  padding-top: 2.75rem;
  padding-bottom: 5.3rem;
  .main {
    width: 90%;
    margin: 0 auto;
    img {
      display: block;
      margin: 0 auto;
    }
    h3 {
      color: red;
      .market {
        color: #ccc;
        font-size: 1rem;
        text-decoration: line-through;
      }
    }
    .attr {
      height: 3rem;
      line-height: 3rem;
    }
    .amount {
      margin-top: 3rem;
      margin-bottom: 0.4rem;
    }
    h1 {
      font-size: 1.6rem;
      line-height: 3rem;
      height: 3rem;
    }
  }
}
</style>