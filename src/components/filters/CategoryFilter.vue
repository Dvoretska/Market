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
    mounted () {

    },
    methods: {
      changeFiltersTree (node) {
        let nodes = node.tree.checkedNodes
        let checkedNodes = []
        if (node.parent) {
          for (let item of node.parent.children) {
            if (item.states.checked) {
              checkedNodes.push(item)
            }
          }
        }
        this.$store.commit('activeFiltersCategoryMutate', checkedNodes)
        const filters = this.$store.getters.getActiveFilters
        this.$store.dispatch('GET_FILTERED_AD_LIST', filters)
        if(nodes.length) {
          this.$store.dispatch('GET_CATEGORIES', {
            category: nodes[0].data.text.slug,
            parent: nodes[0].data.text.parent_slug,
            isLeafNode: nodes[0].data.text.isLeafNode
          })
        }
      },
      onChecked (node) {
        this.changeFiltersTree(node)
      },
      onUnchecked (node) {
        this.changeFiltersTree(node)
      }
    },
    components: {
      TreeRoot
    }
  }
</script>
