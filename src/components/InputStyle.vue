<template>
  <div class="input-wrapper">
    <div class="control has-icons-left input-container" v-bind:class="{'input-container-danger': errors}">
      <input class="input" :type="type" :placeholder="placeholder" @input="getInputVal" v-model="inputVal" v-bind:class="{'input-focused': inputVal}" @keyup.enter="keyup()">
      <img :src='iconPath' class="input-container-icon">
    </div>
    <div class="input-container-errors" v-if="errors">{{ errors }}</div>
  </div>
</template>

<script>

export default {

  data () {
    return {inputVal: ''}
  },
  props: {
    placeholder: String,
    type: String,
    errors: String,
    keyup: Function,
    iconPath: String
  },
  methods: {
    getInputVal () {
      this.$emit('inputVal', this.inputVal)
    }
  }
}
</script>

<style scoped>
  .input-wrapper {
    position: relative;
  }
  .input-container {
    margin-top: 15px;
    -webkit-border-radius: 10px;
    -webkit-box-shadow: 
    0px 3px rgba(128,128,128,1), 
    0px 4px rgba(118,118,118,1);
    -webkit-transition: -webkit-box-shadow .1s ease-in-out;
    -webkit-transition: -webkit-transform .1s ease-in-out;
  }
  .input-container input {
    -webkit-border-radius: 8px;
    -webkit-box-shadow:
        0px -1px #fff,
        0px 0.5px 5px #FFFFFF;  
    border: 1px solid rgba(128,128,128,.5);
  }
  .input-container input:focus + .input-container-icon, .input-focused + .input-container-icon {
    -webkit-transform: translate(0, 5px);
  }
  .input-container input:focus, .input-focused {
    -webkit-transform: translate(0, 5px);
    border: 2px solid rgba(128,128,128,.5);
  }
  .input-container-icon {
    opacity: 0.3;
    position: absolute;
    top: 6px;
    left: 8px;
    z-index: 1;
  }
  .input-container-errors {
    font-size: 13px;
    padding-top: 7px;
    padding-left: 7px;
    color: red;
    margin-bottom: -15px;
  }
/*  .input-container-danger {
    -webkit-box-shadow:
    0px 1px #F00E0E,
    0px 2px #F00E0E,
    0px 4px #F00E0E; 
  }*/
  .input-container-danger input {
    border: 1px solid #F00E0E;
  -webkit-box-shadow:
     /*   0px -1px #F00E0E,*/
        0px 4px 0px #F00E0E;  
  }
  .input-container-danger input:focus {
    -webkit-transform: translate(0, 5px);
    border: 2px solid #F00E0E;
    box-shadow: none;
  }
</style>
