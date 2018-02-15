<template>
  <nav class="nav-bar">

    <div class="nav-logo-container">
      <router-link :to="{ name: 'home'}">
        <img src="../assets/Home.png" class="nav-logo-img">
      </router-link>
    </div>

      <router-link :to="{ name: 'login'}" class="button-anim" v-if="!isLogin">
        <span v-bind:class="{ activelink: page == 'login'}">Login</span>
      </router-link>

      <router-link :to="{ name: 'register'}" class="button-anim" v-if="!isLogin">
        <span v-bind:class="{ activelink: page == 'register' }">Sign up</span>
      </router-link>

        <div class="nav-user-info">
          <router-link :to="{ name: 'profile'}" v-if="isLogin && (username || name)">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="user-icon">
              <path fill="#000000" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
            </svg>
            <span class="username" v-if="name">{{ name }}</span>
            <span class="username" v-else>{{ username }}</span>
            <i class="material-icons">&#xE5C5;</i>
          </router-link>
          <ul class="submenu">
            <li>
              <router-link to="/profile">Ads</router-link>
            </li>
            <li>
              <router-link to="/profile/message">Messages</router-link>
            </li>
            <li>
              <a href="">Settings</a>
            </li>
            <li class="parent-relative">
              <a @click="logout()">
                <i class="material-icons">&#xE879;</i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>

      <router-link :to="{ name: 'ads'}" class="button-anim" v-if="isLogin">
        <span v-bind:class="{ 'activelink': page == 'ads' }">+ Create an ad</span>
      </router-link>
  </nav>
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
  .nav-bar {
    display: flex;
    height: 55px;
    align-items: center;
    position: sticky;
    z-index: 10;
    top: 0;
    width: 100%;
    padding: 0 10px;
    background-color: #f4f4f4;
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
  }
  .nav-logo-container {
    margin-right: auto;
  }
  .nav-logo-img {
    height: 50px;
    background-color: transparent;
  }
  .button-anim {
    transform: translate(0, -3px);
    display: inline-block;
    margin-right: 10px;
    border-radius: 11px;
    box-shadow:
        0px 3px rgba(118,118,118,1),
        0px 4px 2px rgba(108,108,108,1);
    transition: -webkit-box-shadow .1s ease-in-out;
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
  .activelink {
    -webkit-transform: translate(0, 3px);
  }
  .nav-user-info {
    position: relative;
  }
  .nav-user-info .material-icons {
    position: absolute;
    left: 75px;
    top: 16px;
  }
  .username {
    display: inline-block;
    height: 55px;
    font: 700 17px Futura, "Trebuchet MS", Arial, sans-serif;
    margin-right: 10px;
    vertical-align: middle;
    color: #7957d5;
    padding: 19px 15px 0 0;
  }
  .user-icon {
    vertical-align: middle;
  }
  .parent-relative {
    position: relative;
  }
  .parent-relative .material-icons {
    position: absolute;
    top: 6px;
    left: 13px;
  }
  .parent-relative span {
    padding-left: 23px;
    display: inline-block;
  }
  .submenu {
    background: #fff;
    position: absolute;
    left: 0;
    top: 55px;
    width: 150px;
    transition: .5s ease-in-out;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: 0 0;
  }
  .submenu a {
    border-bottom: 1px solid #ccc;
    display: inline-block;
    color: black;
    text-align: left;
    font-size: 15px;
    padding: 7px 15px;
    width: 100%;
  }
  .nav-user-info:hover .submenu {
    opacity: 1;
    transform: scaleY(1);
  }
  .submenu a:hover {
    background-color: #f4f4f4;
  }
  .submenu a:first-child:hover {
    border-top: 1px solid #ccc;
    margin-top: -1px;
  }
</style>

