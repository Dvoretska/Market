<template>
    <tree
        :data="data"
        @node:selected="onSelected"
        @node:checked="onChecked"
        ref="tree"
    />
</template>

<script>
export default {
  props: {
    data: Array
  },
  methods: {
    onSelected (node) {
      console.log(node)
    },
    onChecked (node) {
      console.log(node)
    }
  }
}
</script>
