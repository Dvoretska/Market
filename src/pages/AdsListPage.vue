<template>
	<div @click="closeOrdering()">
	  <navigation :page="'ads'"></navigation>
	  <ads-list></ads-list>
	  <footer-bar></footer-bar>
  	</div>
</template>

<script>
import adsList from '@/components/AdsList'
import navigation from '@/components/Navigation'
import footerBar from '@/components/footer/FooterBar'

export default {
  components: {
    adsList,
    navigation,
    footerBar
  },
  methods: {
    closeOrdering () {
      this.$store.commit('setOrderingState', {isOpen: false})
    }
  }
}
</script>


