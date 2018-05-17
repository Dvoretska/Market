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
				<img src="../assets/message.svg" alt="" class="contact-icon">
				<span>Contact the author</span>
			</button>
			<popper trigger="hover" :options="{placement: 'top'}" v-else>
			    <div class="popper">
			      You should be logged in to send message
			    </div>
				<button slot="reference" class="contact-button" @click="redirectToLogin">
					<img src="../assets/message.svg" alt="" class="contact-icon">
					<span>Contact the author</span>
				</button>
			</popper>
			<button class="contact-button">
				<img src="../assets/mobile-phone.svg" alt="" class="contact-icon">
				<span v-if="getOwner">{{ getOwner.phone }}</span>
			</button>
			<button slot="reference" v-if="isAuthenticated" class="contact-button">
				<img src="../assets/star.svg" alt="" class="contact-icon">
				<span>Add to favorites</span>
			</button>
			<popper trigger="hover" :options="{placement: 'top'}" v-else>
			    <div class="popper">
			      You should be logged in to send message
			    </div>	
				<button slot="reference" class="contact-button" @click="redirectToLogin">
					<img src="../assets/star.svg" alt="" class="contact-icon">
					<span>Add to favorites</span>
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
    methods: {
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
		// min-height: 100vh;
		margin: 80px 150px;
		display: flex;
		align-items: flex-start;
		// background-color: #F7F7F7;
		.left-column {
			padding: 15px 25px 0;
			width: 75%;
			border: 1px solid #ccc;
			outline: 1px solid #fff;
			min-height: 60px;
			background-color: #F7F7F7;
			.loading {
				position: fixed;
				left: 35%;
				top: 20%;
			}
			.content-wrapper{
				margin-top: 20px;
				.ad-details-title {
					font-size: 22px;
					font-weight: 700;
					word-wrap: break-word;
					overflow-wrap: break-word;
					line-height: 28px;
					margin-bottom: 4px;
					margin-top: 15px;
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
			background-color: rgba(36, 42, 53, 0.2);
			margin-left: 10px;
			// background-color: rgba(36, 42, 53, 0.1);
			// margin-left: 20px;
			.contact-button {
				width: 100%;
				height: 40px;
				margin-bottom: 20px;
				padding: 0 15px;
				display: flex;
				align-items: center;
				// border: none;
				// border-radius: 5px;
				background-color: rgba(123, 79, 173, 0.7);
				text-transform: uppercase;
				font-weight: 600;
				color: #fff;
				cursor: pointer;
				// box-shadow:
		  //       0px 1px 1px rgba(128,128,128,.8);
		        				// background-color: rgba(123, 79, 173, 0.4);
				border: solid rgba(255, 255, 255, 1) 1px;
		        span {
		        	font-size: 13px;
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
				padding: 0 10px;
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
	@media screen and (max-width:320px){
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
					.owner-avatar {
						width: 40%;
						padding-top: 40%;
					}
				}
			}
		}
	}
	
</style>
