<template>
	<div>
		<mq-layout mq="laptop+">
			<navigation :page="'register'"></navigation>
		</mq-layout>
	    <register-form></register-form>
	    <footer-bar></footer-bar>
    </div>
</template>

<script>
import navigation from '@/components/Navigation'
import registerForm from '@/components/authentication/RegisterForm'
import footerBar from '@/components/footer/FooterBar'

export default {
  components: {
    registerForm,
    navigation,
    footerBar
  }
}
</script>
