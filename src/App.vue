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
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  }
  :focus {
  	outline:none;
  }
  ::-moz-focus-inner {
  	border:0;
  }
  a, a:hover, a:visited, a:active, a:focus {
    text-decoration: none;
    outline:0 none !important;
  }
  select, select:hover, select:active, select:focus {
    outline:0 none !important;
  }
</style>
