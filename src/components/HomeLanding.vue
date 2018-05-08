<template>
	<div class="home-landing">
		<header class="home-header">
			<ul class="home-menu">
				<li class="menu-item">HOME</li>
				<li class="menu-item">SHOP</li>
				<li class="menu-item">CREATE AD</li>
				<li class="menu-item">ABOUT</li>
				<li class="menu-item">CONTACT</li>
			</ul>
		</header>
		<section class="main-img">
			<div class="title-wrapper">
				<h1 class="main-title">Buy & Sell Easy</h1>
				<p class="main-text">With Home Market</p>
				<button class="cta">
					<span>START NOW</span>
				</button>
			</div>
		</section>
    <section class="rubrics-section">
      <h5 class="rubrics-title">Our Rubrics</h5>
      <div class="slider-wrapper">
        <tiny-slider :mouse-drag="true" :loop="false" items="4" gutter="20" :controlsText="[prevButton, nextButton]">
          <div class="slider-item slider-item9"><div class="popover-wrapper">Fashion</div></div>
          <div class="slider-item slider-item2"><div class="popover-wrapper">House and garden</div></div>
          <div class="slider-item slider-item3"><div class="popover-wrapper">Kids stuff</div></div>
          <div class="slider-item slider-item8"><div class="popover-wrapper">Real estate</div></div>
          <div class="slider-item slider-item5"><div class="popover-wrapper">Spare parts for transport</div></div>
          <div class="slider-item slider-item6"><div class="popover-wrapper">Hobby, rest and sport</div></div>
          <div class="slider-item slider-item7"><div class="popover-wrapper">Electronics</div></div>
          <div class="slider-item slider-item11"><div class="popover-wrapper">Job</div></div>
          <div class="slider-item slider-item1"><div class="popover-wrapper">Transport</div></div>
          <div class="slider-item slider-item4"><div class="popover-wrapper">Animals</div></div>
          <div class="slider-item slider-item10"><div class="popover-wrapper">Business and services</div></div>
        </tiny-slider>
      </div>
    </section>
	</div>
</template>

<script>
import VueTinySlider from 'vue-tiny-slider'

export default {
  components: {
    'tiny-slider': VueTinySlider
  },
  data () {
    return {
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
      </span>`
      }
    },
  created () {
    console.log('getAds', this.getAds)
    this.$store.dispatch('GET_CATEGORIES')
  },
  computed: {
    getAds () {
      return this.$store.getters.getAds;
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
		height: 90px;
		width: 100%;
		background: red;
		z-index: 50;
		background-color: rgba(36, 42, 53, 0.6);
		border-bottom: 1px solid rgba(255, 255, 255, 1);
		padding: 0 50px;
		cursor: pointer;
		.home-menu {
			list-style: none;
			.menu-item {
				font-size: 14px;
				line-height: 90px;
				display: inline-block;
				padding: 0 10px;
				color: #FFFFFF;
				transition: color 0.4s ease 0s;
			}
		}
	}
	.main-img {
		background-image: url('../assets/Online-Market-Place.jpg');
		background-repeat: no-repeat;
		background-position: auto 700px;
		background-size: cover;
		padding-right: 150px;
		width: 100%;
		height: 800px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-end;
		.title-wrapper {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.main-title {
				font-size: 48px;
				line-height: 1.3em;
				color: #fff;
				font-family: 'Muli', sans-serif;
        font-weight: 600;
        letter-spacing: 2px;
			}
			.main-text {
				font-size: 38px;
				line-height: 1.3em;
				color: #fff;
				font-weight: 300;
				margin-bottom: 35px;
			}
			.cta {
				width: 145px;
				height: 40px;
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: transparent;
				border: solid rgba(255, 255, 255, 1) 1px;
				cursor: pointer;
				transition: border-color 0.4s ease 0s, background-color 0.4s ease 0s;
				&:hover {
					background-color: rgba(255, 255, 255, 0.26);
					border-color: transparent;
					transition: border-color 0.4s ease 0s, background-color 0.4s ease 0s;
				}
				span {
					font-weight: 300;
					font-size: 14px;
					color: #fff;
				}
			}
		}
	}
  .rubrics-section {
    padding: 90px 0;
    .rubrics-title {
      font-size: 36px;
      /*color: #242A35;*/
      color: #0C0145;
      margin: 0 auto 50px;
      text-align: center;
      font-family: 'GFS Didot', serif;
      position: relative;
      width: 200px;
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
      .slider-item1 {
        background-image: url('../assets/1495.jpg');
      }
      .slider-item2 {
        background-image: url('../assets/furniture.jpeg');
      }
      .slider-item3 {
        background-image: url('../assets/149972-OTYS5J-238.jpg');
      }
      .slider-item4 {
        background-image: url('../assets/242.jpg');
      }
      .slider-item5 {
        background-image: url('../assets/887.jpg');
      }
      .slider-item6 {
        background-image: url('../assets/1017.jpg');
      }
      .slider-item7 {
        background-image: url('../assets/282483-P61FUH-317.jpg');
      }
      .slider-item8 {
        background-image: url('../assets/85.jpg');
      }
      .slider-item9 {
        background-image: url('../assets/468.jpg');
      }
      .slider-item10 {
        background-image: url('../assets/O6JTUC0.jpg');
      }
      .slider-item11 {
        background-image: url('../assets/O6XN980.jpg');
      }
      .slider-item {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        height: 280px;
        position: relative;

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
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 20px;
          }
      }
    }
  }
}
</style>
