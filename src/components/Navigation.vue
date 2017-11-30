<template>
<nav class="top-bar">
   <router-link :to="{ name: 'home'}">
      <img src="../assets/Home.png" class="logo-img">
    </router-link>

  <div class="home">
    <router-link :to="{ name: 'home'}" class="home navbar-item">
      <span>Home</span>
    </router-link>
  </div>
  
  <div>
    <router-link :to="{ name: 'login'}" class="button-anim" v-if="!isLogin">
      <span v-bind:class="{ activelink: page == 'login'}">Login</span>
    </router-link>
  
    <router-link :to="{ name: 'register'}" class="button-anim" v-if="!isLogin">
      <span v-bind:class="{ activelink: page == 'register' }">Sign up</span>
    </router-link>
    <router-link :to="{ name: 'profile'}">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="user-icon" v-if="isLogin">
        <path fill="#000000" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
      </svg>
      <span class="username" v-if="isLogin">{{ userDetails.username }}</span>
    </router-link>

    <a class="button-anim button-logout" @click="logout()" v-if="isLogin">
      <span>Logout</span>
    </a>
  </div>
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
    userDetails () {
      if (localStorage.getItem('userDetails')) {
        return JSON.parse(localStorage.getItem('userDetails'))
      }
    }
  }
}
</script>
<style scoped>
  .top-bar {
    display: flex;
    height: 60px;
    align-items: center;
    padding: 0 10px;
    background-color: #f4f4f4;
    -webkit-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 14px 0px rgba(0,0,0,0.75);
  }
  .home {
    margin-right: auto;
    color: #3A474D;
    text-transform: uppercase;
    font-family: 'TradeGothicLTStd-BdCn20','PT Sans Narrow';
    font-weight: 700;
    font-size: 20px;
  }
  .home:hover {
    background-color: transparent;
    color: #AEBF3B;
  }
  .logo-img {
    height: 60px;
    background-color: transparent;
  }
  .button-anim {
    margin-bottom: 2.5px;
    display: inline-block;
    margin-right: 10px;
    
    -webkit-border-radius: 10px;
    
    -webkit-box-shadow: 
        0px 3px rgba(128,128,128,1),
        0px 4px rgba(118,118,118,1),
        0px 5px 2px rgba(108,108,108,1);
    
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
      0px -1px #fff,
      0px 1px 5px #FFFFFF;
    
    -webkit-background-size: 100%, 100%, 100%, 4px 4px;
    
    -webkit-border-radius: 10px;
    -webkit-transition: -webkit-transform .1s ease-in-out;
    
    display: inline-block;
    padding: 5px 10px 4px 10px;
    
    color: #3A474D;
    text-transform: uppercase;
    font: 500 12px 'TradeGothicLTStd-BdCn20','PT Sans Narrow';
    
    text-shadow: 0px 1px #fff, 0px -1px #262F33;
  }
    .button-anim span:hover, .username:hover {
      color: #8c40b8;
 /*     text-shadow: 0px -1px #97A63A;*/
      cursor: pointer;
    }
  .activelink {
    -webkit-transform: translate(0, 3px);
  }
  .button-logout:active span{
    -webkit-transform: translate(0, 3px);
    }
  .username {
    font-family: 'TradeGothicLTStd-BdCn20','PT Sans Narrow';
    font-weight: 600;
    font-size: 18px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .user-icon {
    vertical-align: middle;
  }  
</style>

