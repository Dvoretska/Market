<template>
  <navigation :page="'home'"></navigation>
</template>

<script>

import navigation from '@/components/Navigation'

export default {
  name: 'homeContainer',
  components: {
    navigation
  }
}
</script>
