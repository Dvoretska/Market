<template>
  <nav class="nav-bar">
    <router-link class="logo-wrapper" :to="{ name: 'home'}">
      <div class="nav-logo-link">
        <img src="../assets/imageedit_13_2259265709.png" class="nav-logo-img">
      </div>
      <p class="first-parag">KEA</p>
      <p class="second-parag">MARKET</p>
    </router-link>

    <div @click="clearAllFilters" class="item-all-ads">All ads</div>

    <div class="container-search">
      <img src="../assets/magnifier.svg" alt="" class="search-icon" v-on:click="searchItem(searchValue)">
      <input class="search-input" placeholder="Search..." v-on:keyup.enter="searchItem(searchValue)" v-model="searchValue"/>
    </div>

    <div class="container-search-mobile">
      <img src="../assets/magnifier.svg" alt="" class="search-icon-mobile" @click="showSearchMobile()">
      <modal name="search-mobile" :width="'100%'" class="search-mobile" :height="50">
        <div class="search-mobile-wrapper">
          <img src="../assets/magnifier.svg" alt="" class="search-icon" v-on:click="searchItem(searchValue); hideSearchMobile();">
          <input class="search-input search-input-mobile" placeholder="Search..." v-on:keyup.enter="searchItem(searchValue); hideSearchMobile();" v-model="searchValue"/>
        </div>
      </modal>
    </div>

    <router-link :to="{ name: 'login'}" class="auth-button login-button" v-if="!isLogin" v-bind:class="{ 'active-link': page == 'login'}">
      <translate>Login</translate>
    </router-link>

    <router-link :to="{ name: 'register'}" class="auth-button register-button" v-if="!isLogin" v-bind:class="{ 'active-link': page == 'register' || page == 'ads' || page == 'ad-details'}">
      <translate>Sign up</translate>
    </router-link>

    <div class="nav-user-info" v-if="isLogin">
      <router-link :to="{ name: 'profile'}" v-if="isLogin && (username || name)" class="user-info-wrapper">
        <svg  viewBox="0 0 24 24" class="user-icon">
          <path fill="#000000" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
        <span class="username" v-if="name">{{ name }}</span>
        <span class="username" v-else>{{ username }}</span>
        <i class="material-icons" v-if="!isMobile">&#xE5C5;</i>
      </router-link>
      <ul class="submenu">
        <li class="menu-item-wrapper">
          <router-link to="/profile">
            <img src="@/assets/quill3.svg" alt="" class="menu-icon">
            <translate>Ads</translate>
          </router-link>
        </li>
        <li class="menu-item-wrapper">
          <router-link to="/profile/message">
            <img src="@/assets/quill3.svg" alt="" class="menu-icon">
            <translate>Messages</translate>
          </router-link>
        </li>
        <li class="menu-item-wrapper">
          <router-link to="/profile/selected-ads">
            <img src="@/assets/quill3.svg" alt="" class="menu-icon">
            <translate>Selected</translate>
          </router-link>
        </li>
        <li class="menu-item-wrapper">
          <router-link to="/profile/settings">
            <img src="@/assets/quill3.svg" alt="" class="menu-icon">
            <translate>Settings</translate>
          </router-link>
        </li>
        <li class="menu-item-wrapper">
          <a @click="logout()">
            <img src="@/assets/quildfl.svg" alt="" class="menu-icon">
            <translate>Logout</translate>
          </a>
        </li>
      </ul>
    </div>

    <router-link :to="{ name: 'create-ad'}" v-if="isLogin && isMobile">
      <img src="@/assets/plus.svg" alt="" class="plus-icon">
    </router-link>

    <router-link :to="{ name: 'create-ad'}" class="button-create-ad" v-if="isLogin && !isMobile" v-bind:class="{ 'active-link': page == 'create-ad' }">
      <translate>+ Create an ad</translate>
    </router-link>

  </nav>
</template>

