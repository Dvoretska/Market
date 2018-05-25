<template>
    <div class="home-landing-wrapper">
       <home-landing :page="'home'"></home-landing>
    </div>
</template>

<script>
import homeLanding from '@/components/HomeLanding'

export default {
  components: {
    homeLanding
  }
}
</script>

