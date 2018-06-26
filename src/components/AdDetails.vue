<template>
	<div class="main-container">
		<div class="left-column">
			<div v-if="getAdDetails.loading" class="loading">
		        <vue-loading spinner="wave"></vue-loading>
		    </div>
			<div v-else class="ad-details-card">
				<slider :images="getAdDetails.images"></slider>
				<div class="content-wrapper">
					<h1 class="ad-details-title">{{ getAdDetails.subject }}</h1>
					<div class="ad-details-price">{{ getAdDetails.price }}<span>  грн.</span></div>
					<div class="ad-details-location">{{ getAdDetails.location }}</div>
					<div class="ad-details-date"><translate>Added at </translate>{{ getDate(getAdDetails.created) }}</div>
					<div class="ad-details-description" v-html="getAdDetails.message">{{ getAdDetails.message }}</div>
				</div>
			</div>
		</div>
		<div class="right-column">
			<button slot="reference" v-if="isAuthenticated" class="contact-button button-message">
				<svg xmlns="http://www.w3.org/2000/svg" class="contact-icon" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 374.88 374.88" style="enable-background:new 0 0 374.88 374.88;" xml:space="preserve" width="512px" height="512px">
            <g><g><path d="M357.44,66.24H17.28c-5.552,0.011-10.761,2.69-14,7.2l14.08,8.8L187.44,188.4l170-106.16l14-8.8    C368.201,68.93,362.992,66.251,357.44,66.24z" fill="#FFFFFF"/></g></g><g><g><path d="M358.88,289.12L225.28,183.6l-33.6,21.04c-2.594,1.621-5.886,1.621-8.48,0l-33.6-21.04L16,289.12l-13.6,10.8    c3.065,5.376,8.772,8.702,14.96,8.72H357.6c6.188-0.018,11.894-3.344,14.96-8.72L358.88,289.12z" fill="#FFFFFF"/></g></g><g><g><polygon points="16,100.16 0,90.24 0,281.44 16,268.8 135.12,174.56   " fill="#FFFFFF"/></g></g><g><g><polygon points="358.88,100.16 239.76,174.56 358.88,268.8 374.88,281.44 374.88,90.24   " fill="#FFFFFF"/></g></g>
        </svg>
				<span>Contact the author</span>
			</button>
			<popper trigger="hover" :options="{placement: 'top'}" v-else>
			    <div class="popper">
			      You should be logged in to send message
			    </div>
				<button slot="reference" class="contact-button" @click="redirectToLogin">
					<svg xmlns="http://www.w3.org/2000/svg" class="contact-icon" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 374.88 374.88" style="enable-background:new 0 0 374.88 374.88;" xml:space="preserve" width="512px" height="512px">
            <g><g><path d="M357.44,66.24H17.28c-5.552,0.011-10.761,2.69-14,7.2l14.08,8.8L187.44,188.4l170-106.16l14-8.8    C368.201,68.93,362.992,66.251,357.44,66.24z" fill="#FFFFFF"/></g></g><g><g><path d="M358.88,289.12L225.28,183.6l-33.6,21.04c-2.594,1.621-5.886,1.621-8.48,0l-33.6-21.04L16,289.12l-13.6,10.8    c3.065,5.376,8.772,8.702,14.96,8.72H357.6c6.188-0.018,11.894-3.344,14.96-8.72L358.88,289.12z" fill="#FFFFFF"/></g></g><g><g><polygon points="16,100.16 0,90.24 0,281.44 16,268.8 135.12,174.56   " fill="#FFFFFF"/></g></g><g><g><polygon points="358.88,100.16 239.76,174.56 358.88,268.8 374.88,281.44 374.88,90.24   " fill="#FFFFFF"/></g></g>
          </svg>
					<span>Contact the author</span>
				</button>
			</popper>
			<button class="contact-button">
        <svg xmlns="http://www.w3.org/2000/svg" class="contact-icon" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 365.449 365.449" style="enable-background:new 0 0 365.449 365.449;" xml:space="preserve">
          <g>
            <path d="M281.507,10.85C274.279,3.614,265.71,0,255.813,0H109.637c-9.9,0-18.464,3.617-25.697,10.85   c-7.233,7.229-10.85,15.796-10.85,25.693v292.361c0,9.896,3.617,18.462,10.85,25.693c7.233,7.234,15.797,10.852,25.697,10.852   h146.176c9.896,0,18.466-3.621,25.693-10.852c7.234-7.231,10.852-15.797,10.852-25.693V36.543   C292.358,26.646,288.745,18.083,281.507,10.85z M159.885,36.543h45.685c3.046,0,4.565,1.523,4.565,4.569   c0,3.045-1.52,4.57-4.565,4.57h-45.685c-3.045,0-4.568-1.525-4.568-4.57C155.316,38.066,156.839,36.543,159.885,36.543z    M198.861,345.036c-4.476,4.469-9.852,6.707-16.135,6.707c-6.28,0-11.656-2.238-16.13-6.707c-4.474-4.477-6.711-9.856-6.711-16.132   c0-6.283,2.24-11.66,6.711-16.133c4.471-4.469,9.851-6.714,16.13-6.714c6.284,0,11.66,2.245,16.135,6.714   c4.473,4.473,6.708,9.85,6.708,16.133S203.331,340.56,198.861,345.036z M264.954,283.225c0,2.471-0.903,4.62-2.714,6.424   c-1.813,1.807-3.949,2.707-6.42,2.707H109.637c-2.474,0-4.615-0.903-6.423-2.707s-2.712-3.953-2.712-6.424V82.229   c0-2.474,0.903-4.617,2.712-6.423c1.809-1.805,3.949-2.714,6.423-2.714h146.176c2.478,0,4.616,0.905,6.427,2.714   c1.811,1.807,2.71,3.949,2.71,6.423v200.995H264.954z" fill="#FFFFFF"/>
          </g>
        </svg>
				<span v-if="getOwner">{{ getOwner.phone }}</span>
			</button>
			<button v-if="isAuthenticated" class="contact-button"
        v-on="checkIfAdSelected(getAdDetails.slug) ? {click: () => deleteProductFromWishList(getAdDetails.slug)} : {click: () => addProductToWishList(getAdDetails.slug)}"
        v-bind:class="{'ad-selected': checkIfAdSelected(getAdDetails.slug)}">
				<img src="../assets/star.svg" alt="" class="contact-icon">
				<span>Add to Wish List</span>
			</button>
			<popper trigger="hover" :options="{placement: 'top'}" v-else>
			    <div class="popper">
			      You should be logged in to send message
			    </div>
				<button slot="reference" class="contact-button" @click="redirectToLogin">
					<img src="../assets/star.svg" alt="" class="contact-icon">
					<span>Add to Wish List</span>
				</button>
			</popper>
			<div class="owner-card">
				<div class="owner-avatar"></div>
				<div v-if="getOwner" class="owner-name">{{ getOwnerName }}</div>
				<div v-if="getOwner" class="owner-date-joined">since {{ getDateOwnerJoined(getOwner.date_joined) }}</div>
			</div>
		</div>
	</div>
