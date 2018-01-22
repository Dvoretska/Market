<template>
    <div class="profile-info-container">
      <div class="profile-image"></div>
      <div>
      <div class="data-profile profile-username">
        <span>{{ firstName }} {{ lastName }}</span>
      </div>
      <div class="data-profile">
        <span>Country:</span>
        <span>{{ country }}</span>
      </div>
      <div class="data-profile">
        <span>City:</span>
        <span>{{ city }}</span>
      </div>
      <button-bar :label="'Change'" class="change-button" :click="profileChange"></button-bar>
      <modal-change>
      </modal-change>
    </div>
    </div>
</template>

<script>
import buttonBar from '@/components/ButtonBar'
import modalChange from '@/components/ModalChange'

export default {
  components: {
    buttonBar,
    modalChange
  },
  methods: {
    profileChange () {
      this.$modal.show('profileChange')
    }
  },
  computed: {
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
    }
  }
}
</script>

<style scoped>
  .profile-username {
    color: #7957d5;
    margin: 20px;
    font: 700 22px Futura, "Trebuchet MS", Arial, sans-serif;
  }
  div.profile-image {
    border-radius: 100%;
    border: 2px solid grey;
    height: 150px;
    width: 150px;
    margin-left: 20px;
    align-self: center;
    background: url('../assets/w128h1281385326502profle.png') 100% 100% no-repeat;
    background-size: cover;
  }
  .profile-info-container {
    height: 200px;
    width: 500px;
    margin: 0px auto;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    border-radius: 10px;
    border: 1px solid rgba(128,128,128,.5);
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #f4f4f4;
    color: #3A474D;
    font: 500 18px 'TradeGothicLTStd-BdCn20','PT Sans Narrow';
    -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.75);
  }
  .data-profile {
    margin: 20px;
    font-family: Futura, "Trebuchet MS", Arial, sans-serif;
  }
  .change-button {
    margin: 0 20px;
  }
</style>