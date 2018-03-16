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
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Lato', Arial, sans-serif;
  }
  :focus {
  	outline:none;
  }
  ::-moz-focus-inner {
  	border:0;
  }
</style>
