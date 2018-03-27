<template>
	<div>
		<mq-layout mq="laptop+">
			<navigation :page="'register'"></navigation>
		</mq-layout>
	    <register-form></register-form>
	    <footer-component></footer-component>
    </div>
</template>

<script>
import navigation from '@/components/Navigation'
import registerForm from '@/components/authentication/RegisterForm'
import footerComponent from '@/components/FooterComponent'

export default {
  components: {
    registerForm,
    navigation,
    footerComponent
  }
}
</script>
