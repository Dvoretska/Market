<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
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



