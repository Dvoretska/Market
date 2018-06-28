<template>
    <div>
       <navigation></navigation>
       <ads-form :slug="$route.params.slug"></ads-form>
       <footer-bar></footer-bar>
    </div>
</template>

<script>
import adsForm from '@/components/AdsForm'
import navigation from '@/components/Navigation'
import footerBar from '@/components/footer/FooterBar'

export default {
  components: {
    adsForm,
    navigation,
    footerBar
  }
}
</script>
