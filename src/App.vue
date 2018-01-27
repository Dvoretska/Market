<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    this.$store.dispatch('TOKEN_VERIFY')
    this.$store.dispatch('GET_CATEGORIES')
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  :focus {
  	outline:none;
  }
  ::-moz-focus-inner {
  	border:0;
  }
</style>



