<template>
	<div>
	  <navigation :page="'home'" ></navigation>
	  <home-form></home-form>
	</div>
</template>

<script>

import navigation from '@/components/Navigation'
import homeForm from '@/components/HomeForm'

export default {
  components: {
    navigation,
    homeForm
  }
}
</script>
