<template>
	<div class="footer-container">
		<div class="first-row">
			<span>Contact me</span>
			<span>Terms&Privacy</span>
			 <b-dropdown position="is-top-right" v-model="$language.current">
		        <button class="button is-primary" type="button" slot="trigger">
		            <template>
		                <span>{{ $language.available[$language.current] }}</span>
		            </template>
		        </button>

		        <b-dropdown-item v-for="(language, locale) in $language.available" :value="locale" :key="language">
		            <div class="media">
		                <div class="media-content">
		                    <h3>{{ language }}</h3>
		                </div>
		            </div>
		        </b-dropdown-item>

		    </b-dropdown>
		</div>
		<div class="second-row"><span class="copyright">&copy;2018 Home-market. All rights reserved.</span></div>
	</div>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="scss">
	/deep/ .button, .button:hover, .button:active, .button:focus, .is-primary:active {
      border: none;
      background-color: transparent;
      margin: 0;
      padding: 0;
      box-shadow: 0;
      height: 20px;
      outline: none;

    }
    /deep/ .button {
    	&.is-primary:focus:not(:active) {
    		box-shadow: none;
    	}
    	span {
	    	font-size: 16px;
	    }
	}
	/deep/ .dropdown-menu {
		min-width: 20px;
		& .dropdown-content {
			border-radius: 5px;
			padding-bottom: 3px;
			padding-top: 3px;
			box-shadow: 0 2px 7px rgba(10, 10, 10, 0.3), 0 0 0 1px rgba(10, 10, 10, 0.1);

		}
	}
	.footer-container {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: column;
		height: 90px;
		width: 100%;
	    background:#3C3C4A;
	    margin-top: 35px;
	    padding-bottom: 10px;
	    padding-top: 10px;
	    .first-row {
	    	& span{
	    		font-size: 16px;
				padding-left: 5px;
				padding-right: 5px;
				cursor: pointer;
				color: #7957d5;
				&:hover {
					text-decoration: underline;
				}
			}
	    }
	    .second-row span{
	    	color: #fff;
	    }
	}
</style>