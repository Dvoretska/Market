<template>
    <div class="box">
      <h2>Login</h2>
      <div class="inside-form">
        <p class="is-danger">{{ nonFieldErrors }}</p>
        <input-style :placeholder="'Email'" :type="'email'" @inputVal="setEmail" :errors="emailErrors"></input-style>
        <input-style :placeholder="'Password'" :type="'password'" @inputVal="setPass" :errors="passwordErrors"></input-style>
        <router-link :to="{ name: 'register'}" class="back-to-signup">
          <span>Not a member? Sign up</span>
        </router-link>
        <button-bar :label="'Login'" :click="login" class="login-button"></button-bar>
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
  props: {
    login: Function,
    setEmail: Function,
    setPass: Function,
    nonFieldErrors: String,
    emailErrors: String,
    passwordErrors: String
  }
}
</script>

<style scoped>
  .login-button {
    margin: 15px 0 20px;
  }
  .back-to-signup {
    font-size: 14px;
    color: #8c40b8;
    float: right;
    margin-top: 20px;
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
    background-color: #ac37f0;
    border-bottom: 1px solid rgba(128,128,128,.5);
    text-shadow: 0 1px 0 #ccc, 
               0 2px 0 #c9c9c9,
               0 3px 0 #bbb,
               0 4px 0 #b9b9b9,
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

