<template>
	<div class="home-landing">
		<header class="home-header">
      <span v-if="$mq === 'mobile' || $mq === 'tablet'">
        <img src="../assets/burger-open-icon.svg" alt="" class="menu-burger" @click="toggleMenu" v-if="!showMenu">
        <img src="../assets/burger-close-icon.svg" alt="" @click="toggleMenu" class="menu-burger" v-else>
      </span>
			<ul class="home-menu" :class="{'home-menu--open': showMenu, 'home-menu--close': !showMenu}">
				<li class="menu-item">
          <a href="#" class="menu-item-link" v-scroll-to="'.main-img, 0'"><translate>HOME</translate></a>
        </li>
				<li class="menu-item">
          <a href="#" class="menu-item-link" v-scroll-to="'.rubrics-section, 0'"><translate>SHOP</translate></a>
        </li>
				<li class="menu-item">
          <a href="#" class="menu-item-link" v-scroll-to="'.team-section, 40px'"><translate>TEAM</translate></a>
        </li>
				<li class="menu-item">
          <a href="#" class="menu-item-link"><translate>CONTACT</translate></a>
        </li>
       </ul>
       <ul class="home-auth"> 
				<li class="auth-item login-item">
					<router-link :to="{ name: 'login'}"><translate>LOGIN</translate></router-link>
				</li>
				<li class="auth-item signup-item">
					<router-link :to="{ name: 'register'}"><translate>SIGN UP</translate></router-link>
				</li>
			</ul>
		</header>
		<section class="main-img">
			<div class="title-wrapper">
				<h1 class="main-title"><translate>Buy & Sell Easy</translate></h1>
				<p class="main-text"><translate>With Home Market</translate></p>
				<router-link :to="{ name: 'ads-list'}" class="cta"><translate>START NOW</translate></router-link>
			</div>
		</section>
    <section class="rubrics-section">
      <h5 class="section-title"><translate>Our Rubrics</translate></h5>
      <p class="section-subtitle">Home Market is a great way of selling your products online. Create ads easely and for free, and we will help get your products in front of more people. Also you can buy everything you need just staying at home.</p>
      <div class="slider-wrapper">
        <tiny-slider 
          :mouse-drag="true" 
          :loop="false" 
          :responsive="{
          1: {items: 1, nav: true, navAsThumbnails: true, navContainer: true, controls: false}, 
          480: {items: 2, nav: true, navAsThumbnails: true, navContainer: true, controls: false},
          568: {items: 3, nav: false, navAsThumbnails: false, navContainer: false, controls: true},  
          767: {items: 4, nav: false, navAsThumbnails: false, navContainer: false, controls: true}
          }" 
          items="4" 
          gutter="20" 
          :controlsText="[prevButton, nextButton]" 
          v-if="getCategories.length">
          <div v-for="category in getCategories" class="slider-item" v-bind:style="{ backgroundImage: 'url(' + getImageUrl(category.slug) + ')'}">
              <div class="popover-wrapper" :key="category.name">
                <div><translate>{{category.name}}</translate></div>
                <div>{{category.count}} <translate>ads</translate></div>
              </div>
          </div>
        </tiny-slider>
      </div>
    </section>
    <section class="team-section">
    	<h5 class="section-title"><translate>Our Team</translate></h5>
      <p class="section-subtitle">We are team of open and passionate people that love to launch new initiatives. We make innovative products that people love and adopt in their everyday work. We're seeking another software developers for exciting and challenging work.</p>
    	<div class="team-content">
	    	<div class="slider-container">
				    <gallery :images="images" :index="null" @close="index=null" :carousel="true"></gallery>
				</div>
				<div class="info-container">
					<p class="info-title"><translate>You think we're cool? Let's work together</translate></p>
					<button class="cta info-cta">
						<span><translate>get in touch</translate></span>
					</button>
				</div>
			</div>
    </section>
	</div>
</template>

<script>
import VueTinySlider from 'vue-tiny-slider'
import VueGallery from '@/components/extended/vueGallery'

export default {
  components: {
    'tiny-slider': VueTinySlider,
    'gallery': VueGallery
  },
  data () {
    return {
      showMenu: false,
      prevButton: `<span class="my-slide-prev">
      <svg viewBox="0 0 477.175 477.175">
      <g>
      <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225
      c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
      </g>
      </svg>
      </span>`,
      nextButton: `<span class="my-slide-next">
      <svg viewBox="0 0 477.175 477.175">
      <g>
      <path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5
      c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z
      " />
      </g>
      </svg>
      </span>`,
      images: [
          {href: require('@/assets/my-photo.jpg'), description: 'Front-End Developer'},
          {href: require('@/assets/20170610_085704.jpg'), description: 'Back-End Developer'},
          {href: require('@/assets/man.png'), description: 'test'}],
        index: null
      }
    },
  created () {
    this.$store.dispatch('GET_CATEGORIES')
  },
  mounted () {
    window.addEventListener('resize', this.handleWindowResize)
  },
  methods: {
    test() {
      console.log('teset')
    },
    handleWindowResize(event) { 
      if(event.currentTarget.innerWidth > 767) {
        this.showMenu = false
      }
    },
    toggleMenu () {
      this.showMenu = !this.showMenu
    },
    getImageUrl(slug) {
      return require(`@/assets/rubrics/${slug}.jpg`)
    }
  },
  computed: {
    getCategories () {
      return this.$store.getters.getCategories.results
    }
  }
 
}

