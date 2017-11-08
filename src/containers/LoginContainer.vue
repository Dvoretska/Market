<template>
  <div>
  	<navigation></navigation>
  	<login-form></login-form>
  </div>
</template>

<script>

import navigation from '@/components/Navigation'
import loginForm from '@/components/LoginForm'

export default {
  name: 'homeContainer',
  components: {
    navigation,
    loginForm
  }
}
</script>
