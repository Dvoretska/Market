<template>
  <div>
    <p class="control has-icons-left style-input">
      <input class="input" :type="type" :placeholder="placeholder" @input="getInputVal" v-model="inputVal" v-bind:class="{focused: inputVal, 'is-danger-input': errors}" @keyup.enter="keyup()">
      <div class="is-danger">{{ errors }}</div>
    </p>
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
    keyup: Function
  },
  methods: {
    getInputVal () {
      this.$emit('inputVal', this.inputVal)
    },
    getAlert () {
      alert('Hello')
    }
  }
}
</script>

<style scoped>
  .is-danger {
    font-size: 13px;
    padding-top: 7px;
    padding-left: 7px;
    color: red;
  }
  .style-input {
    margin-top: 15px;
    -webkit-border-radius: 10px;
    -webkit-box-shadow: 
    0px 3px rgba(128,128,128,1), 
    0px 4px rgba(118,118,118,1),
    0px 5px rgba(108,108,108,1);
    -webkit-transition: -webkit-box-shadow .1s ease-in-out;
    -webkit-transition: -webkit-transform .1s ease-in-out;
  }
  .style-input input {
    -webkit-border-radius: 8px;
    -webkit-box-shadow:
        0px -1px #fff,
        0px 0.5px 5px #FFFFFF;  
    border: 1px solid rgba(128,128,128,.5);
  }
  .style-input input:focus, .focused {
    -webkit-transform: translate(0, 4px);
    border: 2px solid rgba(128,128,128,.5);
  }
  input.is-danger-input {
    border: 2px solid red;
    -webkit-box-shadow: 
    0px 3px rgba(255,80,80,1), 
    0px 4px rgba(245,80,80,1),
    0px 5px rgba(235,80,80,1);
  }
  input.is-danger-input:focus {
    -webkit-transform: translate(0, 5px);
    border: 2px solid red;
    box-shadow: none;
  }
</style>
