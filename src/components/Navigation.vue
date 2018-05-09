<template>
  <nav class="nav-bar">

    <div class="nav-logo-container" @click="clearAllFilters">
      <router-link :to="{ name: 'home'}">
        <img src="../assets/Home.png" class="nav-logo-img">
      </router-link>
    </div>

    <router-link :to="{ name: 'login'}" class="auth-button" v-if="!isLogin" v-bind:class="{ 'active-link': page == 'login'}">
      <translate>Login</translate>
    </router-link>

    <router-link :to="{ name: 'register'}" class="auth-button right-button" v-if="!isLogin" v-bind:class="{ 'active-link': page == 'register' }">
      <translate>Sign up</translate>
    </router-link>

    <div class="nav-user-info">
      <router-link :to="{ name: 'profile'}" v-if="isLogin && (username || name)" class="user-info-wrapper">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24" class="user-icon">
          <path fill="#000000" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
        </svg>
        <span class="username" v-if="name">{{ name }}</span>
        <span class="username" v-else>{{ username }}</span>
        <i class="material-icons">&#xE5C5;</i>
      </router-link>
      <ul class="submenu">
        <li>
          <router-link to="/profile"><translate>Ads</translate></router-link>
        </li>
        <li>
          <router-link to="/profile/message"><translate>Messages</translate></router-link>
        </li>
        <li>
          <router-link to="/profile/settings"><translate>Settings</translate></router-link>
        </li>
        <li class="logout-wrapper">
          <a @click="logout()">
            <img src="@/assets/logout.svg" alt="" class="icon-logout">
            <translate>Logout</translate>
          </a>
        </li>
      </ul>
    </div>

    <router-link :to="{ name: 'create-ad'}" class="button-anim" v-if="isLogin" v-bind:class="{ 'active-link': page == 'ads' }">
      <translate>+ Create an ad</translate>
    </router-link>

  </nav>
</template>

<script>
export default {
  props: {
    page: String
  },
  methods: {
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
      return localStorage.getItem('token')
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
    /*display: flex;*/
    /*height: 55px;*/
    /*align-items: center;*/
    /*position: fixed;*/
    /*z-index: 10;*/
    /*top: 0;*/
    /*width: 100%;*/
    /*padding: 0 10px;*/
    /*background-color: #f4f4f4;*/
		position: fixed;
		top: 0;
		left: 0;
		height: 55px;
		width: 100%;
		z-index: 50;
		background-color: rgba(123, 79, 173, .4);
    // opacity: .6;
		border-bottom: 1px solid rgba(255, 255, 255, 1);
		padding: 0 50px;
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
    display: flex;
    align-items: center;
    .nav-logo-container {
      margin-right: auto;
      .nav-logo-img {
        height: 50px;
        background-color: transparent;
      }
    }
  .auth-button {
    cursor: pointer;
		font-size: 16px;
		display: inline-block;
		padding: 0 10px;
		color: #FFFFFF;
		transition: color 0.4s ease 0s;
    padding: 5px 10px;
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
    .right-button {
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
      }
      .username {
        display: inline-block;
        height: 55px;
        font: 700 17px Futura, "Trebuchet MS", Arial, sans-serif;
        margin-right: 10px;
        vertical-align: middle;
        color: #7957d5;
        padding: 19px 15px 0 0;
      }
      .material-icons {
        position: absolute;
        right: 0px;
        top: 16px;
      }
      .submenu {
        background: #fff;
        position: absolute;
        left: 0;
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
          padding: 7px 15px;
          width: 100%;
          &:hover {
            background-color: #f4f4f4;
          }
        }
        .logout-wrapper {
          position: relative;
          .icon-logout {
            position: absolute;
            width: 20px;
            height: 20px;
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
  }
  @media screen and (max-width:320px){
    .nav-bar {
      .button-anim {
        span {
          font: 700 10px Futura, "Trebuchet MS", Arial, sans-serif;
        }
      }
      .nav-user-info {
        position: relative;
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
</style>
