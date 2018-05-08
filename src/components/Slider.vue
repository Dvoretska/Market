<template>
	<div class="slider-container" v-if="images.length !== 0">
	    <gallery :images="images" :index="index" @close="index = null"></gallery>
	    <div
	      class="image"
	      v-for="(image, imageIndex) in images"
	      :key="imageIndex"
	      @click="index = imageIndex"
	      :style="{ backgroundImage: 'url(' + image + ')', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }"
	    ></div>
	</div>
	<div class="slider-container" v-else>
	    <gallery :images="images" :index="index" @close="index = null"></gallery>
	    <div
	      class="image"
	      :style="{ backgroundImage: 'url(' + getDefaultImage + ')', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }"
	    ></div>
	</div>
</template>

<script>
import VueGallery from 'vue-gallery';

export default {
	components: {
		'gallery': VueGallery
	},
	props: {
		images: Array
	},
	data: function () {
      return {
        index: null
      }
    },
    computed: {
    	getDefaultImage () {
	      return require('@/assets/default.png')
	    }
    }
}
</script>

<style scoped lang="scss">
	.slider-container {
		.image {
			width: 100%;
			height: 400px;
			margin-bottom: 10px;
		}
	}
	@media screen and (max-width:767px){
		.slider-container {
			.image {
				height: 300px;
			}
		}
	}
	@media screen and (max-width:575px){
		.slider-container {
			.image {
				height: 250px;
			}
		}
	}
	@media screen and (max-width:320px){
		.slider-container {
			.image {
				height: 200px;
			}
		}
	}
</style>
