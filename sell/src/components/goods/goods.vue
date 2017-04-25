<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="item in goods" class="menu-item">
					<span class="text" border-1px> 
						<span v-show="item.type>0.5" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul class="foods-list" >
				<li class="foods" v-for="items in goods">
					<div class="foods-name"> {{items.name}} </div>
					<ul class="food-list">
						<li v-for="item in items.foods" class="food">
							<div class="food-icon"><img :src="item.icon" width="57px" height="57px"></div>
							<div class="content">
								<h2 class="food-name"> {{item.name}} </h2>
								<p class="food-description"> {{item.description}} </p>
								<div class="food-extra">
									<span class="extra-span">月售{{item.sellCount}}份</span><span>好评率{{item.rating}}%</span>
								</div>
								<div class="food-price">
									<span class="now">￥{{item.price}}</span>
									<span v-show="item.oldPrice" class="old">￥{{item.oldPrice}}</span>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
	const ERR_OK = 0;

export default {
	props: {
		seller: {
			type: Object
		}
	},
	data() {
		return {
      goods: []
		};
	},
	created() {
		this.$http.get('/api/goods').then((response) => {
			response = response.body;
			if (response.errno === ERR_OK) {
					this.goods = response.data;
						this.$nextTick(() => {
						this._initScroll();
						});
					};
		});
		this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
	},
	methods: {
		_initScroll() {
			this.menuWrapper = new BScroll(this.$refs.menuWrapper, {});
			this.foodScroll = new BScroll(this.$refs.foodWrapper, {});
		}
	}
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import ('../../common/stylus/mixin.styl')
	.goods
		display: flex
		position: absolute
		top: 174px
		bottom: 46px
		width: 100%
		overflow: hidden
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background: #f3f5f7
			.menu-item
				display: table
				line-height: 14px
				width: 56px
				height: 54px
				padding: 0 12px
				.icon
					display: inline-block
					vertical-align: top
					width: 12px
					height: 12px
					margin-right: 1px
					background-size: 12px 12px
					background-repeat: no-repeat
					&.decrease
						bg-image("decrease_3")		
					&.discount
						bg-image("discount_3")	
					&.special
						bg-image("special_3")	
					&.guarantee
						bg-image("guarantee_3")	
					&.invoice
						bg-image("invoice_3")	
				.text
					display: table-cell
					vertical-align: middle
					width: 56px
					font-size: 12px
					border-1px(rgba(7,17,27,0.1))
		.foods-wrapper
			flex: 1
			.foods
				display: inline-block
				width: 100%
				height: 26px
				line-height: 26px
				background-color: #f3f5f7
				border-left: 2px solid #d9dde1
				.foods-name
					padding-left: 14px
					font-size: 12px
					color: rgb(147,153,159)
				.food
					display: flex
					margin: 18px
					border-1px(rgba(7,17,27,0.1))
					padding-bottom: 18px
					font-size: 0
					&:last-child
						border-none()
						margin-bottom: 0			
					.food-icon
						flex: 0 0 57px
						margin-right: 10px
					.content
						flex: 1
						.food-name
							margin: 2px 0 8px 0
							height: 14px
							line-height: 14px
							font-size: 14px	
							color: rgb(7,17,27)	
						.food-description
							height: 10px
							line-height: 10px
							font-size: 10px
							margin-bottom: 8px
							color: rgb(147,153,159)	
						.food-extra
							height: 10px
							line-height: 10px
							font-size: 10px
							margin-bottom: 8px
							color: rgb(147,153,159)
							.extra-span
								margin-right: 12px
						.food-price
							font-weight: 700
							line-height: 24px
							.now
								margin-right: 8px
								font-size: 14px
								color: rgb(240,20,20)
							.old
								text-decoration: line-through
								font-size: 10px	
								color: rgb(147,153,159)									
</style>
