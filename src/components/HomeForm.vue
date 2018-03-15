<template>
	<div class="product-container">
		<aside class="filters">Aside</aside>
		<div class="cards">
			<div class="product-card">
			    <div class="image-block">
					<div class="product-image">
						<img src="../assets/images.jpeg" alt="">
					</div>	
				</div>
				<div class="product-description">
					<div class="product-price">$600</div>
					<div class="product-name">Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
					<div class="product-rating">
						<div class="stars-outer">
          					<div class="stars-inner" v-bind:style="stars"></div>
        				</div>
        			</div>
        			<div class="product-details">
						<button-bar :label="'More options'"></button-bar>
					</div>
				</div>
			</div>
			<div class="product-card">
			    <div class="image-block">
					<div class="product-image">
						<img src="../assets/index2.jpeg" alt="">
					</div>
				</div>
				<div class="product-description">
				    <div class="product-price">$560</div>
					<div class="product-name">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
					<div class="product-rating">
						<div class="stars-outer">
          					<div class="stars-inner" v-bind:style="stars"></div>
        				</div>
        			</div>
        			<div class="product-details">
						<button-bar :label="'More options'"></button-bar>
					</div>
				</div>
			</div>
			<div class="product-card">
			    <div class="image-block">
					<div class="product-image">
						<img src="../assets/index.jpeg" alt="">
					</div>	
				</div>
				<div class="product-description">
				    <div class="product-price">$760</div>
					<div class="product-name">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
					<div class="product-rating">
						<div class="stars-outer">
          					<div class="stars-inner" v-bind:style="stars"></div>
        				</div>
        			</div>
        			<div class="product-details">
						<button-bar :label="'More options'"></button-bar>
					</div>
				</div>
			</div>
			<div class="product-card">
			    <div class="image-block">
					<div class="product-image">
						<img src="../assets/couch.jpg" alt="">
					</div>	
				</div>
				<div class="product-description">
				    <div class="product-price">$830</div>
					<div class="product-name">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
					<div class="product-rating">
						<div class="stars-outer">
          					<div class="stars-inner" v-bind:style="stars"></div>
        				</div>
        			</div>
        			<div class="product-details">
						<button-bar :label="'More options'"></button-bar>
					</div>
				</div>
			</div>
			<div class="product-card"></div>
			<div class="product-card"></div>
			<div class="product-card"></div>
			<div class="product-card"></div>
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
  computed: {
    stars: function () {
      return {
        'width': Math.round(((this.rating / 5) * 100) / 10) * 10 + '%'
      }
    }
  }
}
</script>

<style scoped>
    .product-container {
		display: flex;
	}
	.cards {
		width: calc(100% - 270px);
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-content: baseline;
	}
	.product-card {
	    margin:10px 0 0 10px;
	    flex-grow: 1; 
		height: 420px;
		font: 500 16px 'TradeGothicLTStd-BdCn20','PT Sans Narrow';
        border: 1px solid #D7D7D7;
	}
	.filters {
		width: 270px;
		height: 1000px;
		border: 2px solid black;
	}
	.product-card:hover {
		border: solid 1px #CCC;
	    -moz-box-shadow: 1px 1px 3px #999;
	    -webkit-box-shadow: 1px 1px 3px #999;
        box-shadow: 1px 1px 3px #999;
	}
	.image-block {
		margin: 15px;
		height: 200px;
		position: relative;
	}
	.product-price {
		padding-bottom: 15px;
		font-size: 21px;
		font-weight: 600;
		line-height: 16px;
	}
	div.product-image {
	    height: 100%;
	    width: 100%;
	    position: absolute;
	    top: 0;
	    left: 0;
	    display: flex;
	    justify-content: center;
    }
    div.product-image img {
    	max-width: 100%;
    	max-height: 100%;
    	object-fit: contain;
    }
    .product-description {
		margin: 15px;
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
	.product-details {
		margin-top: 13px;
		margin-bottom: 10px;
		text-align: center;
	}
	.product-rating {
		margin-top: 5px;
		max-height: 20px;
		width: 91px;
	}
	.product-name {
		height: 70px;
		font-size: 13px;
		overflow: hidden;
	}
	@media (max-width: 1499px) {
		.product-card {
			width: calc(25% - 10px - 1px);
		}
	}
	@media (min-width: 993px) and (max-width: 1199px) {
		.product-card {
			width: calc(33% - 10px - 1px);
		}
	}
	@media (max-width: 992px) {
		.product-card {
			width: calc(50% - 10px - 1px);
		}
	}
	@media (max-width: 650px) {
		.product-card {
			width: calc(100% - 10px - 1px);
			min-width: 250px;
		}
		.product-container {
			overflow-y: scroll;
		}
	}
</style>
