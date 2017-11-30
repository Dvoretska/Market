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
    <modal-change></modal-change>
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
  watch: {
    firstName () {
      this.firstName = localStorage.getItem('lastName')
    }
  },
  methods: {
    profileChange () {
      this.$modal.show('profileChange')
    }
  },
  computed: {
    firstName () {
      if (localStorage.getItem('firstName')) {
        return localStorage.getItem('firstName')
      }
    },
    lastName () {
      if (localStorage.getItem('lastName')) {
        return localStorage.getItem('lastName')
      }
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