</template>

<script>
import Slider from '@/components/Slider'
import VueLoading from 'vue-simple-loading'
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/css/vue-popper.css'

export default {
	components: {
      	Slider,
	  	VueLoading,
	  	'popper': Popper
    },
    created () {
    	this.$store.dispatch('GET_AD_DETAILS', this.$route.params.slug)
    },
    mounted () {
      if(this.$localStorage.get('token') && this.$localStorage.get('slug')) {
        for(let slug of JSON.parse(this.$localStorage.get('slug'))) {
          this.$store.dispatch('SAVE_TO_WISH_LIST', slug)
        }
        this.$localStorage.remove('slug')
      } else {
        const slugs = JSON.parse(this.$localStorage.get('slug'))
        if (slugs) {
          this.slugs = slugs
        }
      }
      this.$store.dispatch('GET_MY_WISH_LIST', {page: 1})
    },
    methods: {
      addProductToWishList (slug) {
        this.starSelected = slug
        if(this.$localStorage.get('token')) {
          this.$store.dispatch('SAVE_TO_WISH_LIST', slug)
        } else {
          this.slugs.push(slug);
          if(!this.$localStorage.get('slug') || !JSON.parse(this.$localStorage.get('slug')).includes(slug)) {
            this.$localStorage.set('slug', JSON.stringify(this.slugs));
          }
        }
      },
      deleteProductFromWishList (slug) {
        if(this.$localStorage.get('token')) {
          this.$store.dispatch('DELETE_FROM_WISH_LIST', slug)
        } else {
          let index = JSON.parse(this.$localStorage.get('slug')).indexOf(slug);
          if(JSON.parse(this.$localStorage.get('slug'))) {
            this.slugs.splice(index, 1)
            this.$localStorage.set('slug', JSON.stringify(this.slugs));
          }
        }
      },
      checkIfAdSelected (slug) {
        if(JSON.parse(this.$localStorage.get('slug'))) {
          return this.slugs.includes(slug)
        } else {
          return this.myWishList.some(function(el) {
            return el.slug === slug
          })
        }
      },
    	redirectToLogin () {
    		this.$router.push({name: 'login'})
    	},
	  	getDate (created) {
	  		return this.$moment(created).format('HH:mm MMMM D')
	  	},
	  	getDateOwnerJoined (joined) {
	  		return this.$moment(joined).format('MMMM YYYY')
	  	}
	  },
    computed: {
      loadingStar () {
        return this.$store.getters.getMyWishList.loadingStar
      },
      loadingStarSuccess () {
        return this.$store.getters.getMyWishList.success
      },
      myWishList () {
        return this.$store.getters.getMyWishList.results
      },
      getAdDetails () {
        return this.$store.getters.getAdDetails
      },
      isAuthenticated () {
        if(Object.keys(this.$store.getters.getUserDetails).length !== 0) {
          return true
        }
      },
      getOwner () {
        return this.$store.getters.getAdDetails.user
      },
      getOwnerName () {
        if(this.getOwner.first_name || this.getOwner.last_name) {
          return `${this.getOwner.first_name} ${this.getOwner.last_name}`
        }
        return this.getOwner.username
      }
    }
}
</script>

