<template>
  <div>
	<profile-image></profile-image>
	<profile-form></profile-form>
  </div>
</template>

<script>

import profileForm from '@/components/ProfileForm'
import profileImage from '@/components/ProfileImage'

export default {
  name: 'homeContainer',
  components: {
    profileForm,
    profileImage
  }
}
</script>

<style scoped>

</style>
