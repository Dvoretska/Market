<template>
  <tree-root
    :data="data"
    @node:checked="onChecked"
    @node:unchecked="onUnchecked"
    ref="tree"
    :options="{checkbox: true, checkOnSelect: true}"
  />
</template>

<script>
  import TreeRoot from '@/components/filters/extended/TreeRoot'

  export default {
    props: {
      data: Array
    },
    // mounted () {
    //   for(var child of this.$refs.tree.tree.activeElement.children) {
    //     if(child.data.text.slug == $route.query.category) {
    //       child.states.checked = true
    //     }
    //   }
    // },
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
    },
    components: {
      TreeRoot
    }
  }
</script>