<script>
export default {
  data () {
    return {
      searchValue: '',
      isMobile: false
    }
  },
  props: {
    page: String
  },
  created () {
    this.searchValue = this.$route.query.search || ''
  },
  mounted () {
    window.addEventListener('resize', this.handleWindowResize);
    if(window.innerWidth < 480) {
      this.isMobile = true
    }
  },
  methods: {
    searchItem (searchValue) {
      if(searchValue) {
        this.$store.dispatch('GET_FILTERED_AD_LIST', {...this.$route.query, search: searchValue})
      }
    },
    handleWindowResize (event) {
      if(event.currentTarget.innerWidth < 480) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
      if(event.currentTarget.innerWidth > 701) {
        this.$modal.hide('search-mobile')
      }
    },
    showSearchMobile () {
      this.$modal.toggle('search-mobile')
    },
    hideSearchMobile () {
      this.$modal.hide('search-mobile')
    },
    clearAllFilters () {
      this.$store.dispatch('GET_FILTERED_AD_LIST')
      this.$store.dispatch('GET_CATEGORIES')
    },
    logout () {
      this.$store.dispatch('LOGOUT')
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters.isAuthenticated
    },
    username () {
      return this.$store.getters.getUserDetails.username
    },
    name () {
      return this.$store.getters.getUserDetails.first_name
    }
  }
}
</script>
<style scoped lang="scss">
  .nav-bar {
		position: fixed;
		top: 0;
		left: 0;
		height: 55px;
		width: 100%;
		z-index: 50;
		background-color: rgba(123, 79, 173, .4);
		border-bottom: 1px solid rgba(255, 255, 255, 1);
		padding: 0 50px;
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
    display: flex;
    align-items: center;
    .logo-wrapper {
      position: relative;
      height: 55px;
      width: 72px;
      cursor: pointer;
      .nav-logo-link {
        position: absolute;
        top: 8px;
        left: 0;
        z-index: 30;
        height: 35px;
        width: 35px;
        display: inline-block;
        .nav-logo-img {
          height: auto;
          width: 100%;
          background-color: transparent;
        }
      }
      .first-parag, .second-parag {
        position: absolute;
        font-size: 11px;
        color: #743599;
        font-weight: bold;
      }
      .first-parag {
        top: 20px;
        left: 35px;
      }
      .second-parag {
        top: 30px;
        left: 24px;
      }
    }
    .item-all-ads {
      cursor: pointer;
      color: black;
      font-size: 18px;
      margin-left: 25px;
      margin-right: 25px;
      transition: color 0.4s ease 0s;
      @media screen and (max-width: 768px){
        display: none;
      }
      &:hover {
        color: white;
      }
    }
    .container-search {
      height: 30px;
      display: flex;
      position: relative;
      margin-right: auto;
      @media screen and (min-width:320px) and (max-width: 700px){
        display: none;
      }
      @media screen and (max-width: 768px){
        margin-left: 20px;
      }
    }
    .search-input {
        width: 300px;
        height: 100%;
        background: rgba(123, 79, 173, 0.4);
        border: none;
        font-size: 14px;
        padding-left: 40px;
        border-radius: 5px;
        color: #fff;
        &::placeholder {
          color: white;
          font-size: 14px;
          opacity: .6;
        }
        @media screen and (max-width:991px){
          width: 80%;
        }
      }
      .search-icon {
        cursor: pointer;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 17px;
        height: 20px;
      }
    .container-search-mobile {
      height: 100%;
      display: flex;
      align-items: center;
      margin-right: auto;
      /deep/ .v--modal-overlay {
        top: 56px;
      }
      /deep/ .v--modal-box.v--modal {
        top: 0 !important;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .search-icon-mobile {
        cursor: pointer;
        width: 25px;
        height: 25px;
        margin-left: 15px;
        @media screen and (min-width:701px){
          display: none;
        }
      }
      .search-mobile-wrapper {
        width: 90%;
        height: 35px;
        position: relative;
        .search-input-mobile {
          width: 100%;
          height: 100%;
        }
      }
    }
    .auth-button {
      cursor: pointer;
      font-size: 16px;
      display: inline-block;
      color: #FFFFFF;
      transition: color 0.4s ease 0s;
      padding: 3px 10px;
      border: 1px solid transparent;
      &:hover {
        border: 1px solid white;
        border-radius: 10px;
      }
    }
    .auth-button.active-link {
      border: 1px solid white;
      border-radius: 10px;
    }
    .register-button {
      margin-left: 10px;
    }
    .nav-user-info {
      position: relative;
      &:hover .submenu {
        opacity: 1;
        transform: scaleY(1);
      }
      .user-icon {
        vertical-align: middle;
        width: 24px;
        height: 24px;
      }
      .username {
        display: inline-block;
        height: 55px;
        font: 700 17px Futura, "Trebuchet MS", Arial, sans-serif;
        margin-right: 10px;
        vertical-align: middle;
        color: #404851;
        padding: 19px 15px 0 0;
      }
      .material-icons {
        position: absolute;
        right: 0px;
        top: 16px;
        color: #404851;
      }
      .submenu {
        background: #fff;
        position: absolute;
        left: -10px;
        top: 55px;
        width: 150px;
        transition: .5s ease-in-out;
        opacity: 0;
        transform: scaleY(0);
        transform-origin: 0 0;
        a {
          display: inline-block;
          color: black;
          text-align: left;
          font-size: 15px;
          padding: 5px 15px;
          width: 100%;
          &:hover {
            background-color: #f4f4f4;
          }
        }
        .menu-item-wrapper {
          position: relative;
          border-bottom: 2px solid transparent;
          &:before {
            content: "";
            position: absolute;
            width: 100px;
            height: 2px;
            color: #eeeeee;
            display: block;
          }
          .menu-icon {
            position: absolute;
            width: 17px;
            height: 17px;
            top: 50%;
            transform: translateY(-50%);
            left: 13px;
          }
          span {
            padding-left: 23px;
            display: inline-block;
          }
        }
      }
    }
    .plus-icon {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
    .button-create-ad {
      margin-left: 15px;
      text-transform: uppercase;
      font-size: 14px;
      border-radius: 5px;
      padding: 5px 10px;
      transition: background-color 0.4s ease 0s;
      border: 2px solid white;
      background-color: rgba(123, 79, 173, 0.4);
      color: white;
      &:hover {
        border: 2px solid transparent;
        color: #8c40b8;
        background-color: white;
      }
      @media screen and (max-width: 768px){
        font-size: 12px;
      }
      @media screen and (min-width:320px) and (max-width: 480px){
        font-size: 10px;
      }
    }
  }

 @media screen and (max-width: 991px){
  .nav-bar {
      .nav-user-info {
        position: relative;
        margin-left: auto;
        .user-info-wrapper {
          display: flex;
          align-items: center;
          height: 55px;
          .username {
            display: none;
          }
          .material-icons {
            display: block;
            position: inherit;
          }
        }
      }
   }
 }

 @media screen and (min-width:320px) and (max-width: 480px){
    .nav-bar {
      justify-content: space-between;
      padding: 0 25px;
      .item-all-ads {
        display: none;
      }
      .container-search-mobile {
        margin: 0;
        .search-icon-mobile {
          margin: 0;
        }
      }
    .nav-user-info {
      margin: 0;
      .user-icon {
        width: 35px;
        height: 35px;
      }
    }
    .register-button {
      margin-left: 0;
    }
    .auth-button {
      &.login-button {
        margin-left: 0;
      }
      span {
        font: 700 14px Futura, "Trebuchet MS", Arial, sans-serif;
      }
    }
  }
}
</style>
