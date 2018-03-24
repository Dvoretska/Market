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
		<div class="ads-content-empty" v-if="!productList">
			<i class="material-icons">&#xE14F;</i>
			<div class="profile-ads-notice">There are no active ads</div>
	    	<router-link :to="{ name: 'ads'}">
	        	<button-bar :label="'+ Create an ad'"></button-bar>
	      	</router-link>
      	</div>
		<div class="ads-content-full" v-else>
			<div class="product-card" v-for="product in productList">
				<div class="product-img-wrapper">
					<img src="../assets/images.jpeg" alt="" class="product-img">
				</div>	
				<div class="product-description-box">
					<div class="product-price">$600</div>
					<strong class="product-subject">{{ product.subject }}</strong>
				</div>
				<div class="ad-actions">
					<a href="" class="buttons add">View</a>
					<a href="" class="buttons edit">Edit</a>
					<a href="" class="buttons ad-delete">Delete</a>
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
	.buttons
	{
	  display: inline-block;
	  background: #eeeeee; /* Old browsers */
	  background: -moz-linear-gradient(top, #eeeeee 0%, #eeeeee 100%); /* FF3.6+ */
	  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#eeeeee), color-stop(100%,#eeeeee)); /* Chrome,Safari4+ */
	  background: -webkit-linear-gradient(top, #eeeeee 0%,#eeeeee 100%); /* Chrome10+,Safari5.1+ */
	  background: -o-linear-gradient(top, #eeeeee 0%,#eeeeee 100%); /* Opera11.10+ */
	  background: -ms-linear-gradient(top, #eeeeee 0%,#eeeeee 100%); /* IE10+ */
	  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#eeeeee', endColorstr='#eeeeee',GradientType=0 ); /* IE6-9 */
	  background: linear-gradient(top, #eeeeee 0%,#eeeeee 100%); /* W3C */
	  border: 1px solid #a1a1a1;
	  padding: 4px 14px;
	  margin: 0.3em;
	  font-weight: bold;
	  font-size: 12px;
	  line-height: 14px;
	  text-decoration: none;
	  color: #333;
	  border-radius: .2em;
	}
	.buttons:before {
	  float: left;
	  width: 10px;
	  text-align: center;
	  font-size: 18px;
	  margin: 0 0.5em 0 -1em;
	  padding: 0 14px;
	  pointer-events: none;
	}
	.add:before { 
		content: "\2714"; 
	}
	.edit:before { 
		content: "\270E"; 
	}
	.ad-delete:before {
	    content: "\2718";        
	}
	.product-card {
	    display: flex;
		font-size: 16px;
        border-bottom: 1px solid #D7D7D7;
        padding: 10px;
	}
	.product-img-wrapper {
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
		margin-left: 10px;
    }
	.product-price {
		padding-bottom: 10px;
		font-size: 18px;
		font-weight: 600;
		line-height: 18px;
	}
	.product-subject {
		display: block;
		height: 40px;
		font-size: 18px;
		overflow: hidden;
		line-height: 20px;
		word-wrap: break-word;
		max-width: 500px;
	}
	.profile-ads-container {
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
	.ad-actions {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: auto;
		margin-right: 10px;
	}
	.ads-content-full {
	}
</style>
