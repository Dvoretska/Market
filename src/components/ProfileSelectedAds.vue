<template>
	<div class="profile-ads-container" v-bind:class="{'has-height': !myWishList}">
		<ul class="profile-ads-nav">
			<li class="profile-ads-item">
				<router-link :to="{ name: ''}">
					<translate class="item-text">Wish List </translate>
					<span class="item-count">({{myWishList.count}})</span>
				</router-link>
			</li>
		</ul>
		<div class="ads-content-empty" v-if="getLoading" >
			<div class="loading">
        <vue-loading spinner="wave"></vue-loading>
      </div>
    </div>
    <div v-else>
			<div class="ads-content-empty" v-if="myWishList.results.length == 0">
				<i class="material-icons">star_border</i>
				<div class="profile-ads-notice" v-translate>There are no ads in your Wish List</div>
      </div>
			<div class="ads-content-full" v-else>
				<div class="product-card" v-for="ad in myWishList.results">
					<div class="product-img-wrapper" @click="openAdDetails(ad.slug)">
						<img :src="ad.image" alt="" class="product-image">
					</div>
					<div class="product-description-box">
						<div class="price-wrapper">
							<div class="product-price">{{ ad.price }}</div>
							<span>грн.</span>
						</div>
						<p class="product-subject">{{ ad.subject }}</p>
							<div class="ad-actions">
							<a href="" class="buttons ad-view" @click.prevent="openAdDetails(ad.slug)">
								<img src="@/assets/visible.svg" alt="" class="icon-ad-actions">
								<translate  class="button-text">View</translate>
							</a>
							<a href="#" class="buttons ad-delete" @click.prevent="show(ad.slug)">
								<img src="@/assets/delete.svg" alt="" class="icon-ad-actions">
								<translate class="button-text">Delete</translate>
							</a>
							<modal name="delete-ad" :width="400" :height="170" class="modal-window" >
								<div class="delete-ad-header">
									<img src="../assets/cancel.svg" alt="" class="icon-close" @click="hide">
								</div>
								<div class="modal-window-title">
									<translate>Are you sure you want to delete the ad from Wish List?</translate>
								</div>
								<div class="modal-buttons-wrapper">
									<button @click="deleteAdFromWishList(adSlug)" class="modal-window-button"><translate>Yes</translate></button>
									<button @click="hide" class="modal-window-button"><translate>No</translate></button>
								</div>
							</modal>
						</div>
					</div>
				</div>
				<button @click="loadMore()" class="load-more"
          v-if="myWishList.count >= 16 && myWishList.results.length < myWishList.count"><translate>Load more</translate></button>
			</div>
		</div>
	</div>
</template>

<script>
import VueLoading from 'vue-simple-loading'

export default {
  components: {
    VueLoading
  },
  data () {
  	return {
  		adSlug: '',
  		page: 1,
  		selectedAds: []
  	}
  },
  created () {
    this.$store.dispatch('GET_MY_WISH_LIST', {page: 1})
  },
  methods: {
  	loadMore () {
  	  this.page ++
      this.$store.dispatch('GET_MY_WISH_LIST_LOAD_MORE', {...this.$route.query, page: this.page})
    },
  	show (slug) {
      this.$modal.show('delete-ad')
      this.adSlug = slug
    },
    hide () {
      this.$modal.hide('delete-ad')
    },
  	openAdDetails (slug) {
    	this.$router.push({ name: 'adDetails', params: { slug }})
    },
    deleteAdFromWishList (slug) {
      this.$store.dispatch('DELETE_FROM_WISH_LIST', slug)
    }
  },
  computed: {
  	myWishList () {
      return this.$store.getters.getMyWishList
    },
    getLoading () {
      return this.$store.getters.getMyWishList.loading
    }
  }
}
</script>

