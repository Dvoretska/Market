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

import buttonBar from '@/components/ButtonBar'
import inputStyle from '@/components/InputStyle'
import iconLock from '@/assets/lock.svg'
import iconMeil from '@/assets/meil.svg'
import AuthCommon from '@/components/authentication/AuthCommon'

export default {
  extends: AuthCommon,
  components: {
    buttonBar,
    inputStyle
  },
  created () {
    this.$store.dispatch('CLEAR_ERRORS')
  },
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
    loading () {
      return this.$store.getters.getLoading
    },
    iconLockPath () {
      return iconLock
    },
    iconMeilPath () {
      return iconMeil
    },
    nonFieldErrors () {
      if (this.$store.getters.getErrors && this.$store.getters.getErrors.non_field_errors) {
        return this.$store.getters.getErrors.non_field_errors.join('\n')
      }
    },
    emailErrors () {
      if (this.$store.getters.getErrors && this.$store.getters.getErrors.email) {
        return this.$store.getters.getErrors.email.join('\n')
      }
    },
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
