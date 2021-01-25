<template>
  <!-- 小块栏目 -->
  <div ref="item" :class="['item', getData.style]">
    <h3 class="title">{{ getData.title }}</h3>
    <p class="info">{{ getData.info }}</p>
    <p class="btn">{{ getData.btn }}</p>
  </div>
</template>

<script>
export default {
  props: ["getData"],
  mounted() {
    this.$refs.item.style.backgroundImage = `url(${this.getData.background})`;
  },
};
</script>

<style lang='less' scoped>
// 公共样式
.item {
  width: 10.34rem;
  height: 5.31rem;
  margin-top: 0.4rem;
  padding-left: 0.6rem;
  overflow: hidden;
  .title {
    margin-top: 0.2rem;
  }
  .info {
    margin-top: 0.6rem;
    margin-bottom: 0.4rem;
    font-size: 0.63rem;
  }
  .btn {
    width: 3.75rem;
    height: 1.25rem;
    font-size: 0.63rem;
    text-align: center;
    line-height: 1.25rem;
  }
}
// 粉色
.pink {
  .title {
    color: #ff6040;
  }
  .info{
    color: #FF9580;
  }
  .btn{
    color: #fff;
    background-image: linear-gradient(180deg, #FF6040 0%, #FF9F80 100%);
border-radius: 2px 12px 12px 2px;
  }
}
// 紫色
.purple {
  .title {
    color: #af40ff;
  }
  .info {
    color: #ca80ff;
  }
  .btn {
    color: #fff;
    background-image: linear-gradient(180deg, #af40ff 0%, #f58cff 100%);
    border-radius: 2px 12px 12px 2px;
  }
}

</style>