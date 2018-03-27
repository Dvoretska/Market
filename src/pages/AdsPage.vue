<template>
    <div>
       <navigation :page="'ads'"></navigation>
       <ads-form></ads-form>
       <footer-component></footer-component>
    </div>
</template>

<script>
import adsForm from '@/components/AdsForm'
import navigation from '@/components/Navigation'
import footerComponent from '@/components/FooterComponent'

export default {
  components: {
    adsForm,
    navigation,
    footerComponent
  }
}
</script>