<template>
  <div class="container">
    <div class="wrapper">
      <div class="profile-info-container">
        <my-upload field="avatar"
            @crop-success="cropSuccess"
            v-model="show"
            :width="100"
            :height="100"
            noSquare=true
            langType='en'></my-upload>
        <div class="avatar-wrapper">
          <a class="change-avatar" @click="toggleShow">change</a>
          <i class="fa fa-spinner fa-spin fa-lg fa-fw" v-if="avatarLoading"></i>
          <div class="default-avatar" v-if="!avatar"></div>
          <img class="avatar" :src="avatar" v-if="!avatarLoading && avatar">
        </div>
        <div class="user-info">
          <div class="profile-username">
            <span v-if="firstName || lastName">{{ firstName }} {{ lastName }}</span>
            <span v-else>{{ username }}</span>
          </div>
          <div v-if="country || city">
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
    <vue-toast ref='toast'></vue-toast>
  </div>
</template>

<script>
import profileAdsForm from '@/components/ProfileAdsForm'
import profileMessageForm from '@/components/ProfileMessageForm'
import profileSelectedAds from '@/components/ProfileSelectedAds'
import profileSettingsForm from '@/components/ProfileSettingsForm'
import myUpload from 'vue-image-crop-upload';
import 'vue-toast/dist/vue-toast.min.css'
import VueToast from 'vue-toast'

export default {
  components: {
    profileAdsForm,
    profileMessageForm,
    profileSelectedAds,
    profileSettingsForm,
    'my-upload': myUpload,
    VueToast
  },
  props: {
    page: String
  },
  data () {
    return {
      show: false,
      langType: 'en',
      headers: {
        smail: '*_~'
      },
      imgDataUrl: ''
    }
  },
  methods: {
    profileChange () {
      this.$modal.show('profileChange')
    },
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl){
      this.imgDataUrl = imgDataUrl;
      this.$store.dispatch('CHANGE_USER_AVATAR', {
        avatar: this.imgDataUrl,
        callback: this.$refs.toast.showToast
      })
    }
  },
  computed: {
    currentPath () {
      return '/profile/'
    },
    avatarLoading () {
      return this.$store.getters.getAvatarLoading
    },
    avatar () {
      return this.$store.getters.getUserDetails.avatar
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
  .default-avatar {
    background-image: url('../assets/default-profile-picture.png');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
    width: 100px;
    height: 100px;
}
  .avatar {
    border-radius: 50%;
  }
  i {
    top: 25px;
    left: 50px;
    position: absolute;
  }
  .avatar-wrapper {
    position: relative;
    width: 100px;
    height: 100px;
    &:before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .4);
      border-radius: 50%;
      top: 0;
      left: 0;
      z-index: 1;
      display: none;
    }
  }
  .avatar-wrapper:hover:before {
    display: block;
  }
  .avatar-wrapper:hover .change-avatar {
    display: inline-block;
  }
  .change-avatar {
    display: none;
    position: absolute;
    left: 50px;
    top: 50px;
    transform: translate(-50%, -50%);
    color: white;
    z-index: 2;
  }
  /deep/ .checked-mark {
    display: flex;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    color: limegreen;
    border: 1px solid green;
    margin-left: 10px;
  }
  /deep/ .vue-toast_message > span{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 100px;
    background: rgba(0, 0, 0, .7);
    transform: translate(-50%, -50%);
  }
  /deep/ .vue-toast-manager_container.__left {
    left: 50%;
  }
  /deep/ .vue-toast-manager_container.__bottom {
    bottom: 50%;
  }
  .profile-info-container {
    display: flex;
    align-items: flex-start;
    margin-bottom: 40px;
    position: relative;
  }
  .content-box {
    border: solid 1px #D7D7D7;
    margin-bottom: 10px;
  }
  .container {
    margin: 85px auto 0;
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
    padding-bottom: 10px;
    font: 700 20px Futura, "Trebuchet MS", Arial, sans-serif;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }
</style>
