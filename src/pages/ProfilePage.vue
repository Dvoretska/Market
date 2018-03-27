<template>
  <div>
   <navigation :page="'profile'"></navigation>
   <profile-form :page="'profile'"></profile-form>
   <footer-component></footer-component>
  </div>
</template>

<script>
import profileForm from '@/components/ProfileForm'
import navigation from '@/components/Navigation'
import footerComponent from '@/components/FooterComponent'

export default {
  components: {
    profileForm,
    navigation,
    footerComponent
  }
}
</script>
