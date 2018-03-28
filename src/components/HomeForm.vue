<template>
	<div class="main-container">
		<aside class="filters-box">Aside</aside>
		<div class="product-cards-container">
			<div class="product-card" v-for="product in productList">
				<div class="product-img-wrapper">
					<img :src="product.image || getDefaultImage" alt="" class="product-img">
				</div>
				<div class="product-description-box">
					<div class="product-price">{{ product.price }} грн</div>
					<strong class="product-subject">{{ product.subject }}</strong>
					<div class="product-category">{{ product.category.name }}</div>
					<div class="product-location">{{ product.location }}</div>
          <div class="button-cta-wrapper">
						<button-bar :label="'More options'"></button-bar>
					</div>
				</div>
			</div>
			<div class="style-paginate">
			  <paginate v-if="productList.count > 12"
			    :page-count="productPageCount"
			    :page-range="3"
			    :margin-pages="2"
			    :prev-text="'Prev'"
			    :next-text="'Next'"
			    :container-class="'pagination'"
			    :click-handler="clickCallback">
			  </paginate>
			</div>
		</div>
	</div>
</template>

<script>

import buttonBar from '@/components/ButtonBar'

export default {
  components: {
    buttonBar
  },
  data () {
    return {
      rating: 1
    }
  },
  created () {
    this.$store.dispatch('GET_PRODUCT_LIST')
  },
  methods: {
    clickCallback (pageNum) {
      this.$store.dispatch('GET_PRODUCT_LIST', pageNum)
    }
  },
  computed: {
    getDefaultImage () {
      return require('@/assets/images.jpeg')
    },
    stars: function () {
      return {
        'width': Math.round(((this.rating / 5) * 100) / 10) * 10 + '%'
      }
    },
    productList () {
      return this.$store.getters.getProductList
    },
    productPageCount () {
      return Math.ceil(this.$store.getters.getProductCount / 16)
    }
  }
}
</script>

<style scoped lang="scss">
	 .style-paginate {
	    width: 100%;
	    display: flex;
	    justify-content: center;
	    margin: 20px 0;
	 }
    .main-container {
	    display: flex;
	    margin-top: 55px;
	}
	.filters-box {
		width: 270px;
		height: 1000px;
		border: 2px solid black;
	}
	.product-cards-container {
		width: calc(100% - 270px);
		display: grid;
        grid-template-columns: repeat(auto-fill,minmax(240px, 1fr));
	}
	.product-card {
	    margin:10px 0 0 10px;
	    height: 420px;
	    font-size: 16px;
	    border: 1px solid #D7D7D7;
	}
	.product-card:hover {
		border: solid 1px #CCC;
    	box-shadow: 1px 1px 3px #999;
	}
	.product-img-wrapper {
	    margin: 15px;
	    height: 200px;
	    position: relative;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    background: #f7f7f7;
  	}
  	.product-img {
    	max-width: 100%;
    	max-height: 100%;
    	object-fit: contain;
  	}
  	.product-description-box {
    	margin: 15px;
  	}
	.product-price {
		padding-bottom: 10px;
		font-size: 18px;
		font-weight: 600;
		line-height: 16px;
	}
	.product-subject {
		display: block;
		height: 40px;
		font-size: 22px;
		overflow: hidden;
		line-height: 20px;
		word-wrap: break-word;
		color: #8c40b8;
	}
	.product-category {
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 16px;
		line-height: 16px;
		color: #b4b4b4;
		min-height: 15px;
	}
	.product-location {
		font-size: 13px;
		line-height: 16px;
		font-weight: 700;
		color: #909090;
		min-height: 15px;
	}
	.button-cta-wrapper {
		margin-top: 13px;
		margin-bottom: 10px;
		text-align: center;
	}
	// @media (max-width: 1499px) {
	// 	.product-card {
	// 		min-width: calc(25% - 10px - 1px);
	// 	}
	// }
	// @media (min-width: 993px) and (max-width: 1199px) {
	// 	.product-card {
	// 		min-width: calc(33% - 10px - 1px);
	// 	}
	// }
	// @media (max-width: 992px) {
	// 	.product-card {
	// 		min-width: calc(50% - 10px - 1px);
	// 	}
	// }
	// @media (max-width: 650px) {
	// 	.product-card {
	// 		min-width: calc(100% - 10px - 1px);
	// 	}
	// }
</style>
