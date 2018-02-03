<template>
	<div>
		<navigation :page="'login'"></navigation>
	    <login-form></login-form>
    </div>
</template>

<script>
import navigation from '@/components/Navigation'
import loginForm from '@/components/LoginForm'

export default {
  components: {
    loginForm,
    navigation
  }
}
</script>

