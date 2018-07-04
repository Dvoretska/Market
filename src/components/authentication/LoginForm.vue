<template>
    <div class="auth-page-wrapper">
      <div class="auth-box">
        <h2 class="auth-title" v-translate>Login</h2>
        <div class="auth-form-container">
          <p class="is-danger" v-if="nonFieldErrors">{{ nonFieldErrors }}</p>
          <input-style
            :iconPath="iconMeilPath"
            :placeholder="translations().email"
            type="translations()['email']"
            @inputVal="setEmail"
            :errors="emailErrors"
            class="input-component"
            :autocomplete="'email'">
          </input-style>
          <input-style
            :iconPath="iconLockPath"
            :placeholder="translations().password"
            type="password"
            @inputVal="setPass"
            :errors="passwordErrors"
            :keyup="login"
            class="input-component"
            :autocomplete="'new-password'">
          </input-style>
          <div class="flexbox-container">
            <button @click="login" class="auth-button"><translate>Login</translate>
              <i class="fa fa-spinner fa-spin fa-lg fa-fw" v-if="loading"></i>
            </button>
            <router-link :to="{ name: 'register'}" class="link-change-route">
              <span v-translate>Not a member? Sign up</span>
            </router-link>
            <router-link :to="{ name: 'home'}" class="link-change-route link-back-home">
              <img src="@/assets/back-arrow.svg" alt="" class="icon-back-home">
              <span v-translate>Back to home page</span>
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
    passwordErrors () {
      if (this.$store.getters.getErrors && this.$store.getters.getErrors.password) {
        return this.$store.getters.getErrors.password.join('\n')
      }
    }
  }
}
</script>
