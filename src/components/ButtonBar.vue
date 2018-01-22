<template>
  <div class="button-anim">
    <span v-on:click="click()">{{ label }}<i class="fa fa-spinner fa-spin fa-lg fa-fw" v-if="loading"></i></span>
  </div>
</template>

<script>

export default {
  props: {
    label: String,
    click: Function
  },
  computed: {
    loading () {
      return this.$store.getters.getLoading
    }
  }
}
</script>

<style scoped>
  .button-anim {
    -webkit-transform: translate(0, -2px);
    display: inline-block;

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
        0px -0.7px #fff,
        0px 0.5px 5px #FFFFFF; 
    
    -webkit-background-size: 100%, 100%, 100%, 4px 4px;
    
    -webkit-border-radius: 10px;
    -webkit-transition: -webkit-transform .1s ease-in-out;
    
    display: inline-block;
    padding: 5px 10px;
    
    color: #3A474D;
    text-transform: uppercase;
    font: 700 12px Futura, "Trebuchet MS", Arial, sans-serif;
  }
  .button-anim span:hover {
    color: #8c40b8;
    cursor: pointer;
  }

  .button-anim:active {
    -webkit-box-shadow: 
        0px 3px rgba(128,128,128,1),
        0px 4px rgba(118,118,118,1),
        0px 5px rgba(108,108,108,1);
  }
  .button-anim:active span {
    -webkit-transform: translate(0, 3px);
  }
</style>