<style scoped lang="scss">
	ol, ul {
		margin-left: 15px;
	}
	.main-container {
		margin: 80px 150px;
		display: flex;
		align-items: flex-start;
		.left-column {
			padding: 20px 30px 0;
			width: 75%;
			border: 1px solid #ccc;
			outline: 1px solid #fff;
			min-height: 60px;
			background-color: rgba(238, 238, 238, .3);
			min-height: 150px;
			.loading {
				position: fixed;
				left: 35%;
				top: 20%;
			}
			.content-wrapper{
				margin-top: 30px;
				.ad-details-title {
					font-size: 22px;
					font-weight: 700;
					word-wrap: break-word;
					overflow-wrap: break-word;
					line-height: 28px;
					margin-bottom: 4px;
					margin-top: 15px;
					color: rgba(123, 79, 173, 1);
				}
				.ad-details-price {
					font-size: 27px;
					margin-bottom: 10px;
					span {
						font-size: 20px;
						margin-right: 10px;
					}
				}
				.ad-details-location {
					font-size: 13px;
					font-weight: 600;
				}
				.ad-details-date {
					border-bottom: 1px solid #eee;
					padding-bottom: 10px;
					font-size: 13px;
					overflow: hidden;
					word-wrap: break-word;
					color: #b4b4b4;
				}
				.ad-details-description {
					font-size: 16px;
					text-align: left;
					line-height: 20px;
					margin-top: 20px;
					margin-bottom: 20px;
				}
			}
		}
		.right-column {
			height: auto;
			width: 25%;
			padding: 15px 15px 0;
			background-color: rgba(238, 238, 238, .7);
			margin-left: 10px;
			.contact-button {
				width: 100%;
				height: 40px;
				margin-bottom: 20px;
				padding: 0 15px;
				display: flex;
				align-items: center;
				background-color: rgba(123, 79, 173, 0.7);
				text-transform: uppercase;
				font-weight: 600;
				color: #fff;
				cursor: pointer;
				border: solid rgba(255, 255, 255, 1) 1px;
        transition: border-color 0.4s ease 0s, background-color 0.4s ease 0s;
        &:hover {
          background-color: #F4F4F4;
          border-color: #8c40b8;
          color: #8c40b8;
        }
        &:hover .contact-icon path, &:hover .contact-icon polygon {
          fill: #8c40b8;
        }
        &.ad-selected {
         color: red;
        }
        span {
          font-size: 13px;
          @media screen and (max-width:1200px){
            font-size: 12px;
          }
        }
        .contact-icon {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
			}
			.owner-card {
				width: 100%;
				padding: 5px 5px 15px;
				margin-bottom: 20px;
				.owner-avatar {
					background-image: url('../assets/default-profile-picture.png');
					background-position: center center;
    				background-repeat: no-repeat;
    				background-size: cover;
					border-radius: 50%;
					width: 60%;
					height: auto;
					padding-top: 60%;
					margin: 5px auto 10px;
					background-color: white;
				}
				.owner-name {
					color: #7b4fad;
					font-size: 20px;
					text-align: center;
					overflow: hidden;
					word-wrap: break-word;
				}
				.owner-date-joined {
					font-size: 14px;
					text-align: center;
					color: #86739D;
					overflow: hidden;
					word-wrap: break-word;
				}
			}
		}
	}
	@media screen and (max-width:1200px){
		.main-container {
			.right-column {
				.contact-button {
					span {
						font-size: 12px;
					}
				}
			}
		}
	}
	@media screen and (max-width:991px){
		.main-container {
			margin: 80px 30px;
			.right-column {
				.contact-button {
					span {
						font-size: 10px;
					}
			        .contact-icon {
			        	width: 20px;
			        	height: 20px;
			        	margin-right: 10px;
			        }
				}
				.owner-card {
					.owner-avatar {
						width: 60%;
						padding-top: 60%;
					}
				}
			}
		}
	}
	@media screen and (max-width:767px){
		.main-container {
			margin: 80px 30px;
			.right-column {
				padding: 10px;
			}
		}
	}
	@media screen and (max-width:575px){
		.main-container {
			margin: 80px 10px;
			flex-direction: column;
			.right-column {
				width: 220px;
				margin-left: 0;
				.contact-button {
					font-size: 12px;
					span {
						font-size: 12px;
					}
				}
			}
			.left-column {
				width: 100%;
				margin-bottom: 10px;
				.loading {
					left: 50%;
					top: inherit;
					transform: translateX(-50%);
				}
			}
		}
	}
	@media screen and (min-width:320px) and (max-width: 480px){
		.main-container {
			margin: 80px 10px;
			.right-column {
				width: 100%;
				margin-left: 0;
				.contact-button {
					span {
						font-size: 12px;
					}
				}
				.owner-card {
					margin-bottom: 0;
					.owner-avatar {
						width: 40%;
						padding-top: 40%;
					}
				}
			}
		}
	}

</style>
