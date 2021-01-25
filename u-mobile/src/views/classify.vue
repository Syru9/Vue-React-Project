<template>
  <div class="classify">
    <com-title />
    <search />
    <div class="main">
      <!-- 侧边栏 -->
      <van-sidebar v-model="activeKey" @change="changeClassify">
        <van-sidebar-item
          v-for="item in classify"
          :key="item.id"
          :title="item.catename"
        />
      </van-sidebar>
      <!-- 具体商品 -->
      <van-grid :border="false" :column-num="3">
        <van-grid-item
          v-for="item in second"
          :key="item.id"
          :to="'/goodsList?id=' + item.id"
        >
          <van-image :src="$imgUrl + item.img" />
          <p>{{ item.catename }}</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getClassify } from "@/utils";
export default {
  data() {
    return {
      activeKey: 0,
      classify: [],
      second: [],
    };
  },
  async mounted() {
    await this.getClassifyList();
    // console.log(this.classify);
    this.second = this.classify[0].children;
  },
  methods: {
    // 获取分类列表
    async getClassifyList() {
      const res = await getClassify().catch((err) => console.log(err));
      // console.log(res);
      if (res.code === 200) {
        this.classify = res.list;
      }
    },
    // 更改分类触发
    changeClassify() {
      this.second = this.classify[this.activeKey].children;
    },
  },
  components: {},
};
</script>

<style lang='less' scoped>
.classify {
  padding-top: 2.75rem;
  padding-bottom: 5.3rem;
  .main {
    display: flex;
    width: 100%;
    .van-grid {
      flex: 1;
    }
  }
}
</style>