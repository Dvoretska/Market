<template>
	<div>
		<mq-layout mq="laptop+">
			<navigation :page="'login'"></navigation>
		</mq-layout>
	    <login-form></login-form>
	    <footer-bar></footer-bar>
    </div>
</template>

<script>
import navigation from '@/components/Navigation'
import loginForm from '@/components/authentication/LoginForm'
import footerBar from '@/components/footer/FooterBar'

export default {
  components: {
    loginForm,
    navigation,
    footerBar
  }
}
</script>