<style scoped lang="scss">
	/deep/ .v--modal-overlay {
    background: rgba(0, 0, 0, 0.05);
	}
	/deep/ .v--modal {
      box-shadow: none;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
	  }
    .delete-ad-header {
    width: 100%;
    height: 30px;
    background-color: rgba(123, 79, 173, 0.4);
    margin-bottom: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .icon-close {
      cursor: pointer;
      width: 15px;
      height: 15px;
      margin-right: 15px;
      &:hover {
        transform: scale(1.2);
      }
    }
   }
	.modal-window-title {
		font-size: 18px;
		margin-bottom: 15px;
    text-align: center;
	}
	.modal-window-button {
		border: none;
		background-color: rgba(121, 87, 213, .5);
		ont-weight: bold;
		font-size: 16px;
		width: 60px;
		height: 33px;
		border-radius: 5px;
		cursor: pointer;
		&:hover {
			box-shadow: 0 0 2px 1px rgba(0, 0, 0, .7);
		}
		&:nth-child(2) {
			background-color: red;
			margin-left: 10px;
		}
	}
    .loading {
    /deep/ .sk-wave .sk-rect {
       background-color: #7b4fad;
     }
    }
	.buttons {
		cursor: pointer;
		display: flex;
		align-items: center;
		color: rgba(121, 87, 213, .8);
		border: 1px solid rgba(121, 87, 213, .5);
		padding: 2px 7px;
		margin: 0.3em;
		font-weight: bold;
		font-size: 10px;
		line-height: 14px;
		text-decoration: none;
		border-radius: 5px;
		&:hover {
			box-shadow: 0 0 1px 1px rgba(0, 0, 0, .3);
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
		padding: 5px;
		margin: 3px;
	}
	.product-img-wrapper {
		cursor: pointer;
		height: 80px;
		width: 80px;
		position: relative;
		display: flex;
		justify-content: center;
		background: #f7f7f7;
		flex-shrink: 0;
    }
    .product-image {
    	max-width: 100%;
    	max-height: 100%;
    	object-fit: contain;
    }
    .product-description-box {
			margin-left: 10px;
			max-width: 435px;
			flex: 1;
		}
    .price-wrapper {
    	display: flex;
    	align-items: center;
    	padding-bottom: 3px;
    	.product-price {
			font-size: 16px;
			font-weight: 600;
			line-height: 18px;
			@media screen and (min-width:320px) and (max-width: 480px){
	      font-size: 14px;
	    }
		}
    	span {
    		margin-left: 5px;
    		font-weight: 600;
    	}
    }
	.product-subject {
		display: block;
		font-size: 14px;
		line-height: 20px;
		word-wrap: break-word;
		max-width: 500px;
		margin-bottom: 3px;
	}
	.profile-ads-notice {
		font-size: 22px;
		opacity: 0.5;
		padding-bottom: 20px;
		@media screen and (min-width:320px) and (max-width: 480px){
			font-size: 18px;
		}
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
	.profile-ads-item {
		font-size: 16px;
		.item-text {
			display: inline-block;
			padding: 10px 0 10px 25px;
			height: 100%;
		}
		.item-count {
			display: inline-block;
			height: 100%;
		}
	}
	.profile-ads-item + .profile-ads-item:before {
		content: "";
		border-left: 1px solid #fff;
  		border-right: 1px solid #ccc;
	}
	.ad-actions {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-left: auto;
		margin-right: 10px;
	}
	.has-height {
		height: 350px;
	}
	.load-more {
		width: 145px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(123, 79, 173, 0.7);
		border: solid rgba(255, 255, 255, 1) 1px;
		cursor: pointer;
		transition: border-color 0.4s ease 0s, background-color 0.4s ease 0s;
		text-transform: uppercase;
		font-weight: 400;
		font-size: 14px;
		color: #fff;
		border-radius: 5px;
		margin: 20px auto;
		&:hover {
			background-color: #F4F4F4;
			border-color: #8c40b8;
			color: #8c40b8;
		}
	}
	@media screen and (min-width:320px) and (max-width: 480px){
		.buttons {
			.button-text {
				display: none;
			}
			.icon-ad-actions {
				margin-right: 0;
			}
		}
		.profile-ads-item span {
			font-size: 14px;
		}
		/deep/ .v--modal {
			width: 100% !important;
		}
		.modal-window-title {
			font-size: 16px;
		}
	}
</style>
