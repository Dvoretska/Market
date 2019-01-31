<template>
  <div class="animated-background">
    <div class="background-masker image-masker"></div>
    <div class="background-masker price-masker"></div>
    <div class="background-masker subject-masker"></div>
  </div>
</template>

<script>

export default {
}
</script>

<style scoped lang="scss">
  .animated-background {
    border: 1px solid #D7D7D7;
    padding: 7px;
    border-radius: 3px;
    background: #fff;
    margin: 5px;
    height: 249px;
    position: relative;
    @keyframes placeHolderShimmer{
      0%{
          background-position: -468px 0
      }
      100%{
          background-position: 468px 0
      }
    }
    .background-masker {
      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
      animation-name: placeHolderShimmer;
      animation-timing-function: linear;
      background: #f6f7f8;
      background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
      background-size: 800px 104px;
      position: relative;
    }
    .image-masker {
      height: 160px;
    }
    .price-masker {
      margin-top: 10px;
      height: 16px;
    }
    .subject-masker {
      margin-top: 7px;
      height: 30px;
    }
  }
</style>