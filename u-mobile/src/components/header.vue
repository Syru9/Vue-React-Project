<template>
  <div class="header">
    <div class="inner">
      <!-- 搜索部分 -->
      <div class="search">
        <i class="iconfont icon-location"></i>
        <img class="logo" :src="logoUrl" alt="" />
        <div class="searchBar">
          <i class="iconfont icon-search"></i>
          <input type="text" placeholder="按内容搜索" />
        </div>
        <i class="iconfont icon-store"></i>
      </div>
      <!-- 分类导航部分 -->
      <classifyNav :getData="classify" />
    </div>
  </div>
</template>

<script>
import classifyNav from "./classifyNav";

export default {
  data() {
    return {
      // 分类
      classify: [
        { id: 1, name: "推荐" },
        { id: 2, name: "女装" },
        { id: 3, name: "鞋包" },
        { id: 4, name: "居家" },
        { id: 5, name: "母婴" },
        { id: 6, name: "美妆" },
      ],
      logoUrl: require("./../assets/images/white.png"),
    };
  },
  components: {
    classifyNav,
  },
};
</script>

<style lang='less' scoped>
.header {
  .inner {
    height: 5rem;
    background: linear-gradient(#ff6040, #ff8a80);
    // 搜索部分
    .search {
      display: flex;
      justify-content: space-around;
      .iconfont {
        font-size: 1.25rem;
      }
      .icon-location,
      .icon-store {
        color: #fff;
      }
      .icon-search {
        color: #999;
        vertical-align: middle;
      }
      .logo {
        width: 5.69rem;
      }
      .searchBar {
        width: 10.63rem;
        background: #fff;
        border-radius: 0.2rem;
        input {
          width: 8rem;
          border: none;
          outline: none;
        }
      }
    }
  }
}
</style>