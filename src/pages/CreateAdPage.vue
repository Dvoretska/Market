<template>
    <div class="create-ad-container">
       <navigation :page="'create-ad'"></navigation>
       <create-ad-form></create-ad-form>
       <footer-bar></footer-bar>
    </div>
</template>

<script>
import createAdForm from '@/components/CreateAdForm'
import navigation from '@/components/Navigation'
import footerBar from '@/components/footer/FooterBar'

export default {
  components: {
    createAdForm,
    navigation,
    footerBar
  }
}
</script>

<style scoped lang="scss">
  .create-ad-container {
    overflow-x: auto;
  }
</style>
