<template>
	<div>
	  <navigation :page="'home'" ></navigation>
	  <ads-list></ads-list>
	  <footer-component></footer-component>
  	</div>
</template>

<script>
import adsList from '@/components/AdsList'
import navigation from '@/components/Navigation'
import footerComponent from '@/components/FooterComponent'

export default {
  components: {
    adsList,
    navigation,
    footerComponent
  }
}
</script>


