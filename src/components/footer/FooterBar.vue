<template>
	<div class="footer-container" v-bind:class="{'top-margin': 'hasTopMargin'}">
		<div class="first-row">
			 <span>Contact me</span>
			 <span>Terms&Privacy</span>
  		 <b-dropdown v-model="$language.current"
                   @change="changeLanguage()">
        <button class="button is-primary" type="button" slot="trigger">
            <template>
                <span>{{ $language.available[$language.current] }}</span>
            </template>
        </button>
        <p>
          <i class="arrow-point"></i>
        </p>
        <b-dropdown-item v-for="(language, locale) in $language.available"
                         :value="locale"
                         :key="language">
            <div class="media">
                <div class="media-content">
                    <h3>{{ language }}</h3>
                </div>
            </div>
        </b-dropdown-item>
      </b-dropdown>
		</div>
		<div class="second-row">
      <span class="copyright">&copy;2018 Home-market. All rights reserved.</span>
    </div>
	</div>
</template>

<script>
  export default {
    props: {
      hasTopMargin: {type: Boolean, default: true}
    },
    mounted() {
      if(!this.$language.current) {
        this.$language.current = 'en_US'
      }
    },
    methods: {
      changeLanguage() {
        localStorage.setItem('language', this.$language.current)
        window.location.reload()
      }
    }
  }
</script>

<style scoped lang="scss">
  .top-margin {
    margin-top: 35px;
  }
	.footer-container {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		height: 90px;
		width: 100%;
    background: #e2e2e2;
    padding-bottom: 10px;
    padding-top: 10px;
    margin-top: 0;
    .first-row {
      & span {
        font-size: 16px;
        padding-left: 5px;
        padding-right: 5px;
        cursor: pointer;
        color: #7957d5;
        &:hover {
          text-decoration: underline;
        }
      }
      i {
        display: inline-block;
        padding: 6px;
        position: absolute;
        background: white;
        left: 30px;
        top: 68px;
        box-shadow: 5px 0 5px -4px gray, 0 5px -5px -4px gray;
      }
      .arrow-point {
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
      }
      /deep/ .dropdown-menu {
        min-width: 20px;
        height: 100%;
        top: -80px;
        right: -52px;
        & .dropdown-content {
          border-radius: 5px;
          padding-bottom: 3px;
          padding-top: 3px;
          box-shadow: 0 2px 7px rgba(10, 10, 10, 0.3), 0 0 0 1px rgba(10, 10, 10, 0.1);
        }
      }
      /deep/ .button {
        &.is-primary:focus:not(:active) {
          box-shadow: none;
        }
        span {
          font-size: 16px;
        }
      }
      /deep/ .button, .button:hover, .button:active, .button:focus, .button.is-primary, .button.is-primary:focus, .button.is-primary:active, .button.is-primary:hover {
        border: none;
        background-color: transparent;
        margin: 0;
        padding: 0;
        box-shadow: 0;
        height: 20px;
        outline: none;
      }
    }
    .second-row span{
      color: #000;
    }
	}
  @media screen and (max-width: 1023px) {
    /deep/ .dropdown:not(.is-hoverable):not(.is-inline) .dropdown-menu {
      top: 40% !important;
    }
  }
  @media screen and (max-width:320px){
    .footer-container {
      margin-top: 10px;
      .first-row {
        & span {
          font-size: 14px;
        }
      }
      .second-row {
        .copyright {
          font-size: 14px;
        }
      }
    }
  }
</style>
