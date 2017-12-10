<template>
  <div class="profile-info-container">
    <button-bar :label="'Change'" class="change-button" :click="profileChange"></button-bar>
    <div class="line">
      <span>First name:</span>
      <span>{{ firstName }}</span>
    </div>
    <div class="line">
      <span>Last name:</span>
      <span>{{ lastName }}</span>
    </div>
    <modal-change
     :firstName="first_name"
     :lastName="last_name"
     :inputFirstNameHadler="inputFirstNameHadler"
     :inputLastNameHadler="inputLastNameHadler"
     :changeProfileHandler="changeProfileHandler">
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
  data () {
    return {
      first_name: null,
      last_name: null
    }
  },
  methods: {
    profileChange () {
      this.first_name = this.firstName
      this.last_name = this.lastName
      console.log(this.first_name, this.last_name)
      this.$modal.show('profileChange')
    },
    inputFirstNameHadler (e) {
      this.first_name = e.target.value
    },
    inputLastNameHadler (e) {
      this.last_name = e.target.value
    },
    changeProfileHandler () {
      this.$store.dispatch('CHANGE_USER_DETAILS', {firstName: this.first_name, lastName: this.last_name})
    }
  },
  computed: {
    firstName () {
      return this.$store.getters.getUserDetails.first_name
    },
    lastName () {
      return this.$store.getters.getUserDetails.last_name
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
  }
  .line {
    margin: 15px 40px;
  }
  .change-button {
    float: right;
    margin: 15px;
  }
</style>