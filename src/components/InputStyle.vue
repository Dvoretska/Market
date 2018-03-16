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
    border-radius: 8px;
  }
  .input-container input {
    border-radius: 5px;
    height: 45px;
    background-color: #fcfcfc;
    font-weight: 400;
    border: 1px solid #bcbaba;
    opacity: 1;
    box-shadow: none;
  }
  .input-container input:focus, .input-focused {
    box-shadow: 0 0 8px 0 rgba(0,0,0,.1);
    transition: box-shadow .2s!important;
  }
  .input-container-icon {
    opacity: 0.3;
    position: absolute;
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
    z-index: 1;
  }
  .input-container-errors {
    font-size: 13px;
    padding-left: 7px;
    color: red;
    margin-bottom: -15px;
  }
  .input-container-danger input {
    border: 1px solid #F00E0E;
  }
  .input-container-danger input:focus {
    border: 1px solid #F00E0E;
    box-shadow: none;
  }
</style>
