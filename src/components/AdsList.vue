<template>
	<div class="main-container">
		<aside class="filters-box">
      <div v-if="categories.loading" class="loading">
        <vue-loading spinner="wave"></vue-loading>
      </div>
			<category-filter
        v-else-if="filtersData"
        :data="filtersData">
      </category-filter>
		</aside>
		<div class="content-wrapper">
       <bread-crumbs></bread-crumbs>
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
			<div class="wrapper-paginate">
			  <paginate v-if="productPageCount >= 2 && !products.loading"
			    :page-count="productPageCount"
			    :page-range="3"
			    :margin-pages="2"
			    :prev-text="'Prev'"
			    :next-text="'Next'"
			    :container-class="'pagination'"
			    :click-handler="clickCallback"
			    :initial-page="parseInt(this.$route.query.page) - 1 || 0">
			  </paginate>
			</div>
		</div>
	</div>
</template>

<script>

import buttonBar from '@/components/ButtonBar'
import breadCrumbs from '@/components/BreadCrumbs'
import CategoryFilter from '@/components/filters/CategoryFilter'
import VueLoading from 'vue-simple-loading'

export default {
  components: {
    buttonBar,
    CategoryFilter,
    VueLoading,
    breadCrumbs
  },
  created () {
    this.$store.dispatch('GET_FILTERED_AD_LIST', this.$route.query)
    if (!this.$store.getters.getCategories.length) {
      this.$store.dispatch('GET_CATEGORIES')
    }
  },
  methods: {
    clickCallback (pageNum) {
      this.$store.dispatch('GET_FILTERED_AD_LIST', {page: pageNum})
    }
  },
  computed: {
    getDefaultImage () {
      return require('@/assets/images.jpeg')
    },
    filtersData () {
      const categories = this.$store.getters.getCategories;
      if (categories.results.length) {
        let data = []
        data.push({
          text: {
            slug: categories.results[0].parent_slug,
            name: categories.results[0].parent
          },
          state: {expanded: true},
          children: []
        })
        for (const category of categories.results) {
          data[0].children.push({
            text: {
              parent_slug: category.parent_slug,
              slug: category.slug,
              isLeafNode: category.is_leaf_node,
              name: category.name,
              count: category.count
            }
          })
        }
        return data
      }
    },
    categories() {
      return this.$store.getters.getCategories;
    },
    products () {
      return this.$store.getters.getProducts;
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
		height: 44px;
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
	    margin: 30px 0 0 10px;
	    /deep/ .pagination {
	    	& li:first-child a {
	    		border-top-left-radius: 5px;
	    		border-bottom-left-radius: 5px;
	    	}
	    	& li:last-child a {
	    		border-top-right-radius: 5px;
	    		border-bottom-right-radius: 5px;
	    		border-right: 1px solid #ccc;
	    	}
	    	& .active a {
		    	color: #fff;
				background-color: #7957d5;
				border-color: #7957d5;
				&:hover {
					background-color: #7957d5;
				}
	    	}
	    	& .disabled:hover a {
	    		cursor: not-allowed;
	    	}
	    	& > li > a {
		        color: #7957d5;
		        padding: 5px 10px;
		        border-left: 1px solid #ccc;
		        border-bottom: 1px solid #ccc;
		        border-top: 1px solid #ccc;
		        &:hover {
		        	background-color: #f4f4f4;
		        }
    		}
        }
	}
</style>
