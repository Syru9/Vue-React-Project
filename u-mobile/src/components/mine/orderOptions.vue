<template>
	<div class="orderOptions">
		<div class="top">
			<h4>我的订单</h4>
			<span class="all">全部订单&gt;</span>
		</div>
		<ul class="items">
			<li class="item">
				<img src="../../assets/images/order/payment.png" alt="">
				<p>代付款</p>
			</li>
			<li class="item">
				<img src="../../assets/images/order/delivery.png" alt="">
				<p>代收货</p>
			</li>
			<li class="item">
				<img src="../../assets/images/order/evaluation.png" alt="">
				<p>评价</p>
			</li>
			<li class="item">
				<img src="../../assets/images/order/service.png" alt="">
				<p>售后/退款</p>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang='less' scoped>
.orderOptions{
	width: 22.19rem;
	height: 6.44rem;
	background: #fff;
	margin: .6rem auto 0;
	border-radius: 10px;
	overflow: hidden;
	.top{
		display: flex;
		width: 90%;
		margin: .4rem auto 0;
		justify-content: space-between;
		line-height: 1.2rem;
		h4{
			font-size: 1rem;
		}
		.all{
			font-size: 0.75rem;
			color: #FF6040 ;
		}
	}
	.items{
		width: 100%;
		display: flex;
		margin-top: .6rem;
		justify-content: space-around;
		text-align: center;
		.item{
			p{
				font-size: 0.63rem;
				color: #666;
			}
		}
	}
}
</style>