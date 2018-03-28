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
			        <b-field label="Country:">
			          <b-autocomplete 
			              v-model="country"
			              v-on:blur="getCities($event)"
			              :data="filteredCountryArray"
			              placeholder="Start typing country name..."
			              icon="search">
			              <template slot="empty">No results found</template>
			          </b-autocomplete>
			        </b-field>
			        <b-field label="City:">
			          <b-autocomplete 
			              v-model="city"
			              :data="filteredCityArray"
			              placeholder="Start typing city name..."
			              icon="search">
			              <template slot="empty">No results found</template>
			          </b-autocomplete>
			        </b-field>
			        <div class="name-field field">
				  		<label>
							<span>First name:</span>
							<input type="text" class="input">
				  		</label>
					</div>
			    </div>
		    </BulmaAccordionItem>
		    <BulmaAccordionItem>
		        <h4 slot="title"><translate>Phone number</translate></h4>
		    </BulmaAccordionItem>
		    <BulmaAccordionItem>
		        <h4 slot="title"><translate>Password</translate></h4>
		    </BulmaAccordionItem>
		   	<BulmaAccordionItem>
		        <h4 slot="title"><translate>Email</translate></h4>
		    </BulmaAccordionItem>
		    <BulmaAccordionItem>
		        <h4 slot="title"><translate>Delete your account</translate></h4>
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
		margin-bottom: 6px;
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
	}	
	/deep/ .dropdown-content {
		width: 311px;
		margin-top: 0;
		margin-bottom: 0;
	}
	.name-field /deep/ label {
		& input.input {
			width: 310px;
		}
		& span {
			display: inline-block;
			width: 100%;
			margin-bottom: 6px;
			padding-left: 9.6px;
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
</style>
