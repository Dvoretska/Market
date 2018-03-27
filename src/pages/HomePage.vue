<template>
	<div>
	  <navigation :page="'home'" ></navigation>
	  <home-form></home-form>
	  <footer-component></footer-component>
  	</div>
</template>

<script>
import homeForm from '@/components/HomeForm'
import navigation from '@/components/Navigation'
import footerComponent from '@/components/FooterComponent'

export default {
  components: {
    homeForm,
    navigation,
    footerComponent
  }
}
</script>


