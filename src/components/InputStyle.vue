<template>
  <div class="field">
    <p class="control has-icons-left style-input">
      <input class="input" :type="type" :placeholder="placeholder" @input="getInputVal" v-model="inputVal" v-bind:class="{focused: inputVal}">
    </p>
  </div>
</template>

<script>

import inputStyle from '@/components/InputStyle'

export default {
  components: {
    inputStyle
  },
  data () {
    return {inputVal: ''}
  },
  props: {
    placeholder: String,
    type: String
  },
  methods: {
    getInputVal () {
      this.$emit('inputVal', this.inputVal)
    }
  }
}
</script>

<style scoped>
  .style-input {
    margin-bottom: 20px;
    -webkit-border-radius: 10px;
    -webkit-box-shadow: 
    0px 3px rgba(128,128,128,1), 
    0px 4px rgba(118,118,118,1),
    0px 5px rgba(108,108,108,1);
/*    0px 6px rgba(98,98,98,1),
    0px 7px rgba(88,88,88,1);*/
 /*   0px 8px 8px -1px rgba(128,128,128,1);*/ /* shadow */
    -webkit-transition: -webkit-box-shadow .1s ease-in-out;
    -webkit-transition: -webkit-transform .1s ease-in-out;
  }
  .style-input input {
    -webkit-border-radius: 8px;
    -webkit-box-shadow:
    0px -1px #fff, /* top highlight */
    0px 0px 5px #FFFFFF; /* bottom edge */
  }
  .style-input input:focus, .focused {
    -webkit-transform: translate(0, 4px);
    border: 2px solid rgba(128,128,128,.5);
  }
</style>
