<template>
	<div>
		<mq-layout mq="laptop+">
			<navigation :page="'register'"></navigation>
		</mq-layout>
	    <register-form></register-form>
    </div>
</template>

<script>
import navigation from '@/components/Navigation'
import registerForm from '@/components/RegisterForm'

export default {
  components: {
    registerForm,
    navigation
  }
}
</script>
