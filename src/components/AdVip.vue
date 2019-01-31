<template>
  <div class="item-container" @click="openAdDetails(adVip.slug)">
    <div class="item-img-wrapper">
      <img :src="adVip.image || getDefaultImage" alt="" class="item-img">
    </div>
    <div class="item-price">{{adVip.price}} грн.</div>
    <div class="item-subject">{{adVip.subject}}</div>
  </div>
</template>

<script>

export default {
  props: {
    adVip: {}
  },
  methods: {
    openAdDetails (slug) {
    	this.$router.push({ name: 'adDetails', params: { slug}})
    }
  },
  computed: {
    getDefaultImage () {
      return require('@/assets/default.png')
    }
  }
}
</script>

<style scoped lang="scss">
  .item-container {
    border: 1px solid #D7D7D7;
    padding: 7px;
    border-radius: 3px;
    cursor: pointer;
    margin: 5px;
    &:hover {
      border: solid 1px #CCC;
      box-shadow: 1px 1px 3px #999;
    }
    .item-img-wrapper {
      margin: 0;
      height: 160px;
      width: auto;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f7f7f7;
      .item-img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }
    .item-price {
      margin-top: 10px;
      padding-bottom: 7px;
      font-size: 16px;
      font-weight: 600;
      line-height: 16px;
    }
    .item-subject {
      max-height: 40px;
      font-size: 14px;
      overflow: hidden;
      line-height: 20px;
      word-wrap: break-word;
      color: #8c40b8;
      display: block;
    }
  }
</style>