<template>
  <div>
   <navigation :page="'home'"></navigation>
   <profile-container></profile-container>
  </div>
</template>

<script>
import profileContainer from '@/containers/ProfileContainer'
import navigation from '@/components/Navigation'

export default {
  components: {
    profileContainer,
    navigation
  }
}
</script>
