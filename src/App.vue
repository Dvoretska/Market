<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    this.$store.dispatch('UPDATE_USER_DETAILS')
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



