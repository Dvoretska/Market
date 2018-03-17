<template>
  <div class="auth-page-wrapper">
  	<div class="auth-box">
  	 	<h2 class="auth-title" v-translate>Sign up</h2>
  	 	<div class="auth-form-container">
  	 		<p class="is-danger" v-if="nonFieldErrors">{{ nonFieldErrors }}</p>
  			<input-style :iconPath="iconMeilPath" :placeholder="$gettext('Email')" :type="'email'" @inputVal="setEmail" :errors="emailErrors" class="input-component"></input-style>
  			<input-style :iconPath="iconLockPath" :placeholder="$gettext('Password')" :type="'password'" @inputVal="setPass1" :errors="password1Errors" class="input-component"></input-style>
  			<input-style :iconPath="iconLockPath" :placeholder="$gettext('Confirm password')" :type="'password'" @inputVal="setPass2" :errors="password2Errors" :keyup="signUp" class="input-component"></input-style>
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

export default {
  components: {
    buttonBar,
    inputStyle
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
    margin-top: 15vh;
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
    border: none;
    padding: 0 10px;
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
