<template>
    <tree
        :data="data"
        @node:checked="onChecked"
        @node:unchecked="onUnchecked"
        ref="tree"
        :options="{checkbox: true, checkOnSelect: true}"
    />
</template>

<script>
export default {
  props: {
    data: Array
  },
  methods: {
    onChecked (node) {
      console.log('node.data.text', node.data.text)
      this.$store.dispatch('GET_FILTERED_ADS', {slug: node.data.text})
    },
    onUnchecked (node) {
      this.$store.dispatch('GET_PRODUCT_LIST')
    }
  }
}
</script>
