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
          <a href="#" class="menu-item-link" v-scroll-to="'.team-section, 0'"><translate>TEAM</translate></a>
        </li>
				<li class="menu-item">
          <a href="#" class="menu-item-link" v-scroll-to="'.contact-section, 0'"><translate>CONTACT</translate></a>
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
        <h5 class="section-title"><translate>Our Categories</translate></h5>
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
            <div v-for="category in imageURLs" class="slider-item" v-bind:style="{ backgroundImage: 'url(' + getImageUrl(category) + ')'}" @click="chooseRubric(category)">
                <div v-if="!getCategoriesLoading" class="popover-wrapper" :key="category.name">
                  <div><translate>{{getCategoryInfo(category, 'name')}}</translate></div>
                  <div>{{getCategoryInfo(category, 'count')}} <translate>ads</translate></div>
                </div>
            </div>
          </tiny-slider>
        </div>
      </section>
      <section class="team-section">
      	<h5 class="section-title"><translate>Our Team</translate></h5>
        <p class="section-subtitle">We are team of open and passionate people that love to launch new initiatives. We make innovative products that people love and adopt in their everyday work. We're seeking new opportunities and another software developers for exciting and challenging work.</p>
      	<div class="team-content">
  	    	<div class="slider-container">
  				    <gallery :images="images" :index="null" @close="index=null" :carousel="true"></gallery>
  				</div>
  				<div class="info-container">
  					<p class="info-title"><translate>You think we're cool? Let's work together</translate></p>
  					<button class="cta info-cta">
  						<a href="https://www.linkedin.com/in/daria-dvoretska-340b74146/"><translate>get in touch</translate></a>
  					</button>
  				</div>
  			</div>
      </section>
      <section class="contact-section">
        <h5 class="section-title"><translate>Contact us</translate></h5>
        <p class="section-subtitle">Get to Know Home Market Better</p>
        <div class="contact-content">
          <div class="contact-info-wrapper">
            <div class="contact-info-item">Zaporizhzhya</div>
            <div class="contact-info-item">Tel: +38 093 489 04 36</div>
            <div class="contact-info-item">dvoretska4@gmail.com</div>
          </div>
          <div class="contact-input-wrapper">
            <input type="text" placeholder="Email Address" v-model="email" :class="{'input-error': !isValidEmail}">
            <button @click="validateEmail(email)">Subscribe now</button>
            <div v-if="!isValidEmail" class="error">Please enter a valid email address</div>
          </div>
        </div>
      </section>
      <div class="interlayer"></div>
      <footer-bar></footer-bar>
	</div>
</template>

<script>
import VueTinySlider from 'vue-tiny-slider'
import VueGallery from '@/components/extended/vueGallery'
import footerBar from '@/components/footer/FooterBar'

