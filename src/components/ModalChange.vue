<template>
	<modal name="profileChange" :height="400" :width="400">
	<i class="fa fa-window-close fa-lg close-button" aria-hidden="true" @click="closeModal()"></i>
	<div class="fill-info-container">
	   <div class="fill-info-fields field">
  		<label>
  		  <span>First name:</span>
  		  <input type="text" class="input" :value="firstName" @input="inputFirstNameHadler($event)">
  		</label>
	   </div>
	   <div class="fill-info-fields field">
  		<label>
  		  <span>Last name:</span>
  		  <input type="text" class="input" :value="lastName" @input="inputLastNameHadler($event)">
  		</label>
	   </div>
     <div class="fill-info-fields">
        <b-field label="Country:">
          <b-autocomplete 
              v-model="country"
              v-on:blur="getCities()"
              :data="filteredCountryArray"
              placeholder="Start typing country name..."
              icon="search">
              <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>
     </div>
     <div class="fill-info-fields">
        <b-field label="City:">
          <b-autocomplete 
              v-model="city"
              :data="filteredCityArray"
              placeholder="Start typing city name..."
              icon="search">
              <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>
     </div>
	   <button-bar :label="'Save'" class="save-button" :click="changeProfileHandler"></button-bar>
	</div>
	</modal>
</template>

<script>
import buttonBar from '@/components/ButtonBar'

export default {
  components: {
    buttonBar
  },
  props: {
    firstName: String,
    lastName: String,
    inputFirstNameHadler: Function,
    inputLastNameHadler: Function,
    changeProfileHandler: Function
  },
  data () {
    return {
      country: '',
      city: '',
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
  watch: {
    getLoading () {
      if (!this.getLoading) {
        this.$modal.hide('profileChange')
      }
    }
  },
  methods: {
    closeModal () {
      this.$modal.hide('profileChange')
    },
    getCities () {
      this.city = ''
      setTimeout(this.fetchCities, 1000)
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

<style scoped>
  .fill-info-fields /deep/ .label {
    font-weight: normal;
    margin-bottom: 0;
  }
  .fill-info-fields {
    margin-bottom: 12px;
  }
  .fill-info-fields /deep/ .input {
    height: 30px;
    width: 250px;
  }
  .fill-info-fields /deep/ .icon {
    height: 28px;
  }
  .close-button {
    float: right;
    margin: 7px;
    color: red;
    cursor: pointer;
  }
  .save-button {
  	letter-spacing: 1.3px;
    margin-left: 147.9px;
  }
  .fill-info-fields label, .fill-info-fields /deep/ .field {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .fill-info-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 350px;
    width: 350px;
    margin-top: 5px;
  }
  /deep/ .control {
    display: inline-block;
    width: 250px;
  }
  /deep/ .label {
    display: inline;
  }
</style>