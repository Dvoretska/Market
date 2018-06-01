<template>
  <div class="container-breadcrumbs" v-if="breadcrumbs && breadcrumbs.length > 0">
  	<nav class="breadcrumbs">
	  	<ul>
		  	<li>
		  		<a v-for="crumb in breadcrumbs" v-if="crumb.name !== 'empty'" @click.prevent="filterHandler(crumb)" v-bind:class="{'disabled': crumb == breadcrumbs[breadcrumbs.length-1]}">{{ crumb.name }}</a>
		  	</li>
	  	</ul>
  	</nav>
  </div>
</template>

<script>

export default {
  methods: {
  	filterHandler (crumb) {
  		if(crumb.slug) {
  			this.$store.dispatch('GET_FILTERED_AD_LIST', {category: crumb.slug})
  			this.$store.dispatch('GET_CATEGORIES', {category: crumb.slug, isLeafNode: false})
  		} else {
  			this.$store.dispatch('GET_FILTERED_AD_LIST')
  			this.$store.dispatch('GET_CATEGORIES')
  		}
  	}
  },
  computed: {
    breadcrumbs () {
      if(this.$store.getters.getAds.bread_crumbs) {
      	return this.$store.getters.getAds.bread_crumbs
  	  }
    }
  }
}
</script>

<style scoped lang="scss">
	.disabled {
		pointer-events: none;
		cursor: default;
	}
 	.container-breadcrumbs {
    margin-top: 45px;
 		height: auto;
 		padding: 10px 10px 0 27px;
 		color: #3f4c52;
    opacity: .9;
 		font-size: 14px;
 	}
	nav.breadcrumbs ul li a:after {
	  content: '>';
	  margin-left: 5px;
	  margin-right: 5px;
	  color: #666;
	  font-size: 12px;
	}
	nav.breadcrumbs ul li a:last-child:after {
	  display: none;
	}

</style>
