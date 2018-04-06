<template>
  <div>
   <navigation :page="'profile'"></navigation>
   <profile-form :page="'profile'"></profile-form>
   <footer-bar></footer-bar>
  </div>
</template>

<script>
import profileForm from '@/components/ProfileForm'
import navigation from '@/components/Navigation'
import footerBar from '@/components/footer/FooterBar'

export default {
  components: {
    profileForm,
    navigation,
    footerBar
  }
}
</script>
