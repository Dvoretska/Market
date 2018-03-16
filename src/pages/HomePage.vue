<template>
	<div>
	  <navigation :page="'home'" ></navigation>
	  <home-form></home-form>
  	</div>
</template>

<script>
import homeForm from '@/components/HomeForm'
import navigation from '@/components/Navigation'

export default {
  components: {
    homeForm,
    navigation
  }
}
</script>


