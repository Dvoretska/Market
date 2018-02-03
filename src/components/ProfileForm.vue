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
            <router-link :to="{ name: ''}" class="options active"> 
              <span>Ads</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: ''}" class="options"> 
              <span>Messages</span>
            </router-link>
          </li>
         <li>
            <router-link :to="{ name: ''}" class="options"> 
              <span>Settings</span>
            </router-link>
          </li>
        </ul>
    </div>
    <div class="content-box">
      <div class="options-content"></div>
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
    },
    username () {
      return this.$store.getters.getUserDetails.username
    }
  }
}
</script>

<style scoped>
  .content-box {
    border: solid 1px #D7D7D7;
    min-height: 400px;
  }
  .options-content {
    height: 50px;
    border-bottom: solid 1px #D7D7D7;
  }
  .active {
    border-top: solid 1px #D7D7D7;
    border-right: solid 1px #D7D7D7;
    border-left: solid 1px #D7D7D7;
    background-color: #f4f4f4;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  .container {
    margin: 0 auto;
    width: 60%;
  }
  .wrapper {
    width: 100%;
    text-align: left;
  }
  ul.option-box {
    position: relative;
    height: 47px;
  }
  ul.option-box > li {
    float: left;
    list-style: none;
  }
  ul.option-box > li .options {
    display: inline-block;
    font-size: 18px;
    padding: 10px 20px;
    vertical-align: middle;
    color: #7957d5;
    font-weight: 600;
  }
  .profile-username {
    color: #7957d5;
    margin: 20px 20px 20px 0;
    font: 700 20px Futura, "Trebuchet MS", Arial, sans-serif;
  }
  div.profile-image {
    border-radius: 100%;
    border: 2px solid grey;
    height: 150px;
    width: 150px;
    margin: 20px;
    align-self: center;
    background: url('../assets/w128h1281385326502profle.png') 100% 100% no-repeat;
    background-size: cover;
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
