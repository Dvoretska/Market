<template>
    <div>
       <navigation :page="'ads'"></navigation>
       <ads-form></ads-form>
    </div>
</template>

<script>
import adsForm from '@/components/AdsForm'
import navigation from '@/components/Navigation'

export default {
  components: {
    adsForm,
    navigation
  }
}
</script>