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
    changeFiltersTree (checkedNodes) {
      this.$store.commit('activeFiltersTreeMutate', checkedNodes)
      const filters = this.$store.getters.getActiveFilters
      this.$store.dispatch('GET_FILTERED_AD_LIST', filters)
    },
    onChecked (node) {
      this.changeFiltersTree(node.tree.checkedNodes)
    },
    onUnchecked (node) {
      this.changeFiltersTree(node.tree.checkedNodes)
    }
  }
}
</script>
