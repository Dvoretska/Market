<template>
    <div>
       <navigation></navigation>
       <edit-ad-form :slug="$route.params.slug"></edit-ad-form>
       <footer-bar></footer-bar>
    </div>
</template>

<script>
import editAdForm from '@/components/EditAdForm'
import navigation from '@/components/Navigation'
import footerBar from '@/components/footer/FooterBar'

export default {
  components: {
    editAdForm,
    navigation,
    footerBar
  }
}
</script>
