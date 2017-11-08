<template>
  <div>
  	<navigation></navigation>
  	<register-form></register-form>
  </div>
</template>

<script>

import navigation from '@/components/Navigation'
import registerForm from '@/components/RegisterForm'

export default {
  components: {
    navigation,
    registerForm
  }
}
</script>
