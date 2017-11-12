<template>
  <div class="login">
    <div class="box">
      <h2 v-bind:class="{ green: success, red: !success }">Login</h2>
      <input-style :placeholder="'Email'" :type="'email'" @inputVal="setEmail"></input-style>
      <input-style :placeholder="'Password'" :type="'password'" @inputVal="setPass"></input-style>
      <button-bar :label="'Login'" :click="login"></button-bar>
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
    success () {
      return this.$store.getters.getLoginResponse
    }
  }
}
</script>

<style scoped>
  .green {
    color: lightgreen;
  }
  .red {
    color: red;
  }
  .box {
    margin-top: -150px;
    width: 500px;
    margin: auto;
    padding: 3em 3em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  h2 {
    background: transparent;
    font-size: 24px;
    text-align: center;
    transform: translateY(-30px);
  }
/*  .login {
    height: 600px;
    display: block;
    position: relative;
  }
  .login::after {
    content: "";
    background-image: url(../assets/2270.jpg);
    background-size: cover;
    height: 100%;
    opacity: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;   
  }*/
</style>

