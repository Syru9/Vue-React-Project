<template>
  <div class="userInfo">
    <div class="info">
      <i class="head"></i>
      <div class="username">
        <h4 v-if="login" @click="goLogin">尚未登录,点击前往登录</h4>
        <h4 v-else class="name">{{ username }}</h4>
        <p class="tips">完善信息让小U更懂你</p>
      </div>
    </div>
    <div class="options">
      <ul>
        <li>
          <p class="amount">12</p>
          <p class="option">我的收藏</p>
        </li>
        <li>
          <p class="amount">12</p>
          <p class="option">浏览记录</p>
        </li>
        <li>
          <p class="amount">￥0</p>
          <p class="option">我的红包</p>
        </li>
        <li>
          <p class="amount">12</p>
          <p class="option">优惠券</p>
        </li>
      </ul>
    </div>
    <order-options />
  </div>
</template>
<script>
import orderOptions from "./orderOptions";
export default {
  mounted() {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    // console.log(userInfo);
    if (userInfo) {
      this.login = false;
      this.username = userInfo.nickname;
    }
  },
  data() {
    return {
      login: true,
      username: "代用名",
    };
  },
  components: {
    orderOptions,
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang='less' scoped>
.userInfo {
  position: relative;
  height: 13.13rem;
  background-image: linear-gradient(180deg, #ff6040 0%, #ff8a80 100%);
  box-shadow: 0 2px 6px 0 rgba(255, 149, 128, 0.5);
  .info {
    height: 5rem;
    .head {
      display: inline-block;
      width: 4rem;
      height: 4rem;
      background: #fff;
      border-radius: 50%;
      margin-left: 0.63rem;
      vertical-align: -0.6rem;
      margin-right: 1rem;
    }
    .username {
      display: inline-block;
      .name {
        font-weight: normal;
        color: #fff;
        font-size: 1.13rem;
        line-height: 3rem;
      }
      .tips {
        border: 1px solid #fff;
        font-size: 0.63rem;
        color: #fff;
        padding: 1px 4px;
      }
    }
  }
  .options {
    margin-top: 1rem;
    color: #fff;
    ul {
      width: 100%;
      display: flex;
      justify-content: space-around;
      li {
        text-align: center;
        .amount {
          font-weight: bold;
        }
        .option {
          font-size: 0.63rem;
        }
      }
    }
  }
}
</style>