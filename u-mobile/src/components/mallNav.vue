<template>
  <!-- 中部导航 -->
  <div class="mallNav">
    <ul class="mailList">
      <li class="item" v-for="item in infoList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
        <p>{{ item.desc }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoList: [
        {
          id: 1,
          imgUrl: require("./../assets/images/seckill.png"),
          desc: "限时秒杀",
        },
        {
          id: 2,
          imgUrl: require("./../assets/images/top.png"),
          desc: "畅销商品",
        },
        {
          id: 3,
          imgUrl: require("./../assets/images/brand.png"),
          desc: "品质大牌",
        },
        {
          id: 4,
          imgUrl: require("./../assets/images/selfsupport.png"),
          desc: "小U自营",
        },
        {
          id: 5,
          imgUrl: require("./../assets/images/integral.png"),
          desc: "积分商城",
        },
      ],
    };
  },
};
</script>

<style lang='less' scoped>
.mallNav {
  margin: 1rem 0;
  .mailList {
    width: 100%;
    display: flex;
    justify-content: space-around;
    .item {
      text-align: center;
      p {
        font-size: 0.63rem;
        color: #333333;
      }
    }
  }
}
</style>