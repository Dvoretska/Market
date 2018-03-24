<template>
	<div class="main-container">
		<aside class="filters-box">Aside</aside>
		<div class="product-cards-container">
			<div class="product-card" v-for="product in productList">
				<div class="product-img-wrapper">
					<img src="../assets/images.jpeg" alt="" class="product-img">
				</div>	
				<div class="product-description-box">
					<div class="product-price">$600</div>
					<strong class="subject">{{ product.subject }}</strong>
					<div class="category">{{ product.category.name }}</div>
					<div class="location">{{ product.location }}</div>
					<!-- <div class="product-rating">
						<div class="stars-outer">
          					<div class="stars-inner" v-bind:style="stars"></div>
        				</div>
        			</div> -->
        			<div class="button-cta-wrapper">
						<button-bar :label="'More options'"></button-bar>
					</div>
				</div>
			</div>
			<div class="style-paginate">
			  <paginate
			    :page-count="20"
			    :page-range="3"
			    :margin-pages="2"
			    :prev-text="'Prev'"
			    :next-text="'Next'"
			    :container-class="'pagination'"
			    :pageClass="'item-page'"
			    :page-link-class="'link-page'"
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
    stars: function () {
      return {
        'width': Math.round(((this.rating / 5) * 100) / 10) * 10 + '%'
      }
    },
    productList () {
      return this.$store.getters.getProductList
    }
  }
}
</script>

<style scoped>
    .style-paginate {
    	width: 100%;
    	display: flex;
    	justify-content: center;
    	margin: 20px 0;
    }
    .main-container {
		display: flex;
	}
	.filters-box {
		width: 270px;
		height: 1000px;
		border: 2px solid black;
	}
	.product-cards-container {
		width: calc(100% - 270px);
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		align-content: baseline;
	}
	.product-card {
	    margin:10px 0 0 10px;
	    flex-grow: 1; 
		height: 420px;
		font-size: 16px;
        border: 1px solid #D7D7D7;
	}
	.product-card:hover {
		border: solid 1px #CCC;
	    -moz-box-shadow: 1px 1px 3px #999;
	    -webkit-box-shadow: 1px 1px 3px #999;
        box-shadow: 1px 1px 3px #999;
	}
	.product-img-wrapper {
	    margin: 15px;
		height: 200px;
		position: relative;
		display: flex;
		justify-content: center;
    }
    .product-image {
    	max-width: 100%;
    	max-height: 100%;
    	object-fit: contain;
    }
    .product-description-box {
		margin: 15px;
    }
	.product-price {
		padding-bottom: 10px;
		font-size: 21px;
		font-weight: 600;
		line-height: 16px;
	}
	.subject {
		display: block;
		height: 40px;
		font-size: 18px;
		overflow: hidden;
		line-height: 20px;
		word-wrap: break-word;
	}
	.category {
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 16px;
		line-height: 16px;
		color: #b4b4b4;
	}
	.product-message {
		font-size: 16px;
		line-height: 16px;
		word-wrap: break-word;
		min-height: 40px;
	}
	.location {
		font-size: 13px;
		line-height: 16px;
		font-weight: 700;
		color: #909090;
	}
	.product-rating {
		margin-top: 5px;
		max-height: 20px;
		width: 91px;
	}
    .stars-outer {
	  	position: relative;
	  	font-family: FontAwesome;
	} 
	.stars-outer::before {
	  	content: "\f006 \f006 \f006 \f006 \f006";
	} 
	.stars-inner {
	  	position: absolute;
	  	top: 0;
	  	left: 0;
	  	white-space: nowrap;
	  	overflow: hidden;
	  	width: 0;
	}
	.stars-inner::before {
	  	content: "\f005 \f005 \f005 \f005 \f005";
	  	color: #7957d5;
	}
	.button-cta-wrapper {
		margin-top: 13px;
		margin-bottom: 10px;
		text-align: center;
	}
	@media (max-width: 1499px) {
		.product-card {
			max-width: calc(25% - 10px - 1px);
		}
	}
	@media (min-width: 993px) and (max-width: 1199px) {
		.product-card {
			max-width: calc(33% - 10px - 1px);
		}
	}
	@media (max-width: 992px) {
		.product-card {
			max-width: calc(50% - 10px - 1px);
		}
	}
	@media (max-width: 650px) {
		.product-card {
			max-width: calc(100% - 10px - 1px);
			min-width: 250px;
		}
		.main-container {
			overflow-y: scroll;
		}
	}
</style>
