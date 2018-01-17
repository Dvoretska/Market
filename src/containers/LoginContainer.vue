<template>
  <div>
  	<navigation :page="'login'"></navigation>
  	<login-form :login="login" :setEmail="setEmail" :setPass="setPass" :nonFieldErrors="nonFieldErrors" :emailErrors="emailErrors" :passwordErrors="passwordErrors"></login-form>
  </div>
</template>

<script>

import navigation from '@/components/Navigation'
import loginForm from '@/components/LoginForm'

export default {
  components: {
    navigation,
    loginForm
  },
  methods: {
    login () {
      this.$store.dispatch('LOGIN', {email: this.email, password: this.password})
    },
    setEmail (val) {
      this.email = val
    },
    setPass (val) {
      this.password = val
    }
  },
  created () {
    this.$store.dispatch('CLEAR_ERRORS')
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
    passwordErrors () {
      if (this.$store.getters.getErrors && this.$store.getters.getErrors.password) {
        return this.$store.getters.getErrors.password.join('\n')
      }
    }
  }
}
</script>

