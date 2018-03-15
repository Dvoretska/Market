<template>
	<div>
		<mq-layout mq="tablet+">
			<navigation :page="'login'"></navigation>
		</mq-layout>
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


