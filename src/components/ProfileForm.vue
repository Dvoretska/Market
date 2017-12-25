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
    <section>
      <div class="autocomplete-profile">
        <b-field label="Country:">
          <b-autocomplete 
              v-model="name"
              :data="filteredDataArray"
              placeholder="Start type country name..."
              icon="search">
              <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>
      </div>
    </section>
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
      last_name: null,
      name: '',
      selected: null,
      countryData: []
    }
  },
  created () {
    this.$store.dispatch('GET_COUNTRIES', (data) => { this.countryData = data })
  },
  methods: {
    profileChange () {
      this.first_name = this.firstName
      this.last_name = this.lastName
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
    },
    filteredDataArray () {
      return this.countryData.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.name.toLowerCase()) >= 0
      })
    }
  }
}
</script>

<style scoped>
  .autocomplete-profile /deep/ .label {
    font-weight: normal;
    margin-bottom: 0;
  }
  .autocomplete-profile {
    margin: 15px 40px;
  }
  .autocomplete-profile /deep/ .input {
    height: 28px;
    width: 300px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .autocomplete-profile /deep/ .field {
    display: flex;
    align-items: right;
  }
  .autocomplete-profile /deep/ .icon {
    height: 28px;
  }
  .autocomplete-profile /deep/ .control {
    padding-left: 3px;
  }
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
  .data-profile {
    margin: 15px 40px;
  }
  .change-button {
    float: right;
    margin: 15px;
  }
</style>