<template>
	<div class="container">
    <div>
      <span class="content-number">4</span>
      <img src="../assets/not_found.png" alt="" class="content-img">
      <span class="content-number">4</span>
    </div>
    <div class="content-second-row">Page not found</div>
	</div>
</template>


<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    .content-number {
      font-size: 150px;
      font-family: 'Muli', sans-serif;
      color: black;
      line-height: 150px;
    }
    .content-img {
      width: 120px;
      height: 120px;
    }
    .content-second-row {
      font-size: 43px;
      font-family: 'Muli', sans-serif;
      color: black;
    }
  }
</style>
