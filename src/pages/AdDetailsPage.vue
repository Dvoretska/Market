<template>
    <div>
       <navigation :page="'ad-details'"></navigation>
       <ad-details></ad-details>
       <footer-bar v-if="!getAdDetailsLoading"></footer-bar>
    </div>
</template>

<script>
import adDetails from '@/components/AdDetails'
import navigation from '@/components/Navigation'
import footerBar from '@/components/footer/FooterBar'

export default {
  components: {
    adDetails,
    navigation,
    footerBar
  },
  computed: {
    getAdDetailsLoading () {
      return this.$store.getters.getAdDetailsLoading
    },
  }
}
</script>