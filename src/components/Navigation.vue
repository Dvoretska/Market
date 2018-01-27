<template>
<div class="parent">
  <nav class="top-bar">

    <div class="home">
      <router-link :to="{ name: 'home'}">
        <img src="../assets/Home.png" class="logo-img">
      </router-link>
    </div>

      <router-link :to="{ name: 'login'}" class="button-anim" v-if="!isLogin">
        <span v-bind:class="{ activelink: page == 'login'}">Login</span>
      </router-link>

      <router-link :to="{ name: 'register'}" class="button-anim" v-if="!isLogin">
        <span v-bind:class="{ activelink: page == 'register' }">Sign up</span>
      </router-link>

      <router-link :to="{ name: 'profile'}" v-if="isLogin && (username || name)">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="user-icon">
          <path fill="#000000" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
        <span class="username" v-if="name">{{ name }}</span>
        <span class="username" v-else>{{ username }}</span>
      </router-link>

      <router-link :to="{ name: 'ads'}" class="button-anim" v-if="isLogin">
        <span v-bind:class="{ 'activelink': page == 'ads' }">+ Create an ad</span>
      </router-link>

      <a class="button-anim button-logout" @click="logout()" v-if="isLogin">
        <span>Logout</span>
      </a>
  </nav>
</div>
</template>

<script>
export default {
  props: {
    page: String
  },
  methods: {
    logout () {
      this.$store.dispatch('LOGOUT')
    }
  },
  computed: {
    isLogin () {
      return localStorage.getItem('token')
    },
    username () {
      return this.$store.getters.getUserDetails.username
    },
    name () {
      return this.$store.getters.getUserDetails.first_name
    }
  }
}
</script>
<style scoped>
  .parent {
    position: fixed;
    top: 0;
    left: 0;
    margin: auto;
    width: 100%;
    z-index: 9999;
  }
  .top-bar {
    display: flex;
    height: 55px;
    align-items: center;
    padding: 0 10px;
    background-color: #f4f4f4;
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
  }
  .home {
    margin-right: auto;
  }
  .logo-img {
    height: 50px;
    background-color: transparent;
  }
  .button-anim {
    -webkit-transform: translate(0, -3px);
    display: inline-block;
    margin-right: 10px;

    -webkit-border-radius: 11px;

    -webkit-box-shadow:
        0px 3px rgba(118,118,118,1),
        0px 4px 2px rgba(108,108,108,1);

    -webkit-transition: -webkit-box-shadow .1s ease-in-out;
  }

  .button-anim span {
    background-color: #E8E8E8;

    background-image:
    /* gloss gradient */
    -webkit-gradient(
        linear,
        left bottom,
        left top,
        color-stop(50%,rgba(255,255,255,0)),
        color-stop(50%,rgba(255,255,255,0.3)),
        color-stop(100%,rgba(255,255,255,0.2))),

    /* dark outside gradient */
    -webkit-gradient(
        linear,
        left top,
        right top,
        color-stop(0%,rgba(210,210,210,0.3)),
        color-stop(20%,rgba(210,210,210,0)),
        color-stop(80%,rgba(210,210,210,0)),
        color-stop(100%,rgba(210,210,210,0.3))),

    /* light inner gradient */
    -webkit-gradient(
        linear,
        left top,
        right top,
        color-stop(0%,rgba(255,255,255,0)),
        color-stop(20%,rgba(255,255,255,0.5)),
        color-stop(80%,rgba(255,255,255,0.5)),
        color-stop(100%,rgba(255,255,255,0))),

    /* diagonal line pattern */
    -webkit-gradient(
        linear,
        0% 100%,
        100% 0%,
        color-stop(0%,rgba(255,255,255,0)),
        color-stop(40%,rgba(255,255,255,0)),
        color-stop(40%,#D2D2D1),
        color-stop(60%,#D2D2D1),
        color-stop(60%,rgba(255,255,255,0)),
        color-stop(100%,rgba(255,255,255,0)));

    -webkit-box-shadow:
        0px -0.7px #fff,
        0px 0.5px 5px #FFFFFF;

    -webkit-background-size: 100%, 100%, 100%, 4px 4px;

    -webkit-border-radius: 10px;
    -webkit-transition: -webkit-transform .1s ease-in-out;

    display: inline-block;
    padding: 5px 8px;

    color: #3A474D;
    text-transform: uppercase;
    font: 700 12px Futura, "Trebuchet MS", Arial, sans-serif;
  }
    .button-anim span:hover, .username:hover {
      color: #8c40b8;
      cursor: pointer;
    }
  .activelink, .button-logout:active span {
    -webkit-transform: translate(0, 3px);
  }
  .username {
    font: 700 17px Futura, "Trebuchet MS", Arial, sans-serif;
    margin-right: 10px;
    vertical-align: middle;
    color: #7957d5;
  }
  .user-icon {
    vertical-align: middle;
  }
</style>

