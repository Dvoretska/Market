<template>
	<div class="profile-ads-container">
		<ul class="profile-ads-nav">
			<li class="profile-ads-item">
				<router-link :to="{ name: ''}">
					<span>Active</span>
				</router-link>
			</li>
			<li class="profile-ads-item">
				<router-link :to="{ name: ''}">
					<span>Not active</span>
				</router-link>
			</li>
		</ul>
		<div class="ads-content-empty">
			<i class="material-icons">&#xE14F;</i>
			<div class="profile-ads-notice">There are no active ads</div>
	    	<router-link :to="{ name: 'ads'}">
	        	<button-bar :label="'+ Create an ad'"></button-bar>
	      	</router-link>
      	</div>
		<div class="ads-content-full">
			<div class="product-card" v-for="product in productList">
				<div class="product-img-wrapper">
					<img src="../assets/images.jpeg" alt="" class="product-img">
				</div>	
				<div class="product-description-box">
					<div class="product-price">$600</div>
					<strong class="subject">{{ product.subject }}</strong>
				</div>
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
  computed: {
    productList () {
      return this.$store.getters.getProductList
    }
  }
}
</script>

<style scoped>
	.product-card {
	    margin:10px 0 0 10px;
	    display: flex;
	    height: 230px;
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
		height: 100px;
		max-width: 100px;
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
	.profile-ads-container {
		height: 350px;
	}
	.profile-ads-notice {
		font-size: 22px;
		opacity: 0.5;
		padding-bottom: 20px;
	}
	.material-icons {
		font-size: 130px;
		opacity: 0.5;
		padding: 50px 0 0;
	}
	.ads-content-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: calc(100% - 45px);
	}
	.profile-ads-nav {
		background: #f0f0f0;
	    border-bottom: 1px solid #ccc;
		display: flex;
		justify-content: flex-start;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.profile-ads-item span {
		font-size: 16px;
		display: inline-block;
		padding: 10px 25px;
		height: 100%;
	}
	.profile-ads-item + .profile-ads-item:before {
		content: "";
		border-left: 1px solid #fff;
  		border-right: 1px solid #ccc;
	}
</style>
