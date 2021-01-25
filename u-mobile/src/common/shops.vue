<template>
  <div>
    <!-- 栏目展示 -->
    <div class="container">
      <big-item />
      <div class="smallitems">
        <small-item v-for="item in smallList" :key="item.id" :getData="item" />
      </div>
    </div>
  </div>
</template>

<script>
import bigItem from "./bigItem";
import smallItem from "./smallItem";
export default {
  data() {
    return {
      smallList: [
        {
          id: 1,
          title: "品牌上新",
          info: "9点整 , 抢大牌",
          btn: "疯抢红包>",
          background: require("./../assets/images/small.png"),
          style:'pink'
        },
        {
          id: 2,
          title: "日用好物",
          info: "愿君多采撷",
          btn: "塞满奖券>",
          background: require("./../assets/images/02.png"),
          style:'purple',
        },
      ],
    };
  },
  components: {
    bigItem,
    smallItem,
  },
};
</script>

<style lang='less' scoped>
.container {
  overflow: hidden;
  background: #f2f2f2;
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.smallitems {
  display: inline-block;
  margin-left: 0.4rem;
}
</style>