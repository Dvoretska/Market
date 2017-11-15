<template>
    <div class="box">
      <h2>Login</h2>
      <div class="inside-form">
        <p class="is-danger">{{ nonFieldErrors }}</p>
        <input-style :placeholder="'Email'" :type="'email'" @inputVal="setEmail" :errors="emailErrors"></input-style>
        <input-style :placeholder="'Password'" :type="'password'" @inputVal="setPass" :errors="passwordErrors"></input-style>
        <button-bar :label="'Login'" :click="login"></button-bar>
        <router-link :to="{ name: 'register'}">
          <span class="back-to-reg">Not a member? Sign up</span>
        </router-link>
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
    nonFieldErrors () {
      if (this.$store.getters.getLoginErrors && this.$store.getters.getLoginErrors.non_field_errors) {
        return this.$store.getters.getLoginErrors.non_field_errors.join('\n')
      }
    },
    emailErrors () {
      if (this.$store.getters.getLoginErrors && this.$store.getters.getLoginErrors.email) {
        console.log(this.$store.getters.getLoginErrors.email.join('\n'))
        return this.$store.getters.getLoginErrors.email.join('\n')
      }
    },
    passwordErrors () {
      if (this.$store.getters.getLoginErrors && this.$store.getters.getLoginErrors.password) {
        return this.$store.getters.getLoginErrors.password.join('\n')
      }
    }
  }
}
</script>

<style scoped>
  .back-to-reg {
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

