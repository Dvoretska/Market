<template>
  <div>
  	<navigation :page="'register'"></navigation>
  	<register-form :signUp="signUp" :setEmail="setEmail" :setPass1="setPass1" :setPass2="setPass2" :nonFieldErrors="nonFieldErrors" :emailErrors="emailErrors" :password1Errors="password1Errors" :password2Errors="password2Errors"></register-form>
  </div>
</template>

<script>

import navigation from '@/components/Navigation'
import registerForm from '@/components/RegisterForm'

export default {
  components: {
    navigation,
    registerForm
  },
  created () {
    this.$store.dispatch('CLEAR_ERRORS')
  },
  methods: {
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
