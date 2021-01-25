<template>
  <div class="classifyNav">
    <ul class="list">
      <li
        class="item"
        v-for="(item, index) in getData"
        :key="item.id"
        @click="flag = index"
      >
        <p :class="{ title: true, active: index == flag }">
          {{ item.name }}
        </p>
        <div class="bd" v-show="index == flag"></div>
      </li>
    </ul>
    <div class="classify">
      <i class="iconfont icon-classify"></i>
      分类
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: 0,
    };
  },
  props: ["getData"],
};
</script>

<style lang='less' scoped>
//  分类导航部分
.classifyNav {
  color: #fff3f2;
  margin-top: 1.4rem;
  position: relative;
  .list {
    display: flex;
    overflow: auto;
    width: 19rem;
    height: 2.1rem;
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      width: 4.06rem;
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      flex-shrink: 0;
      position: relative;
      .title {
        font-size: 0.88rem;
      }
      .bd {
        margin: 0.6rem auto 0;
        width: 1.4rem;
        height: 0.22em;
        background: #fff;
      }
    }
    .active {
      font-size: 1rem !important;
      font-weight: bold;
    }
  }
  .classify {
    // font-size: 0.88rem;
    position: absolute;
    width: 4.06rem;
    height: 2.2rem;
    line-height: 2rem;
    bottom: 0;
    right: 0;
    text-align: center;
    background: linear-gradient(#ff7a68, #ff8a80);
  }
}

</style>