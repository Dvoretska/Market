<template>
	<div class="register-form">
	 	<div class="box">
		  	<input-style :placeholder="'Email'"></input-style>
			<input-style :placeholder="'Password'"></input-style>
			<input-style :placeholder="'Confirm Password'"></input-style>
		   	<button-bar :label="'Sign up'"></button-bar>
	  	</div>
    </div>
</template>

<script>

import buttonBar from '@/components/ButtonBar'
import inputStyle from '@/components/InputStyle'

export default {
  components: {
    buttonBar,
    inputStyle
  }
}
</script>

<style scoped>
  .register-form {
    width: 500px;
  }
  .box {
	margin-top: -150px;
	width: 500px;
	margin: auto;
	padding: 3em 3em;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
  }
</style>