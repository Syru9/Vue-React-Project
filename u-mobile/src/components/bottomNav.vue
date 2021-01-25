<template>
  <div class="bottomNav">
    <ul>
      <li v-for="(item, idx) in navList" :key="item.id" @click="flag = idx">
        <router-link :to="item.to" tag="div">
          <img
            :src="idx == flag ? item.selectedImgUrl : item.unselectedImgUrl"
            alt=""
            class="logo"
          />
          <p :class="{ isActive: flag == idx }">{{ item.words }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: 0,
      navList: [
        {
          id: 1,
          imgUrl: "",
          selectedImgUrl: require("./../assets/images/home/selected.png"),
          unselectedImgUrl: require("./../assets/images/home/unselected.png"),
          words: "商城",
          to: "/index",
        },
        {
          id: 2,
          selectedImgUrl: require("./../assets/images/classify/selected.png"),
          unselectedImgUrl: require("./../assets/images/classify/unselected.png"),
          words: "分类",
          to: "/classify",
        },
        {
          id: 3,
          selectedImgUrl: require("./../assets/images/shoppingcart/selected.png"),
          unselectedImgUrl: require("./../assets/images/shoppingcart/unselected.png"),
          words: "购物车",
          to: "/cart",
        },
        {
          id: 4,
          selectedImgUrl: require("./../assets/images/user/selected.png"),
          unselectedImgUrl: require("./../assets/images/user/unselected.png"),
          words: "我",
          to: "/mine",
        },
      ],
    };
  },
  methods: {
    choose(idx) {
      console.log(idx);
    },
  },
};
</script>

<style lang='less' scoped>
.bottomNav {
  width: 100%;
  z-index: 99999;
  position: fixed;
  bottom: 0;
  background: #fff;
  ul {
    width: 100%;
    height: 5.19rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    li {
      div {
        display: inline-block;
        text-align: center;
        p {
          font-size: 0.63rem;
          color: #999;
        }
        .isActive {
          color: #ff6040;
        }
      }
    }
  }
}
</style>