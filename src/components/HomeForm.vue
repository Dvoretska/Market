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
        			<div class="product-details">
						<button-bar :label="'More options'"></button-bar>
					</div>
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
	        			<div class="product-details">
							<button-bar :label="'More options'"></button-bar>
						</div>
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
	        			<div class="product-details">
							<button-bar :label="'More options'"></button-bar>
						</div>
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
	        			<div class="product-details">
							<button-bar :label="'More options'"></button-bar>
						</div>
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
      rating: 3.3
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
/*	.cards {
		width: calc(100% - 300px);
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: baseline;
	}
	.product-card {
		display: inline-block;
	    margin:10px 0 0 10px;
	    flex-grow: 1; 
	    width: calc(100% * (1/3) - 10px - 1px);
		height: 400px;
		font: 500 16px 'TradeGothicLTStd-BdCn20','PT Sans Narrow';
        border: 1px solid black;
	}*/
	.filters {
		width: 270px;
		height: 1000px;
		border: 2px solid black;
	}
	.cards {
		width: calc(100% - 270px);
	}
	.product-card {
		float: left;
		display: inline-block;
	    margin:10px 0 0 10px; 
	    width: calc(100% * (1/4) - 10px - 1px);
		height: 420px;
        border: solid 1px #D7D7D7;
	}
	.product-card:hover {
		border: solid 1px #CCC;
	    -moz-box-shadow: 1px 1px 3px #999;
	    -webkit-box-shadow: 1px 1px 3px #999;
        box-shadow: 1px 1px 3px #999;
	}
	.image-block {
		margin: 15px !important;
	/*	width: 275px;*/
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
/*    	vertical-align: top;*/
    	max-width: 100%;
    	max-height: 100%;
/*    	border: 0;*/
    	object-fit: contain;
    }
    .product-description {
		margin: 15px;
    }
    .stars-outer {
	  display: inline-block;
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
	.stars-outer::before {
	  content: "\f006 \f006 \f006 \f006 \f006";
	} 
	.stars-inner::before {
	  content: "\f005 \f005 \f005 \f005 \f005";
	}
	.product-details {
		margin-top: 10px;
		margin-bottom: 10px;
		text-align: center;
	}
	.product-rating {
		margin-top: 5px;
	}
	.product-name {
		height: 75px;
		font-size: 13px;
		overflow: hidden;
	}
</style>