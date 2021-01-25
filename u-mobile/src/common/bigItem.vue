<template>
  <!-- 大块栏目 -->
  <div class="item">
    <h3 class="secondKill">限时秒杀</h3>
    <a href="#" class="more">查看更多></a>
    <p class="info">{{ info }}</p>
    <p class="time">
      <span>{{ date.hours }}</span> : <span>{{ date.minutes }}</span> :
      <span>{{ date.seconds }}</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: "每天0点场,好货秒不停",
      date: {
        hours: "05",
        minutes: "20",
        seconds: "48",
      },
    };
  },
};
</script>

<style lang='less' scoped>
.item {
  width: 10.94rem;
  height: 10.94rem;
  margin-left: 0.6rem;
  margin-top: 0.6rem;
  background: url("./../assets/images/big.png");
  position: relative;
  .secondKill {
    font-size: 1rem;
    line-height: 1rem;
    color: #85a642;
    margin: 0.4rem;
  }
  .more {
    color: #333;
    text-decoration: none;
    font-size: 0.63rem;
    position: absolute;
    top: 0.6rem;
    right: 0.4rem;
  }
  .info {
    font-size: 0.63rem;
    color: #b1cc7a;
    margin-left: 0.4rem;
  }
  .time {
    margin-left: .4rem;
    span {
      display: inline-block;
      width: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
      background-image: linear-gradient(180deg, #85a642 0%, #b1cc7a 100%);
      border-radius: 1px;
      font-size: 0.63rem;
      color: #fff;
      text-align: center;
      font-weight: bold;
    }
  }
}

</style>