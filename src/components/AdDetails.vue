<template>
	<div class="main-container">
		<div class="left-column">
			<div class="ad-details-card">
				<slider></slider>
				<div class="content-wrapper">
					<h1 class="ad-details-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</h1>
					<div class="ad-details-price"><span>Price:</span>600$</div>
					<div class="ad-details-location">Kyiv</div>
					<div class="ad-details-date">Добавлено: в 10:18, 13 апреля 2018</div>
					<div class="ad-details-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris</div>
				</div>
			</div>
		</div>
		<div class="right-column">
			<button class="contact-button button-message"><img src="../assets/message.svg" alt="" class="contact-icon">Contact the author</button>
			<button class="contact-button button-call"><img src="../assets/mobile-phone.svg" alt="" class="contact-icon">Phone number</button>
			<button class="contact-button button-call"><img src="../assets/star.svg" alt="" class="contact-icon">Add to favorites</button>
		</div>
	</div>
</template>

<script>
import Slider from '@/components/Slider'

export default {
	components: {
      Slider
    }
}
</script>

<style scoped lang="scss">
	.main-container {
		min-height: 100vh;
		margin: 80px 150px;
		display: flex;
		.left-column {
			padding: 0 25px;
			width: 75%;
			border: 1px solid #eee;
			.content-wrapper{
				margin-top: 90px;
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
					display: flex;
					align-items: center;
					font-size: 27px;
					span {
						font-size: 16px;
						margin-right: 10px;
					}
				}
				.ad-details-location {
					font-size: 13px;
					font-weight: 600;
				}
				.ad-details-date {
					border-bottom: 1px solid #eee;
					padding-bottom: 20px;
					font-size: 13px;
				}
				.ad-details-description {
					font-size: 16px;
					text-align: left;
					line-height: 20px;
					margin-top: 20px;
				}
			}
		}
		.right-column {
			width: 25%;
			padding: 0 15px;
			margin-left: 20px;
			.contact-button {
				width: 100%;
				height: 40px;
				margin-bottom: 20px;
				padding: 0 15px;
				display: flex;
				align-items: center;
				border: none;
				border-radius: 5px;
				background-color: #7b4fad;
				font-size: 13px;
				text-transform: uppercase;
				font-weight: 600;
				color: #fff;
				cursor: pointer;
				box-shadow:
		        0px 1px rgba(128,128,128,.8),
		        0px 2px rgba(118,118,118,.8),
		        0px 3px 2px rgba(108,108,108,.8);
		        .contact-icon {
		        	width: 20px;
		        	height: 20px;
		        	margin-right: 10px;
		        }
			}
		}
	}
	
</style>
