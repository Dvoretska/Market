<template>
<div class="slider-container">
	<tiny-slider :mouse-drag="true" :loop="false" items="1" gutter="20" :controlsText="[prevButton, nextButton]" :nav="false">
	  <div v-for="image in images" :key="image"><img :src="image" alt="Photo"></div>
	</tiny-slider>
</div>
</template>

<script>
import VueTinySlider from 'vue-tiny-slider'

export default {
	components: {
		'tiny-slider': VueTinySlider
	},
	props: {
		images: Array
	},
	data () {
		return {
			prevButton: `<span class="my-slide-prev">
            <svg viewBox="0 0 477.175 477.175">
                <g>
                    <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
               c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
                </g>
            </svg>
        </span>`,
            nextButton: `<span class="my-slide-next">
            <svg viewBox="0 0 477.175 477.175">
               <g>
                    <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
                   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
                   " />
                </g>
            </svg>
        </span>`
		} 
	}
}
</script>

<style scoped lang="scss">
	.slider-container {
		position: relative;
		height: 500px;
	}
	// /deep/ .tns-nav {
	// 	position: absolute;
	// 	top: 500px;
	// 	display: flex;
	// 	height: 80px;
	// 	margin-top: 10px;
	// }
	/deep/ button[data-controls] {
		border: 0;
		background-color: transparent;
		text-decoration: none;
		z-index: 2;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin: 0;
		box-shadow: 0 2px 8px 0 rgba(0,0,0,.08);
		display: flex;
		justify-content: center;
		align-items: center;
		&:hover {
			background-color: rgba(121, 87, 213, 1);
		}
		&:hover svg {
			fill: #fff;
		}
	}
	/deep/ button[disabled]:hover {
		cursor: not-allowed;
	}
	/deep/ button[data-controls="prev"] {
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(-50%, -50%);
	}
	/deep/ button[data-controls="next"] {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate(50%, -50%);
	}
	/deep/ .my-slide-prev, /deep/ .my-slide-next {
		svg {
			width: 25px;
			height: 25px;
		}
	}
	// /deep/ button[data-nav] {
	// 	border: 0;
	// 	background-color: transparent;
	// 	text-decoration: none;
	// 	height: 70px;
	// 	width: 50px;
	// 	cursor: pointer;
	// 	border: 1px solid #eee;
	// 	margin-right: 10px;
	// 	&:hover {
	// 		box-shadow: 0 2px 8px 0 rgba(0,0,0,.08);
	// 	}
	// }
	/deep/ .tns-item {
		padding: 0;
	  text-align: center;
	  // background:#fafafb;
	  height: 500px;
	  position: relative;
	}
	/deep/ .tns-item img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	@media screen and (max-width:320px){
		.slider-container, /deep/ .tns-item {
			height: 250px;
		}
	}
</style>
