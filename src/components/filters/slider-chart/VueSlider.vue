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
  props: {
    startRange: {type: Number, default: 0},
    min: {type: Number, default: 0},
    endRange: {type: Number, default: 2000},
    max: {type: Number, default: 2000},
    callback: Function,
    lazy: {type: Boolean, default: true},
    dotSize: {type: Number, default: 24}
  },
  methods: {
    getFormattedSPrice(price) {
      return  price + ' грн';
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

.vue-slider-component {
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
