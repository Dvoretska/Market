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
			        <b-field :label="getCity()">
			          <b-autocomplete
			              v-model="city"
			              :data="filteredCityArray"
			              @input="fetchCities"
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
						<translate>Old password</translate>
						<input type="password" class="input" v-model="oldPassword">
            <div class="error" v-if="getChangePasswordErrors && getChangePasswordErrors.old_password">{{getChangePasswordErrors.old_password[0]}}</div>
			  		</label>
          </div>
          <div class="field" slot="content">
			  		<label>
						<translate>New password</translate>
						<input type="password" class="input" v-model="newPassword">
            <div class="error" v-if="getChangePasswordErrors && getChangePasswordErrors.new_password">{{getChangePasswordErrors.new_password[0]}}</div>
			  		</label>
          </div>
          <div class="field" slot="content">
              <label>
              <translate>Confirm new password</translate>
              <input type="password" class="input" v-model="newPasswordConfirm">
              <div class="error" v-if="getChangePasswordErrors && getChangePasswordErrors.new_password_confirm">{{getChangePasswordErrors.new_password_confirm[0]}}</div>
              </label>
          </div>
				  <button class="save-button" slot="content" @click="changeUserPassword()"><translate>Save</translate></button>
		    </BulmaAccordionItem>
		    <BulmaAccordionItem>
		        <h4 slot="title"><translate>Delete your account</translate></h4>
		        <button class="delete-button" slot="content" @click="show">
		        	<translate>Delete your account</translate>?
		        </button>
		    </BulmaAccordionItem>
		</BulmaAccordion>
    <vue-toast ref='toast'></vue-toast>
		<v-dialog/>
	</div>
</template>

<script>
import { BulmaAccordion, BulmaAccordionItem } from 'vue-bulma-accordion'
import 'vue-toast/dist/vue-toast.min.css'
import VueToast from 'vue-toast'
import _ from 'lodash'

export default {
  components: {
    BulmaAccordion,
    BulmaAccordionItem,
    VueToast
  },
  data () {
    return {
      cityData: [],
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      firstName: this.$store.getters.getUserDetails.first_name,
      lastName: this.$store.getters.getUserDetails.last_name,
      city: this.$store.getters.getUserDetails.city,
      phone: {number: this.$store.getters.getUserDetails.phone || '', code: ''}
    }
  },
  methods: {
		show () {
      this.$modal.show('dialog', {
				text: this.translateTitle(),
				buttons: [
					{
						title: this.translateYes(),
						handler: () => {
							this.$store.dispatch('DELETE_PROFILE');
						}
					},
					{
						title: this.translateNo(),
						handler: () => {
							this.$modal.hide('dialog')
						}
					}
			 ]
			})
    },
		fetchCities: _.debounce(function (e) {
			this.$store.dispatch('GET_CITIES', { search: this.city, callback: (data) => { this.cityData = data } })
		}, 700),
	  translateTitle () {
      return this.$gettext('Are you sure you want to delete the profile?')
    },
		translateYes () {
      return this.$gettext('Yes')
    },
		translateNo () {
      return this.$gettext('No')
    },
    getCity () {
      return this.$gettext('City')
    },
    changeContactInfo () {
      this.$store.dispatch('CHANGE_CONTACT_INFO', {
        first_name: this.firstName,
        last_name: this.lastName,
        city: this.city,
        callback: this.$refs.toast.showToast
      })
    },
    changeUserPhone () {
      this.$store.dispatch('CHANGE_USER_PHONE', {
        phone: this.phone.number,
        callback: this.$refs.toast.showToast
      })
    },
    changeUserPassword () {
      this.$store.dispatch('CHANGE_USER_PASSWORD', {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
        newPasswordConfirm: this.newPasswordConfirm,
        callback: this.$refs.toast.showToast,
        clearFields: this.clearFields
      })
    },
    clearFields () {
      this.oldPassword = '';
      this.newPassword = '';
      this.newPasswordConfirm = '';
    }
  },
  computed: {
    getLoading () {
      return this.$store.getters.getLoading
    },
    getChangePasswordErrors () {
      return this.$store.getters.getChangePasswordErrors
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
  .error {
    font-size: 12px;
    color: red;
  }
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
		width: auto;
		min-width: 311px;
		padding-top: 0;
		padding-bottom: 0;
	}
	/deep/ .dropdown-content {
		width: auto;
	}
	/deep/ .dropdown-item {
	  width: auto;
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
	 /deep/ .vue-dialog-button:nth-child(2) {
			background-color: rgba(255,0,0, .8);
			font-size: 16px !important;;
	 }
	 /deep/ .vue-dialog-button:nth-child(1) {
			background-color: #40E1C0;
			font-size: 16px !important;
	 }
	 /deep/ .vue-dialog .dialog-c-text {
			font-size: 16px;
			text-align: center;
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
		padding: 0 15px;
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
