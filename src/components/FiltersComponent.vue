<template>
    <tree
        :data="items"
        @node:selected="onSelected"
        @node:checked="onChecked"
        ref="tree"
    />
</template>

<script>
export default {
  data () {
    return {
      items: [
        {text: 'Item 1',
          children: [
            {text: 'Item 3.1'},
            {text: 'Item 3.2'}
          ]},
        {text: 'Item 2',
          children: [
            {text: 'Item 3.1'},
            {text: 'Item 3.2'}
          ]},
        {text: 'Item 3',
          children: [
            {text: 'Item 3.1'},
            {text: 'Item 3.2'}
          ]}
      ]
    }
  },
  methods: {
    onSelected (node) {
    },
    onChecked (node) {
    }
  }
}
</script>