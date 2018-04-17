<template>
  <div class="container-breadcrumbs" v-if="breadcrumbs.length > 0">
  	<nav class="breadcrumbs">
	  	<ul>
		  	<li>
		  		<a v-for="crumb in breadcrumbs" v-if="crumb.name !== 'empty'">{{ crumb.name }}</a>
		  	</li>
	  	</ul>
  	</nav>
  </div>
</template>

<script>

export default {
  computed: {
    breadcrumbs () {
      if(this.$store.getters.getAds.bread_crumbs) {
      	return this.$store.getters.getAds.bread_crumbs;
  	  }
    }
  }
}
</script>

<style scoped lang="scss">
 	.container-breadcrumbs {
 		height: auto;
 		padding: 10px;
 		color: #3f4c52;
 		font-size: 16px;
 	}
 // 	nav.breadcrumbs a {
	//   color: #666;
	//   font-size: 12px;
	// }
	// nav.breadcrumbs ul {
	//   list-style: none;
	//   margin: 0;
	//   padding: 0;
	// }
	// nav.breadcrumbs ul li {
	//   display: inline-block;
	// }
	nav.breadcrumbs ul li a:after {
	  content: '/';
	  margin-left: 5px;
	  margin-right: 5px;
	  color: #666;
	  font-size: 12px;
	}
	nav.breadcrumbs ul li a:last-child:after {
	  display: none;
	}

</style>
