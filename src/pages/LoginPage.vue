<template>
	<div>
		<mq-layout mq="laptop+">
			<navigation :page="'login'"></navigation>
		</mq-layout>
	    <login-form></login-form>
	    <footer-component></footer-component>
    </div>
</template>

<script>
import navigation from '@/components/Navigation'
import loginForm from '@/components/authentication/LoginForm'
import footerComponent from '@/components/FooterComponent'

export default {
  components: {
    loginForm,
    navigation,
    footerComponent
  }
}
</script>


