<template>
  <vue-slider :value="[startRange, endRange]"
              :min="min"
              :max="max"
              :lazy="true"
              :dotSize="dotSize"
              :formatter="getFormattedSPrice"
              height="none"
              @callback="callback">
  </vue-slider>
</template>

<script>
import VueSlider from 'vue-slider-component';

export default {
  data () {
    return {
      min: 0,
      max: this.$store.getters.getAds.max_price,
      startRange: this.$route.query.min_price || 0,
      endRange: this.$route.query.max_price || this.$store.getters.getAds.max_price
    }
  },
  props: {
    lazy: {type: Boolean, default: true},
    dotSize: {type: Number, default: 24}
  },
  methods: {
    getFormattedSPrice (price) {
      return  price + ' грн';
    },
    callback (args) {
      this.startRange = args[0];
      this.endRange = args[1];
      this.$store.dispatch('GET_FILTERED_AD_LIST', {...this.$route.query, min_price: args[0], max_price: args[1]});
      this.$store.dispatch('GET_FILTERED_CATEGORIES', {...this.$route.query, min_price: args[0], max_price: args[1]});
    }
  },
  components: {VueSlider}
};
</script>

<style lang="scss" scoped>

.slider-chart {
  min-height: 90px;
}

/deep/ canvas {
  max-height: 76px;
  max-width: 257px;
  margin-left: 2px;
}

.vue-slider-component.vue-slider-horizontal {
  margin-top: 50px;
  /deep/ .vue-slider-tooltip {
    background: rgba(121,87,213,.5);
    border: 1px solid darkgray;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    color: white;
    font-size: 13px;
  }
  /deep/ .vue-slider-process {
    background: #8c40b8;
    height: 6px;
    margin-top: -2px;
  }
  /deep/ .vue-slider-dot {
    background: white;
    border: 2px solid #8c40b8;
    top: -12px;
  }
  /deep/ .vue-slider {
    height: 2px;
    background-color: black;
  }
}
</style>
