<template>
  <div class="container">
    <div class="wrapper">
      <div class="profile-info-container">
        <div class="profile-image"></div>
        <div class="user-info">
          <div class="profile-username">
            <span v-if="firstName || lastName">{{ firstName }} {{ lastName }}</span>
            <span v-else>{{ username }}</span>
          </div>
          <div v-if="country || city">
            <span>From:</span>
            <span>{{ country }}<span v-if="country && city">, </span>{{ city }}</span>
          </div>
        </div>
      </div>
        <ul class="option-box">
          <li>
            <router-link to="/profile" active-class="active" class="options" exact>
              <span><translate>Ads</translate></span>
            </router-link>
          </li>
          <li>
            <router-link to="/profile/message" active-class="active" class="options" exact>
              <span><translate>Messages</translate></span>
            </router-link>
          </li>          
          <li>
            <router-link to="/profile/selected-ads" active-class="active" class="options" exact>
              <span><translate>Selected</translate></span>
            </router-link>
          </li>
         <li>
            <router-link to="/profile/settings" active-class="active" class="options" exact>
              <span><translate>Settings</translate></span>
            </router-link>
          </li>
        </ul>
    </div>
    <div class="content-box">
      <profile-ads-form  v-if="$route.path == '/profile'"></profile-ads-form>
      <router-view v-if="this.$store.getters.getUserDetails.email"></router-view>
    </div>
  </div>
</template>

<script>
import profileAdsForm from '@/components/ProfileAdsForm'
import profileMessageForm from '@/components/ProfileMessageForm'
import profileSelectedAds from '@/components/ProfileSelectedAds'
import profileSettingsForm from '@/components/ProfileSettingsForm'

export default {
  components: {
    profileAdsForm,
    profileMessageForm,
    profileSelectedAds,
    profileSettingsForm
  },
  props: {
    page: String
  },
  methods: {
    profileChange () {
      this.$modal.show('profileChange')
    }
  },
  computed: {
    currentPath () {
      return '/profile/'
    },
    firstName () {
      return this.$store.getters.getUserDetails.first_name
    },
    lastName () {
      return this.$store.getters.getUserDetails.last_name
    },
    country () {
      return this.$store.getters.getUserDetails.country
    },
    city () {
      return this.$store.getters.getUserDetails.city
    },
    username () {
      return this.$store.getters.getUserDetails.username
    }
  }
}
</script>

<style scoped lang="scss">
  .content-box {
    border: solid 1px #D7D7D7;
    margin-bottom: 10px;
  }
  .container {
    margin: 55px auto 0;
    width: 745px;
    min-height: calc(100vh - 55px - 125px);
    @media screen and (max-width:768px){
      width: 100%;
    }
  }
  .wrapper {
    width: 100%;
    text-align: left;
  }
  ul.option-box {
    display: flex;
    height: 43px;
    list-style: none;
  }
  ul.option-box > li .options {
    border-bottom: none;
    display: inline-block;
    font-size: 16px;
    padding: 10px 20px;
    color: #7957d5;
  }
    ul.option-box > li .active {
    border-top: 1px solid #D7D7D7;
    border-left: 1px solid #D7D7D7;
    border-right: 1px solid #D7D7D7;
    border-bottom: none;
    background-color:  #f0f0f0;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    margin-top: -1px;
  }
  .active span {
    color: #363636;
    margin-left: -1px;
    margin-right: -1px;
  }
  .profile-username {
    color: #7957d5;
    margin: 20px 20px 20px 0;
    font: 700 20px Futura, "Trebuchet MS", Arial, sans-serif;
    @media screen and (min-width:320px) and (max-width: 480px){
      margin: 20px 20px 10px 0;
    }
  }
  div.profile-image {
    background: url('../assets/w128h1281385326502profle.png') center center no-repeat;
    background-size: cover;
    border-radius: 50%;
    height: auto;
    width: 150px;
    margin: 20px;
    padding-bottom: 150px;
    align-self: center;
  }
  .profile-info-container {
    display: flex;
    align-items: baseline;
  }
  .user-info {
    display: flex;
    flex-direction: column;
  }
</style>
