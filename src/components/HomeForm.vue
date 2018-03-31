<template>
	<div class="main-container">
		<aside class="filters-box">
			<filters-component></filters-component>
		</aside>
		<div class="content-wrapper">
      <div v-if="products.loading" class="loading">
        <vue-loading spinner="wave"></vue-loading>
      </div>
			<div v-else class="product-cards-container">
				<div class="product-card" v-for="product in products.results">
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
			</div>
			<div class="wrapper-paginate" :class="{'hidden': products.loading}">
			  <paginate v-if="productPageCount >= 2"
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
import filtersComponent from '@/components/FiltersComponent'
import VueLoading from 'vue-simple-loading'

export default {
  components: {
    buttonBar,
    filtersComponent,
    VueLoading
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
      console.log(this.$store.getters.getProductList)
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
    products () {
      console.log(this.$store.getters.getProducts)
      return this.$store.getters.getProducts
    },
    productPageCount () {
      return Math.ceil(this.$store.getters.getProducts.count / 16)
    }
  }
}
</script>

<style scoped lang="scss">
  .loading {
    position: fixed;
     top: 40%;
     left: 50%;
    /deep/ .sk-wave .sk-rect {
             background-color: #7b4fad;
           }
    }
    .main-container {
	    display: flex;
	    margin-top: 55px;
	    min-height: calc(100vh - 55px - 125px);
	}
	.content-wrapper {
		width: calc(100% - 270px);
	}
	.filters-box {
		width: 270px;
		padding-top: 7px;
	}
	.product-cards-container {
		width: 100%;
		display: grid;
        grid-template-columns: repeat(auto-fill,minmax(240px, 1fr));
        grid-template-rows: auto [last-line];
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
	.wrapper-paginate {
		display: flex;
	    justify-content: center;
	    margin: 30px 0 0;
	    /deep/ .pagination > li > a {
			color: #7957d5;
		}
		/deep/ .pagination .active a {
			color: #fff;
			background-color: #7957d5;
			border-color: #7957d5;
		}
	}
</style>
