<template>
    <div>
       <home-landing :page="'home'"></home-landing>
       <footer-bar :hasTopMargin="false"></footer-bar>
    </div>
</template>

<script>
import homeLanding from '@/components/HomeLanding'
import footerBar from '@/components/footer/FooterBar'

export default {
  components: {
    homeLanding,
    footerBar
  }
}
</script>