</script>

<style scoped lang="scss">
.home-landing {
	.home-header {
		position: fixed;
		top: 0;
		left: 0;
		height: 70px;
		width: 100%;
		z-index: 50;
		background-color: rgba(36, 42, 53, 0.6);
		border-bottom: 1px solid rgba(255, 255, 255, 1);
		padding: 0 50px;
    display: flex;
    align-items: center;
    @media screen and (max-width:320px){
      padding: 0 25px;
    }
    .menu-burger {
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
		.home-menu {
			list-style: none;
			display: flex;
			align-items: center;
			height: 100%;
      .menu-item {
        cursor: pointer;
        font-size: 14px;
        margin: 0 10px;
        transition: color 0.4s ease 0s;
        &:hover .menu-item-link::after {
          width: 100%;
        }
        .menu-item-link {
          color: #FFFFFF;
          position: relative;
          &::after {
            content: "";
            display: block;
            position: absolute;
            width: 0;
            bottom: -7px;
            height: 3px;
            background-color: #fff;
            transition: width 0.5s;
          } 
        }
      }
    }
    .home-auth {
      margin-left: auto;
      list-style: none;
      display: flex;
      align-items: center;
      height: 100%;
      .auth-item {
        cursor: pointer;
        font-size: 14px;
        padding: 0 10px;
        color: #FFFFFF;
        transition: color 0.4s ease 0s;
        a {
          color: #FFFFFF;
        }
      }
			.login-item {
				margin-right: 15px;
				padding: 5px 10px;
				border: 1px solid transparent;
				&:hover {
	    		border: 1px solid white;
	    		border-radius: 10px;
    		}
			}
			.signup-item {
				padding: 5px 10px;
    		border: 1px solid white;
    		border-radius: 10px;
			}
		}
	}
	.cta {
		width: 145px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(123, 79, 173, 0.4);
		border: 1px solid rgba(255, 255, 255, 1);
		cursor: pointer;
		transition: border-color 0.4s ease 0s, background-color 0.4s ease 0s;
		text-transform: uppercase;
		font-weight: 300;
		font-size: 14px;
		color: #fff;
		&:hover {
			background-color: rgba(255, 255, 255, 0.26);
			border-color: transparent;
		}
	}
	.main-img {
		background-image: url('../assets/Online-Market-Place.jpg');
		background-repeat: no-repeat;
		background-position: auto 700px;
		background-size: cover;
		padding-right: 100px;
		width: 100%;
		height: 800px;
		display: flex;
		flex-direction: column;
		padding-top: 250px;
		align-items: flex-end;
    @media screen and (max-width:1024px){
      align-items: center;
      padding-right: 0;
    }
    @media screen and (max-width:768px){
      height: 600px;
    }
    @media screen and (max-width:320px){
      padding-top: 0;
      justify-content: center;
      height: 400px;
    }
		.title-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			.main-title {
        text-align: center;
				font-size: 48px;
				line-height: 1.3em;
				color: #fff;
				font-family: 'Muli', sans-serif;
        font-weight: 600;
        letter-spacing: 2px;
        margin-bottom: 10px;
        @media screen and (max-width:320px){
          font-size: 32px;
        }
			}
			.main-text {
				font-size: 38px;
				line-height: 1.3em;
				color: #fff;
				font-weight: 300;
				margin-bottom: 40px;
        font-style: italic;
        @media screen and (max-width:320px){
          font-size: 26px;
        }
			}
		}
	}
.section-title {
    font-size: 34px;
    color: #8c40b8;
    margin: 0 auto 20px;
    text-align: center;
    font-family: 'Arapey', serif;
    position: relative;
    max-width: 220px;
    font-style: italic;
    @media screen and (max-width:320px){
      margin: 0 auto 20px;
    }
    &:before {
        content: "";
        position: absolute;
        width: 330px;
        height: 1px;
        left: 240px;
        top: 50%;
        background-color: rgba(36, 42, 53, 1);
     }
     &:after {
        content: "";
        position: absolute;
        width: 330px;
        height: 1px;
        right: 240px;
        top: 50%;
        background-color: rgba(36, 42, 53, 1);
     }
  }
  .section-subtitle {
    font-family: 'Open Sans', sans-serif;
    font-size: 14px;
    text-align: center;
    max-width: 600px;
    margin: 0 auto 40px;
    @media screen and (max-width:320px){
      padding: 0 10px;
    }
  }
  .rubrics-section {
    padding: 90px 0;
    @media screen and (max-width:320px){
      padding: 30px 0 50px;
    }
     .slider-wrapper {
	     position:relative;
	     height:280px;
	      /deep/ button[data-controls] {
        border: 0;
        background-color: transparent;
        text-decoration: none;
        z-index: 2;
        width: 50px;
        height: 50px;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover svg {
          transition: fill 0.4s ease 0s;
          fill: #0C0145;
        }
      }
      /deep/ button[data-controls="prev"] {
        position: absolute;
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
      }
      /deep/ button[data-controls="next"] {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
      }
      /deep/ .my-slide-prev, /deep/ .my-slide-next {
        svg {
          transition: fill 0.4s ease 0s;
          width: 35px;
          height: 35px;
          fill: #fff;
        }
      }
      /deep/ .tns-nav {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: -40px;
        height: 30px;
        width: 100%;
        button[data-nav] {
          display: inline-block;
          background-color: rgba(36, 42, 53, 0.6);
          width: 10px;
          height: 0;
          padding-bottom: 10px;
          border-radius: 50%;
          margin: 0 3px;
          overflow: hidden;
          border: none;
          &:hover {
            background-color: rgba(123, 79, 173, 0.4);
          }
        }
      }
      .slider-item {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        height: 280px;
        position: relative;
        cursor: pointer;
        &:focus .popover-wrapper, &:hover .popover-wrapper {
 					 opacity: 1;
      	}
        .popover-wrapper {
          height: 280px;
          width: 100%;
          position: absolute;
          tot: 0;
          left: 0;
          background-color: hsla(0,0%,9%,.6);
					opacity: 0;
          transition: opacity 0.2s ease-in;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 20px;
        }
      }
    }
  }
  .team-section {
  	.team-content {
  		display: flex;
      background: url('../assets/4639.jpg') top center no-repeat;
      background-size: cover;
  		background-color: rgba(36, 42, 53, 0.3);
  		padding: 0 10%;
      @media screen and (max-width:1024px){
        padding: 0 15px;
      }
      @media screen and (max-width:841px){
        flex-direction: column;
      }
			.slider-container {
	  		margin: 0 auto;
        width: 100%;
	  		flex: 2;
        /deep/ .blueimp-gallery-carousel {
          padding-bottom: 50.25%;
        }
	  		/deep/ .blueimp-gallery {
					background-color: rgba(36, 42, 53, 0.7);
					box-shadow: 0 0 3px #000;
          & > .description {
            left: 50%;
          }
	  		}
	  		/deep/ .blueimp-gallery > .slides > .slide > .slide-content {
	  			width: 200px;
	  			height: 200px;
	  			border-radius: 50%;
	  			left: -250px;
          position: absolute;
          @media screen and (max-width:500px){
            width: 100px;
            height: 100px;
          }
          @media screen and (max-width:400px){
            width: 100px;
            height: 100px;
            left: -150px;
          }
	  		}
        /deep/ .blueimp-gallery>.next, /deep/ .blueimp-gallery>.prev {
          @media screen and (max-width:500px){
            display: none;
          }
        }
	  	}
	  	.info-container {
	  		flex: 1;
	  		display: flex;
	  		flex-direction: column;
	  		align-items: center;
	  		justify-content: center;
        margin-left: 30px;
        @media screen and (max-width:841px){
          margin-left: 0;
        }
	  		.info-title {
	  			text-align: center;
	  			font-size: 30px;
	  			color: rgba(0,0,0,1);
          text-shadow: 2px 2px 3px rgba(255,255,255,1);
	  			margin: 0 0 30px 15px;
          @media screen and (max-width:841px){
            margin: 25px 0 15px;
          }
          @media screen and (max-width:320px){
            font-size: 22px;
            margin-top: 15px;
          }
	  		}
        .info-cta {
          border: 2px solid rgba(123, 79, 173, 1);
          background-color: rgba(36, 42, 53, 0.7);
          @media screen and (max-width:841px){
            margin-bottom: 20px;
          }
          &:hover {
            border: 2px solid rgba(123, 79, 173, 1);
            color: rgba(36, 42, 53, 0.7);
            background-color: rgba(255, 255, 255, .6);
          }
        }
	  	}
	  }
	}
}
@media screen and (max-width: 768px) {
  .home-landing {
    .home-header {
      .home-menu {
        flex-direction: column;
        align-items: flex-start;
        position: fixed;
        background: rgba(0, 0, 0, .7);
        top: 0;
        left: 0;
        margin: 0;
        padding: 70px 50px 15px 50px;
        text-align: left;
        z-index: -1;
        transform: translate(-100%, 0);
        transition: transform 0.5s;
        opacity: 0;
        .menu-item {
          margin-top: 20px;
          margin-left: 0;
        }
      }
      .home-menu--open {
        opacity: 1;
        transform: translate(0, 0);
      }
      .home-menu--close {
        opacity: 1;
      }
    }
  }
}
@media screen and (max-width: 320px) {
  .home-landing {
    .home-header {
      .menu-burger {
        width: 20px;
        height: 20px;
      }
      .home-menu {
        padding: 70px 30px 15px 25px;
      }
    }
  }
}
</style>
