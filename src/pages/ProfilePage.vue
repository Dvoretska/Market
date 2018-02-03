<template>
  <div>
   <navigation :page="'profile'"></navigation>
   <profile-form></profile-form>
  </div>
</template>

<script>
import profileForm from '@/components/ProfileForm'
import navigation from '@/components/Navigation'

export default {
  components: {
    profileForm,
    navigation
  }
}
</script>