export default {
  components: {
    'tiny-slider': VueTinySlider,
    'gallery': VueGallery,
    footerBar
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
      imageURLs: [
        'animals', 
        'business-and-services',
        'electronics',
        'fashion',
        'hobby-rest-and-sport',
        'house-and-garden',
        'job',
        'kids-stuff',
        'real-estate',
        'spare-parts-for-transport',
        'transport'
      ],
      images: [
          {href: require('@/assets/my-photo.jpg'), description: '<h3 class="description-title">Founder, Front-End Developer</h3><p class="description-text">"People believe that programming is the science of the elite, but in reality the opposite is true - many people create programs that use other people\'s programs, like building a wall of small bricks."</p>'},
          {href: require('@/assets/20170610_085704.jpg'), description: '<h3 class="description-title">Founder, Back-End Developer</h3><p class="description-text">"Programming is the science that can help a person to know themselves, improve the quality of life, learn the unknown, understand the origin of life. This is a very amazing thing that we come across in everyday life more often than one can imagine."</p>'},
          {href: require('@/assets/man.png'), description: '<h3 class="description-title">Future Developer</h3>'}],
      index: null,
      email: '',
      isValidEmail: true
      }
    },
  created () {
    this.$store.dispatch('GET_CATEGORIES')
  },
  mounted () {
    window.addEventListener('resize', this.handleWindowResize)
  },
  methods: {
    validateEmail (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.isValidEmail = re.test(String(email).toLowerCase());
    },
    getCategoryInfo (slug, type) {
      return this.getCategories.find(function(category) {
        return category.slug === slug
      })[type]
    },
    chooseRubric (slug) {
        this.$router.push({name: 'ads-list', query: {category: slug}})
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
    },    
    getCategoriesLoading () {
      return this.$store.getters.getCategories.loading
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
    background-position: 0% !important;
		border-bottom: 1px solid rgba(255, 255, 255, 1);
		padding: 0 50px;
    display: flex;
    align-items: center;
    @media screen and (min-width:320px) and (max-width: 480px){
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
      @media screen and (min-width:320px) and (max-width: 480px) {
       padding: 70px 30px 15px 25px;
      }
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
    margin-bottom: 15px;
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
    background-attachment: fixed;
		padding-right: 100px;
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		padding-top: 250px;
		align-items: flex-end;
    position: relative;
    @media screen and (max-width:1024px){
      align-items: center;
      padding-right: 0;
    }
    @media screen and (max-width:768px){
      height: 600px;
    }
    @media screen and (min-width:320px) and (max-width: 480px){
      padding-top: 0;
      justify-content: center;
      height: 400px;
      background-position: center;
    }
		.title-wrapper {
      position: -webkit-sticky;
      position: sticky;
      top: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
      @media screen and (min-width:320px) and (max-width: 480px){
        padding-top: 25px;
      }
			.main-title {
        text-align: center;
				font-size: 48px;
				line-height: 1.3em;
				color: #fff;
				font-family: 'Muli', sans-serif;
        font-weight: 600;
        letter-spacing: 2px;
        margin-bottom: 10px;
        @media screen and (min-width:320px) and (max-width: 480px){
          font-size: 40px;
        }
			}
			.main-text {
				font-size: 38px;
				line-height: 1.3em;
				color: #fff;
				font-weight: 300;
				margin-bottom: 40px;
        font-style: italic;
        @media screen and (min-width:320px) and (max-width: 480px){
          font-size: 28px;
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
    @media screen and (min-width:320px) and (max-width: 480px){
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
    @media screen and (min-width:320px) and (max-width: 480px){
      padding: 0 10px;
    }
  }
  .rubrics-section {
    padding-top: 90px;
    overflow-x: hidden;

    position: relative;
    z-index: 1;
    background-color: white;
    @media screen and (min-width:320px) and (max-width: 480px){
      padding-top: 30px;
    }
     .slider-wrapper {
	     position:relative;
	     height:280px;
       @media screen and (max-width: 480px){
          margin-bottom: 40px;
        }
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
          background-color: rgba(36, 42, 53, 0.4);
          width: 10px;
          height: 0;
          padding-bottom: 10px;
          border-radius: 50%;
          margin: 0 3px;
          overflow: hidden;
          border: none;
        }
        button[data-nav].tns-nav-active {
          background-color: #8c40b8;
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
    padding-top: 90px;
    overflow-x: hidden;

    position: relative;
    z-index: 1;
    background-color: white;
    @media screen and (min-width:320px) and (max-width: 480px){
      padding-top: 30px;
    }
  	.team-content {
  		display: flex;
      background: url('../assets/4639.jpg') top center no-repeat;
      background-size: cover;
  		background-color: rgba(36, 42, 53, 0.3);
  		padding: 30px 10%;
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
            /deep/ .description-title {
              font-size: 20px;
              margin-bottom: 15px;
               @media screen and (max-width:575px){
                font-size: 16px;
                margin-bottom: 10px;
              }
            }
             /deep/ .description-text {
              font-size: 14px;
              @media screen and (max-width:575px){
                font-size: 12px;
              }
              @media screen and (min-width:320px) and (max-width: 480px){
                display: none;
              }
            }
	  		}
	  		/deep/ .blueimp-gallery > .slides > .slide > .slide-content {
	  			width: 200px;
	  			height: 200px;
	  			border-radius: 50%;
	  			left: -300px;
          position: absolute;
          @media screen and (max-width:575px){
            width: 150px;
            height: 150px;
            left: -250px;
          }
          @media screen and (min-width:320px) and (max-width: 480px){
            width: 100px;
            height: 100px;
            left: -150px;
          }
	  		}
        /deep/ .blueimp-gallery>.next, /deep/ .blueimp-gallery>.prev {
          @media screen and (max-width:575px){
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
          @media screen and (min-width:320px) and (max-width: 480px){
            font-size: 22px;
            margin-top: 15px;
          }
	  		}
        .info-cta {
          border: 1px solid white;
          background-color: rgba(36, 42, 53, 0.7);
          a {
            color: #fff;
          }
          @media screen and (max-width:841px){
            margin-bottom: 20px;
          }
          &:hover {
            border: 1px solid rgba(123, 79, 173, 1);
            background-color: rgba(255, 255, 255, .6);
            a {
              color: rgba(36, 42, 53, 0.7);
            }
          }
        }
	  	}
	  }
	}
  .contact-section {
    padding: 90px 0;
    position: relative;
    z-index: 1;
    background-color: white;
      @media screen and (min-width:320px) and (max-width: 480px){
        padding: 30px 0;
      }
    .contact-content {
      display: flex;
      align-items: center;
      @media screen and (max-width:767px){
        flex-direction: column;
      }
      .contact-info-wrapper {
        flex: 1;
        text-align: center;
        width: 100%;
        font-size: 19px;
        font-family: 'Muli', sans-serif;
        font-weight: bold;
        .contact-info-item:nth-child(2) {
          margin: 10px 0;
        }
      }
      .contact-input-wrapper {
        flex: 1;
        width: 100%;
        @media screen and (max-width:767px){
          text-align: center;
          margin-top: 20px;
        }
        @media screen and (min-width:320px) and (max-width: 480px){
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        input {
          width: 50%; 
          background: #e2e2e2;
          color: rgba(36,42,53,1);
          padding: 9px;
          font-size: 17px;
          display: inline-block;
          font-family: 'Muli', sans-serif;
          border: 1px solid transparent;
          @media screen and (min-width:320px) and (max-width: 480px){
            width: 90%;
            order: 1;
          }
          &.input-error {
            border: 1px solid red;
          }
        }
        button {
          white-space: nowrap;
          padding: 10px 24px;
          color: white;
          background-color: rgba(123, 79, 173, 0.4);
          font-size: 17px;
          font-family: 'Muli', sans-serif;
          border: none;
          cursor: pointer;
          transition: background-color 0.4s ease 0s;
          &:hover {
            background-color: rgba(36, 42, 53, 0.6);
          }
          @media screen and (min-width:320px) and (max-width: 480px){
            order: 3;
            margin-top: 10px;
          }
        }
        .error {
          font-size: 13px;
          color: red;
          margin-top: 5px;
          padding-left: 5px;
          order: 2;
        }
      }
    }
  }
  .interlayer {
    border-top: 1px solid rgba(36, 42, 53, 1);
    border-bottom: 2px solid rgba(36, 42, 53, 1);
    background: #e2e2e2;
    padding: 5px 0 0 0;
  }
  /deep/ .footer-container {
    margin-top: 0;
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
</style>
