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
			              @change="handleInputChange({country})"
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
			              @change="handleInputChange({city})"
			              placeholder="Start typing city name..."
			              icon="search">
			              <template slot="empty"><translate>No results found</translate></template>
			          </b-autocomplete>
			        </b-field>
			        <div class="field" slot="content">
				  		<label>
							<translate>First name</translate>
							<input type="text" class="input" v-model="firstName" @input="handleInputChange({firstName})">
				  		</label>
					</div>
					<div class="field" slot="content">
				  		<label>
							<translate>Last name</translate>
							<input type="text" class="input" v-model="lastName" @input="handleInputChange({lastName})"
                     @keyup.enter="changeContactInfo()">
				  		</label>
					</div>
					<button class="save-button" slot="content" @click="changeContactInfo()">
						<translate>Save</translate>
					</button>
			    </div>
		    </BulmaAccordionItem>
		    <BulmaAccordionItem>
		        <h4 slot="title"><translate>Phone number</translate></h4>
		        <div class="field" slot="content">
			  		<label>
						<translate>Phone number</translate>
						<phone-input :phone="phone" class="vue-phone-input"></phone-input>
			  		</label>
				</div>
				<button class="save-button" slot="content" @click="changeUserPhone()">
					<translate>Save</translate>
				</button>
		    </BulmaAccordionItem>
		    <BulmaAccordionItem>
		        <h4 slot="title"><translate>Password</translate></h4>
		        <div class="field" slot="content">
			  		<label>
						<translate>New password</translate>
						<input type="text" class="input">
			  		</label>
				</div>
				<div class="field" slot="content">
			  		<label>
						<translate>Confirm new password</translate>
						<input type="text" class="input">
			  		</label>
				</div>
				<button class="save-button" slot="content"><translate>Save</translate></button>
		    </BulmaAccordionItem>
		   	<BulmaAccordionItem>
		        <h4 slot="title"><translate>Email</translate></h4>
		        <div class="field" slot="content">
			  		<label>
						<translate>Your current email</translate>
						<input type="text" class="input">
			  		</label>
				</div>
				<div class="field" slot="content">
			  		<label>
						<translate>Your new email</translate>
						<input type="text" class="input">
			  		</label>
				</div>
				<button class="save-button" slot="content">
					<translate>Save</translate>
				</button>
		    </BulmaAccordionItem>
		    <BulmaAccordionItem>
		        <h4 slot="title"><translate>Delete your account</translate></h4>
		        <button class="delete-button" slot="content">
		        	<translate>Delete your account</translate>?
		        </button>
		    </BulmaAccordionItem>
		</BulmaAccordion>
    <vue-toast ref='toast'></vue-toast>
	</div>
</template>

<script>
import { BulmaAccordion, BulmaAccordionItem } from 'vue-bulma-accordion'
import 'vue-toast/dist/vue-toast.min.css'
import VueToast from 'vue-toast'

export default {
  components: {
    BulmaAccordion,
    BulmaAccordionItem,
    VueToast
  },
  data () {
    return {
      countryData: [],
      cityData: [],
      firstName: this.$store.getters.getUserDetails.first_name,
      lastName: this.$store.getters.getUserDetails.last_name,
      country: this.$store.getters.getUserDetails.country,
      city: this.$store.getters.getUserDetails.city,
      phone: {number: this.$store.getters.getUserDetails.phone || '', code: ''}
    }
  },
  created () {
    this.$store.dispatch('GET_COUNTRIES', (data) => {
    this.countryData = Object.keys(data)
    this.originCountryData = data
    })
  },
  methods: {
    saveUserPhone () {
      console.log(this.phone.number)
    },
  	handleInputChange (data) {
//  		this.$store.commit('updateUserDetailsField', data)
  	},
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
    },
    changeContactInfo () {
      this.$store.dispatch('CHANGE_CONTACT_INFO', {
        first_name: this.firstName,
        last_name: this.lastName,
        country: this.country,
        city: this.city,
        callback: this.$refs.toast.showToast
      })
    },
    changeUserPhone () {
      this.$store.dispatch('CHANGE_USER_PHONE', {
        phone: this.phone.number,
        callback: this.$refs.toast.showToast
      })
    }
  },
  computed: {
    getLoading () {
      return this.$store.getters.getLoading
    },
    filteredCountryArray () {
      if(this.country) {
	      return this.countryData.filter((option) => {
	        return option
	          .toString()
	          .toLowerCase()
	          .indexOf(this.country.toLowerCase()) >= 0
	      })
	  }
	  return [];
    },
    filteredCityArray () {
    	if(this.city) {
	      return this.cityData.filter((option) => {
	        return option
	          .toString()
	          .toLowerCase()
	          .indexOf(this.city.toLowerCase()) >= 0
	      })
	    }
	    return [];
    }
  }
}
</script>

<style scoped lang="scss">
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
	.profile-settings-container {
		margin: 5px;
	}
	.vue-phone-input {
		width: 310px;
	}
	/deep/ .field label {
		text-align: left;
		color: #5F5760;
		font-weight: 500;
		line-height: 23px;;
		margin-bottom: 2px;
		margin-left: 9.6px;
		font-size: 14px;
	}
	.field /deep/ label {
		& input.input {
			width: 310px;
		}
		& span {
			display: inline-block;
			width: 100%;
			margin-bottom: 3px;
			line-height: 1;
			font-size: 14px;
			font-weight: 500;
		}
	}
	/deep/ .control {
		& input {
			width: 311px;
		}
	}
	/deep/ .card-header {
		background-color: rgba(121, 87, 213, .5);
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
