<template>
    <div>
       <navigation :page="'ads'"></navigation>
       <ads-form></ads-form>
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
