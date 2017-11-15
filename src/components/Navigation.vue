<template>
<!--  <nav class="navbar is-transparent">
  <div class="navbar-brand">
    <router-link :to="{ name: 'home'}">
      <img src="https://t4.ftcdn.net/jpg/00/96/39/61/240_F_96396185_seZoKQlTY7EndV0eIh0pOnqod1O2mWTU.jpg" class="logo-img">
    </router-link>
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item">
        <router-link :to="{ name: 'home'}" class="home navbar-item" v-bind:class="{ active: page == 'home' }"><span>Home</span></router-link>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <router-link :to="{ name: 'login'}" class="button-anim"><span v-bind:class="{ activelink: page == 'login'}">Login</span></router-link>
          </p>
          <p class="control">
            <router-link :to="{ name: 'register'}" class="button-anim"><span v-bind:class="{ activelink: page == 'register' }">Sign up</span></router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav> -->

<nav class="top-bar">
   <router-link :to="{ name: 'home'}">
      <img src="../assets/Home.png" class="logo-img">
    </router-link>

  <div class="home">
    <router-link :to="{ name: 'home'}" class="home navbar-item">
      <span>Home</span>
    </router-link>
  </div>

  <div class="log-sign">
    <router-link :to="{ name: 'login'}" class="button-anim ">
      <span v-bind:class="{ activelink: page == 'login'}">Login</span>
    </router-link>
  
    <router-link :to="{ name: 'register'}" class="button-anim">
      <span v-bind:class="{ activelink: page == 'register' }">Sign up</span>
    </router-link>
  </div>
</nav>


</template>

<script>
export default {
  props: {
    page: String
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
        0px 3px rgba(128,128,128,1), /* gradient effects */
        0px 4px rgba(118,118,118,1),
        0px 5px 2px rgba(108,108,108,1)/*,
        0px 6px rgba(98,98,98,1),
        0px 7px rgba(88,88,88,1),
        0px 10px 4px -1px rgba(128,128,128,1)*/; /* shadow */
    
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
      0px -1px #fff, /* top highlight */
      0px 1px 5px #FFFFFF; /* bottom edge */
    
    -webkit-background-size: 100%, 100%, 100%, 4px 4px;
    
    -webkit-border-radius: 10px;
    -webkit-transition: -webkit-transform .1s ease-in-out;
    
    display: inline-block;
    padding: 5px 10px 3px 10px;
    
    color: #3A474D;
    text-transform: uppercase;
    font-family: 'TradeGothicLTStd-BdCn20','PT Sans Narrow';
    font-weight: 500;
    font-size: 14px;
    
    text-shadow: 0px 1px #fff, 0px -1px #262F33;
  }
    .button-anim span:hover {
        color: #AEBF3B;
        text-shadow: 0px -1px #97A63A;
        cursor: pointer;
    }
    .button-anim:active {
        -webkit-box-shadow: 
            0px 3px rgba(128,128,128,1),
            0px 4px rgba(118,118,118,1),
            0px 5px rgba(108,108,108,1)/*,
            0px 6px rgba(98,98,98,1),
            0px 7px rgba(88,88,88,1),
            0px 9px 2px 0px rgba(128,128,128,.6)*/; /* shadow */
    }
  .activelink {
    color: red;
    -webkit-transform: translate(0, 3px);
  }
</style>

