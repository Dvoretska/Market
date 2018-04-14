<template>
	<div class="profile-ads-container" v-bind:class="{'has-height': !getMyAds}">
		<ul class="profile-ads-nav">
			<li class="profile-ads-item">
				<router-link :to="{ name: ''}">
					<span v-translate>Active</span>
				</router-link>
			</li>
			<li class="profile-ads-item">
				<router-link :to="{ name: ''}">
					<span v-translate>Not active</span>
				</router-link>
			</li>
		</ul>
		<div class="ads-content-empty" v-if="getLoading" >
			<div class="loading">
	        	<vue-loading spinner="wave"></vue-loading>
	      	</div>
      	</div>
      	<div v-else>
			<div class="ads-content-empty" v-if="getMyAds.length == 0">
				<i class="material-icons">&#xE14F;</i>
				<div class="profile-ads-notice" v-translate>There are no active ads</div>
		    	<router-link :to="{ name: 'ads'}">
		        	<button-bar :label="getCreateAnAd()"></button-bar>
		      	</router-link>
	      	</div>
			<div class="ads-content-full" v-else>
				<div class="product-card" v-for="ad in getMyAds">
					<div class="product-img-wrapper">
						<img :src="ad.image" alt="" class="product-image">
					</div>
					<div class="product-description-box">
						<div class="product-price">{{ ad.price }}</div>
						<strong class="product-subject">{{ ad.subject }}</strong>
					</div>
					<div class="ad-actions">
						<a href="" class="buttons ad-view">
							<img src="@/assets/visible.svg" alt="" class="icon-ad-actions">
							<translate>View</translate>
						</a>
						<a href="" class="buttons ad-edit">
							<img src="@/assets/pencil.svg" alt="" class="icon-ad-actions">
							<translate>Edit</translate>
						</a>
						<a href="" class="buttons ad-delete">
							<img src="@/assets/delete.svg" alt="" class="icon-ad-actions">
							<translate>Delete</translate>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import buttonBar from '@/components/ButtonBar'
import VueLoading from 'vue-simple-loading'

export default {
  components: {
    buttonBar,
    VueLoading
  },
  methods: {
    getCreateAnAd () {
      return this.$gettext('+ Create an ad')
    }
  },
  mounted () {
    this.$store.dispatch('GET_MY_ADS')
  },
  computed: {
    getMyAds () {
      return this.$store.getters.getMyAds.results
    },
    getLoading () {
      return this.$store.getters.getMyAds.loading
    }
  }
}
</script>

<style scoped lang="scss">
    .loading {
    /deep/ .sk-wave .sk-rect {
             background-color: #7b4fad;
           }
    }
	.buttons {
		display: flex;
		align-items: center;
		background-color: rgba(121, 87, 213, .5);
		padding: 4px 14px;
		margin: 0.3em;
		font-weight: bold;
		font-size: 12px;
		line-height: 14px;
		text-decoration: none;
		color: #fff;
		border-radius: .2em;
		&:hover {
			box-shadow: 0 0 2px 1px rgba(0, 0, 0, .7);
		}
		.icon-ad-actions {
			margin-right: 10px;
			width: 15px;
			height: 15px;
		}
	}
	.product-card {
	    display: flex;
		font-size: 16px;
        border: 1px solid #D7D7D7;
        padding: 10px;
        margin: 3px;
	}
	.product-img-wrapper {
		height: 100px;
		width: 100px;
		position: relative;
		display: flex;
		justify-content: center;
		background: #f7f7f7;
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
		font-size: 16px;
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
	.profile-ads-notice {
		font-size: 22px;
		opacity: 0.5;
		padding-bottom: 20px;
	}
	.material-icons {
		font-size: 130px;
		opacity: 0.5;
	}
	.ads-content-empty {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 305px;
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
	.has-height {
		height: 350px;
	}
</style>
