<template>
	<div class="box">
	 	<h2>Sign up</h2>
	 	<div class="inside-form">
	 		<p class="is-danger">{{ nonFieldErrors }}</p>
			<input-style :placeholder="'Email'" :type="'email'" @inputVal="regEmail" :errors="emailErrors"></input-style>
			<input-style :placeholder="'Password'" :type="'password'" @inputVal="regPass1" :errors="password1Errors"></input-style>
			<input-style :placeholder="'Confirm Password'" :type="'password'" @inputVal="regPass2" :errors="password2Errors"></input-style>
			<button-bar :label="'Sign up'" :click="signUp"></button-bar>
      <router-link :to="{ name: 'login'}">
          <span class="back">Already registered? Login</span>
      </router-link>
		</div>
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
  },
  methods: {
    signUp () {
      this.$store.dispatch('SIGNUP', {email: this.email, password1: this.password1, password2: this.password2})
    },
    regEmail (val) {
      this.email = val
    },
    regPass1 (val) {
      this.password1 = val
    },
    regPass2 (val) {
      this.password2 = val
    }
  },
  computed: {
    nonFieldErrors () {
      if (this.$store.getters.getSignupErrors && this.$store.getters.getSignupErrors.non_field_errors) {
        return this.$store.getters.getSignupErrors.non_field_errors.join('\n')
      }
    },
    emailErrors () {
      if (this.$store.getters.getSignupErrors && this.$store.getters.getSignupErrors.email) {
        return this.$store.getters.getSignupErrors.email.join('\n')
      }
    },
    password1Errors () {
      if (this.$store.getters.getSignupErrors && this.$store.getters.getSignupErrors.password1) {
        return this.$store.getters.getSignupErrors.password1.join('\n')
      }
    },
    password2Errors () {
      if (this.$store.getters.getSignupErrors && this.$store.getters.getSignupErrors.password2) {
        return this.$store.getters.getSignupErrors.password2.join('\n')
      }
    }
  }
}
</script>

<style scoped>
  .back {
    float: left;
    font-size: 14px;
    display: inline-block;
    padding-bottom: 10px;
    color: #635a63;
  }
  .is-danger {
    font-size: 13px;
    color: white;
    background-color: red;
    text-align: center;
    margin-top: 10px;
    line-height: 25px;
    border-radius: 8px;
  }
  .box {
    border-radius: 20px;
    width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0;
    border: 1px solid rgba(128,128,128,.5);
  }
  .box h2 {
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 2px;
    text-align: center;
    padding: 10px 26px;
    border-top-right-radius: 19px;
    border-top-left-radius: 19px;
    background-color: #bbbdc9;
    border-bottom: 1px solid rgba(128,128,128,.5);
    text-shadow: 0 1px 0 #ccc, 
               0 2px 0 #c9c9c9,
               0 3px 0 #bbb,
               0 4px 0 #b9b9b9,
               /*0 5px 0 #aaa,*/
              /* 0 6px 1px rgba(0,0,0,.1),*/
               0 0 5px rgba(0,0,0,.1),
               0 1px 3px rgba(0,0,0,.3),
               0 3px 5px rgba(0,0,0,.2),
               0 5px 10px rgba(0,0,0,.25),
               0 10px 10px rgba(0,0,0,.2),
               0 15px 15px rgba(0,0,0,.15);
               color: #0f0e0f;
  }
  .inside-form {
    padding: 0 26px;
  }
</style>