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
    methods: {
      changeFiltersTree (checkedNodes) {
        this.$store.commit('activeFiltersCategoryMutate', checkedNodes);
        const filters = this.$store.getters.getActiveFilters;
        this.$store.dispatch('GET_FILTERED_AD_LIST', filters);
        this.$store.dispatch('GET_CATEGORIES', {
          category: checkedNodes[0].data.text.slug,
          parent: checkedNodes[0].data.text.parent_slug,
          isLeafNode: checkedNodes[0].data.text.isLeafNode
        })
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
