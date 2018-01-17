<template>
  <div class="profile-info-container">
    <button-bar :label="'Change'" class="change-button" :click="profileChange"></button-bar>
    <div class="data-profile">
      <span>First name:</span>
      <span>{{ firstName }}</span>
    </div>
    <div class="data-profile">
      <span>Last name:</span>
      <span>{{ lastName }}</span>
    </div>
    <div class="data-profile">
      <span>Country:</span>
      <span>{{ country }}</span>
    </div>
    <div class="data-profile">
      <span>City:</span>
      <span>{{ city }}</span>
    </div>
    <modal-change>
    </modal-change>
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
  .profile-info-container {
    height: 200px;
    width: 500px;
    padding: 0;
    margin: 0px auto;
    border-radius: 10px;
    border: 1px solid rgba(128,128,128,.5);
    margin-top: 10px;
    background-color: #f4f4f4;
    color: #3A474D;
    font-family: 'TradeGothicLTStd-BdCn20','PT Sans Narrow';
    font-weight: 500;
    font-size: 16px;
    -webkit-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 8px 0px rgba(0,0,0,0.75);
  }
  .data-profile {
    margin: 15px 40px;
  }
  .change-button {
    float: right;
    margin: 15px;
  }
</style>