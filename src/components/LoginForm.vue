<template>
    <div class="auth-page-wrapper">
      <div class="auth-box">
        <h2 class="auth-title" v-translate>Login</h2>
        <div class="auth-form-container">
          <p class="is-danger" v-if="nonFieldErrors">{{ nonFieldErrors }}</p>
          <input-style :iconPath="iconMeilPath" :placeholder="translations().email" type="translations()['email']" @inputVal="setEmail" :errors="emailErrors" class="input-component"></input-style>
          <input-style :iconPath="iconLockPath" :placeholder="translations().password" type="password" @inputVal="setPass" :errors="passwordErrors" :keyup="login" class="input-component"></input-style>
          <div class="flexbox-container">
            <button @click="login" class="auth-button"><translate>Login</translate>
              <i class="fa fa-spinner fa-spin fa-lg fa-fw" v-if="loading"></i>
            </button>
            <router-link :to="{ name: 'register'}" class="link-change-route">
              <span v-translate>Not a member? Sign up</span>
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
        password: this.$gettext('Password')
      }
    },
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
    passwordErrors () {
      if (this.$store.getters.getErrors && this.$store.getters.getErrors.password) {
        return this.$store.getters.getErrors.password.join('\n')
      }
    }
  }
}
</script>
