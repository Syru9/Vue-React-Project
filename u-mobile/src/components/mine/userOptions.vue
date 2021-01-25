<template>
  <ul class="options">
    <li class="option">
      <div class="left">
        <img src="@/assets/images/function/address.png" alt="" />
        <p>地址管理</p>
      </div>
      <span class="right">&gt;</span>
    </li>
    <li class="option">
      <div class="left">
        <img src="@/assets/images/function/wallet.png" alt="" />
        <p>我的钱包</p>
      </div>
      <span class="right">剩余200U币&gt;</span>
    </li>
    <li class="option">
      <div class="left">
        <img src="@/assets/images/function/QR_code.png" alt="" />
        <p>我的二维码</p>
      </div>
      <span class="right">&gt;</span>
    </li>
    <li class="option">
      <div class="left">
        <img src="@/assets/images/function/partner.png" alt="" />
        <p>我的小伙伴</p>
      </div>
      <span class="right">&gt;</span>
    </li>
    <li class="option">
      <div class="left">
        <img src="@/assets/images/function/free.png" alt="" />
        <p>0元试用</p>
      </div>
      <span class="right">&gt;</span>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.options {
  background: #fff;
  margin-top: 3.4rem;
  .option {
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
    height: 3.4rem;
    line-height: 3.4rem;
    .left {
      img {
        vertical-align: -0.1rem;
        margin-right: 0.4rem;
      }
      p {
				display: inline;
				font-size: 0.75rem;
      }
		}
		.right{
			color: #666666;
			font-size: 0.75rem;
		}
  }
}
</style>