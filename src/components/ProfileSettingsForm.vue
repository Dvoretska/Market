<template>
	<div class="profile-settings-container">
		<BulmaAccordion
		:dropdown="true"
		:icon="'plus-minus'"
		:caretAnimation="{
		    duration: '.7s',
		    timerFunc: 'ease-in-out',
		}"
		:slide="{
		    duration: '.7s',
		    timerFunc: 'ease',
		}">
		   	<BulmaAccordionItem>
		        <h4 slot="title"><translate>Contact information</translate></h4>
		        <div class="fill-info-fields" slot="content">
			        <b-field :label="getCountry()">
			          <b-autocomplete
			              v-model="country"
			              v-on:blur="getCities($event)"
			              :data="filteredCountryArray"
			              placeholder="Start typing country name..."
			              icon="search">
			              <template slot="empty"><translate>No results found</translate></template>
			          </b-autocomplete>
			        </b-field>
			        <b-field :label="getCity()">
			          <b-autocomplete
			              v-model="city"
			              :data="filteredCityArray"
			              placeholder="Start typing city name..."
			              icon="search">
			              <template slot="empty"><translate>No results found</translate></template>
			          </b-autocomplete>
			        </b-field>
			        <div class="field" slot="content">
				  		<label>
							<span><translate>First name</translate></span>
							<input type="text" class="input">
				  		</label>
					</div>
					<button class="save-button" slot="content"><translate>Save</translate></button>
			    </div>
		    </BulmaAccordionItem>
		    <BulmaAccordionItem>
		        <h4 slot="title"><translate>Phone number</translate></h4>
		        <div class="field" slot="content">
			  		<label>
						<span><translate>Phone number</translate></span>
						<input type="text" class="input">
			  		</label>
				</div>
				<button class="save-button" slot="content"><translate>Save</translate></button>
		    </BulmaAccordionItem>
		    <BulmaAccordionItem>
		        <h4 slot="title"><translate>Password</translate></h4>
		        <div class="field" slot="content">
			  		<label>
						<span><translate>New password</translate></span>
						<input type="text" class="input">
			  		</label>
				</div>
				<div class="field" slot="content">
			  		<label>
						<span><translate>Confirm new password</translate></span>
						<input type="text" class="input">
			  		</label>
				</div>
				<button class="save-button" slot="content"><translate>Save</translate></button>
		    </BulmaAccordionItem>
		   	<BulmaAccordionItem>
		        <h4 slot="title"><translate>Email</translate></h4>
		        <div class="field" slot="content">
			  		<label>
						<span><translate>Your current email</translate></span>
						<input type="text" class="input">
			  		</label>
				</div>
				<div class="field" slot="content">
			  		<label>
						<span><translate>Your new email</translate></span>
						<input type="text" class="input">
			  		</label>
				</div>
				<button class="save-button" slot="content"><translate>Save</translate></button>
		    </BulmaAccordionItem>
		    <BulmaAccordionItem>
		        <h4 slot="title"><translate>Delete your account</translate></h4>
		        <button class="delete-button" slot="content"><translate>Delete your account</translate>?</button>
		    </BulmaAccordionItem>
		</BulmaAccordion>
	</div>
</template>

<script>
import buttonBar from '@/components/ButtonBar'
import { BulmaAccordion, BulmaAccordionItem } from 'vue-bulma-accordion'

export default {
  components: {
    buttonBar,
    BulmaAccordion,
    BulmaAccordionItem
  },
  data () {
    return {
      country: this.$store.getters.getUserDetails.country,
      city: this.$store.getters.getUserDetails.city,
      countryData: [],
      cityData: []
    }
  },
  created () {
    this.$store.dispatch('GET_COUNTRIES', (data) => {
      this.countryData = Object.keys(data)
      this.originCountryData = data
    })
  },
  methods: {
    getCountry () {
      return this.$gettext('Country')
    },
    getCity () {
      return this.$gettext('City')
    },
    getCities (e) {
      if (e.target.value !== this.$store.getters.getUserDetails.country) {
        this.city = ''
        this.cityData = []
      }
      setTimeout(this.fetchCities, 500)
    },
    fetchCities () {
      const code = this.originCountryData[this.country]
      if (code) {
        this.$store.dispatch('GET_CITIES', { 'code': code, 'callback': (data) => { this.cityData = data } })
      }
    }
  },
  computed: {
    getLoading () {
      return this.$store.getters.getLoading
    },
    filteredCountryArray () {
      return this.countryData.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.country.toLowerCase()) >= 0
      })
    },
    filteredCityArray () {
      return this.cityData.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(this.city.toLowerCase()) >= 0
      })
    }
  }
}
</script>

<style scoped lang="scss">
	.profile-settings-container {
		margin: 5px;
	}
	/deep/ .field label {
		text-align: left;
		color: #5F5760;
		font-weight: 500;
		line-height: 1;
		margin-bottom: 0;
		font-size: 14px;
	}
	/deep/ .control {
		& input {
			width: 311px;
		}
	}
	/deep/ .card-header {
		background-color: rgba(140, 0, 158, .5);
	}
	/deep/ .dropdown-menu {
		width: 311px;
		min-width: 311px;
		padding-top: 0;
		padding-bottom: 0;
	}
	/deep/ .dropdown-content {
		width: 311px;
	}
	/deep/ .dropdown-item {
	  width: 311px;
	  height: 100%;
	}
	/deep/ .card-content {
		padding: 0.6rem 1.5rem;
	}
	/deep/ .field:not(:last-child) {
		margin-bottom: 0.5rem;
	}
	.field /deep/ label {
		& input.input {
			width: 310px;
		}
		& span {
			display: inline-block;
			width: 100%;
			margin-bottom: 2px;
			padding-left: 4.8px;
			line-height: 1;
			font-size: 14px;
		}
	}
	/deep/ h4 {
		cursor: pointer;
		font-weight: 700;
		font-size: 16px;
		color: #fff;
	}
	/deep/ .plus-minus .horizontal, /deep/ .plus-minus .vertical {
		background: #fff;
	}
	.save-button {
		height: 30px;
		padding: 0 20px;
		border: none;
		border-radius: 5px;
		background-color: #7b4fad;
		color: #fff;
		cursor: pointer;
		margin-right: auto;
		box-shadow:
        0px 1px rgba(128,128,128,.8),
        0px 2px rgba(118,118,118,.8),
        0px 3px 2px rgba(108,108,108,.8);
        margin-bottom: 7px;
	}
	.delete-button {
		margin: 10px 0;
		height: 30px;
		padding: 0 20px;
		border: none;
		border-radius: 5px;
		background-color: red;
		color: #fff;
		cursor: pointer;
		box-shadow:
        0px 1px rgba(128,128,128,.8),
        0px 2px rgba(118,118,118,.8),
        0px 3px 2px rgba(108,108,108,.8);
	}
</style>
