<template>
  <div class="cart">
    <com-title />
    <div v-if="goods.length > 0">
      <van-swipe-cell v-for="item in goods" :key="item.id">
        <van-card
          :num="item.num"
          :price="item.price.toFixed(2)"
          :desc="item.goodsname"
          :title="item.goodsname"
          :thumb="$imgUrl + item.img"
        />
        <template #right>
          <van-button
            square
            text="删除"
            @click="del(item.id)"
            type="danger"
            class="delete-button"
          />
        </template>
      </van-swipe-cell>
    </div>
    <van-list v-else><van-empty description="购物车为空" /></van-list>
    <!-- 这里的单位是 分 -->
    <van-submit-bar
      v-if="goods.length > 0"
      :price="total"
      button-text="提交订单"
    />
  </div>
</template>

<script>
import { getCart, delCart } from "@/utils";
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      goods: [],
    };
  },
  computed: {
    // 计算总价
    total() {
      return (
        this.goods.reduce((pre, cur) => (pre = pre + cur.num * cur.price), 0) *
        100
      );
    },
  },
  async mounted() {
    await this.getCartInfo();
  },
  methods: {
    // 获取列表
    async getCartInfo() {
      const uid = JSON.parse(sessionStorage.getItem("userInfo")).uid;
      const res = await getCart(uid).catch((err) => console.log(err));
      if (res.code === 200) {
        this.goods = res.list ? res.list : [];
      }
      console.log(res);
    },
    // 删除
    async del(id) {
      const res = await delCart(id).catch((err) => console.log(err));
      if (res.code === 200) {
        Toast.success(res.msg);
        // 重新获取列表
        this.getCartInfo();
      }
      // console.log(id);
    },
  },
  // 进入组件前要登录
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("userInfo")) {
      next();
    } else {
      Dialog.alert({
        message: "您尚未登录！，将跳转至登录页面！",
      }).then(() => {
        next("/login");
      });
    }
  },
};
</script>

<style lang='' scoped>
.cart {
  padding-top: 2.75rem;
  padding-bottom: 5.3rem;
}
.delete-button {
  height: 100%;
}
.van-submit-bar {
  bottom: 5rem;
}
.van-swipe-cell {
  margin: 1rem 0;
}
</style>