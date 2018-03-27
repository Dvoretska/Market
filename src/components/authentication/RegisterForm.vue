<template>
  <div class="auth-page-wrapper">
  	<div class="auth-box">
  	 	<h2 class="auth-title" v-translate>Sign up</h2>
  	 	<div class="auth-form-container">
  	 		<p class="is-danger" v-if="nonFieldErrors">{{ nonFieldErrors }}</p>
  			<input-style :iconPath="iconMeilPath" :placeholder="translations().email" :type="'email'" @inputVal="setEmail" :errors="emailErrors" class="input-component"></input-style>
  			<input-style :iconPath="iconLockPath" :placeholder="translations().password" :type="'password'" @inputVal="setPass1" :errors="password1Errors" class="input-component"></input-style>
  			<input-style :iconPath="iconLockPath" :placeholder="translations().confirmPassword" :type="'password'" @inputVal="setPass2" :errors="password2Errors" :keyup="signUp" class="input-component"></input-style>
        <div class="flexbox-container">
          <button @click="signUp" class="auth-button"><translate>Sign up</translate>
            <i class="fa fa-spinner fa-spin fa-lg fa-fw" v-if="loading"></i>
          </button>
          <router-link :to="{ name: 'login'}"  class="link-change-route">
              <translate>Already registered? Login</translate>
          </router-link>
  			</div>
  		</div>
    </div>
  </div>
</template>

<script>
import AuthCommon from '@/components/authentication/AuthCommon'

export default {
  extends: AuthCommon,
  methods: {
    translations () {
      return {
        email: this.$gettext('Email'),
        password: this.$gettext('Password'),
        confirmPassword: this.$gettext('Confirm password')
      }
    },
    signUp () {
      this.$store.dispatch('SIGNUP', {email: this.email, password1: this.password1, password2: this.password2})
    },
    setEmail (val) {
      this.email = val
    },
    setPass1 (val) {
      this.password1 = val
    },
    setPass2 (val) {
      this.password2 = val
    }
  },
  computed: {
    password1Errors () {
      if (this.$store.getters.getErrors && this.$store.getters.getErrors.password1) {
        return this.$store.getters.getErrors.password1.join('\n')
      }
    },
    password2Errors () {
      if (this.$store.getters.getErrors && this.$store.getters.getErrors.password2) {
        return this.$store.getters.getErrors.password2.join('\n')
      }
    }
  }
}
</script>
