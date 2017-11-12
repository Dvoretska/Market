<template>
  <div class="log">
  	<navigation :page="'register'"></navigation>
  	<register-form class="full-height"></register-form>
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