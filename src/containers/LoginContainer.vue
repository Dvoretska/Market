<template>
  <div class="log">
  	<navigation :page="'login'"></navigation>
  	<login-form class="full-height"></login-form>
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

<style scoped>
  .full-height {
  	height: 100vh;
  }
/*  .log {
  	background: url(../assets/2270.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }*/
</style>