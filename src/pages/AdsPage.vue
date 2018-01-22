<template>
  <div>
   <navigation :page="'ads'"></navigation>
   <ads-container></ads-container>
  </div>
</template>

<script>
import adsContainer from '@/containers/AdsContainer'
import navigation from '@/components/Navigation'

export default {
  components: {
    adsContainer,
    navigation
  }
}
</script>