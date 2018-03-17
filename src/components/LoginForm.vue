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

export default {
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

<style scoped>
  .auth-page-wrapper {
    font-family: 'Lato', Arial, sans-serif;
    background: #fcfcfc;
    box-shadow: inset 0 20px 50px -20px rgba(0,0,0,.06);
  }
  .auth-box {
    border-radius: 8px;
    width: 40%;
    min-width: 220px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 0;
    box-shadow: 0 0 10px 0 rgba(0,0,0,.3);
    background: #fff;
    margin-top: 20vh;
  }
  .auth-title {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 2px;
    text-align: center;
    padding: 20px 26px 10px;
    text-shadow: 1px 1px 1px rgba(0,0,0,0.3),
               -1px 1px 1px rgba(0,0,0,0.9);
    color: #a087bc;
    position: relative;
    text-transform: uppercase;
  }
  .auth-title::before {
    content: "";
    width: 35%;
    height: 2px;
    background-color: rgba(0,0,0,0.9);
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  .auth-form-container {
    padding: 10px 26px 25px;
  }
  .input-component {
    margin-bottom: 25px;
  }
  .flexbox-container {
    display: flex;
    align-items: center;
  }
  .auth-button {
    height: 40px;
    padding: 0 10px;
    border: none;
    border-radius: 8px;
    text-transform: uppercase;
    background-color: #7b4fad;
    color: #fff;
    cursor: pointer;
    margin-right: auto;
  }
  .auth-button:active {
    padding: 0 10px;
  }
  .link-change-route {
    font-size: 15px;
    color: #7b4fad;
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
  @media (max-width: 1024px) {
  .auth-box {
      width: 90%;
  }
  .auth-button {
    margin-bottom: 15px;
    width: 20%;
  }
  .auth-box {
    margin-top: 10vh;
  }
  }
  @media (max-width: 480px) {
  .flexbox-container {
      flex-direction: column;
  }
  .auth-button {
    margin-bottom: 15px;
    width: 50%;
  }
  .auth-title::before {
    width: 70%;
  }
  }
</style>
