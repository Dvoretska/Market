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
<nav class="navbar is-transparent">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </a>
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navbarExampleTransparentExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item" href="https://bulma.io/">
        Home
      </a>
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="/documentation/overview/start/">
          Docs
        </a>
        <div class="navbar-dropdown is-boxed">
          <a class="navbar-item" href="/documentation/overview/start/">
            Overview
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
            Modifiers
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
            Columns
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
            Layout
          </a>
          <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
            Form
          </a>
          <hr class="navbar-divider">
          <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
            Elements
          </a>
          <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
            Components
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://localhost:4000" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms">
              <span class="icon">
                <i class="fa fa-twitter"></i>
              </span>
              <span>
                Tweet
              </span>
            </a>
          </p>
          <p class="control">
            <a class="button is-primary" href="https://github.com/jgthms/bulma/archive/0.5.1.zip">
              <span class="icon">
                <i class="fa fa-download"></i>
              </span>
              <span>Download</span>
            </a>
          </p>
        </div>
      </div>
    </div>
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
  .navbar {
    background-color: transparent;
    position: absolute;
  }
  :focus {outline:none;}
  ::-moz-focus-inner {border:0;}

  .button-anim {

    display: inline-block;
    margin: 0 auto;
    
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
  .home {
    color: #3A474D;
    text-transform: uppercase;
    font-family: 'TradeGothicLTStd-BdCn20','PT Sans Narrow';
    font-weight: 700;
    font-size: 20px;
  }
    .home:hover {
      color: #AEBF3B;
    }
  .logo-img {
    display: inline-block;
    height: 70px;
    margin-left: 20px;
  }
  .navbar-item {
    padding: 5px 16px 11px 16px;
  }
</style>

