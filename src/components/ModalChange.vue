<template>
	<modal name="profileChange" :height="250" :width="400">
	<i class="fa fa-window-close fa-lg close-button" aria-hidden="true" @click="closeModal()"></i>
	<div class="fill-info-container">
	   <div class="fill-info-fields">
		<label>
		  <span>First name:</span>
		  <br>
		  <input type="text" v-model="firstName">
		</label>
	   </div>
	   <div class="fill-info-fields">
		<label>
		  <span>Last name:</span>
		  <br>
		  <input type="text" v-model="lastName">
		</label>
	   </div>
	  <button-bar :label="'Save'" class="save-button" :click="getProfileName"></button-bar>
	  </div>
	</modal>
</template>

<script>
import buttonBar from '@/components/ButtonBar'

export default {
  components: {
    buttonBar
  },
  data () {
    return {
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName')
    }
  },
  methods: {
    closeModal () {
      this.$modal.hide('profileChange')
    },
    getProfileName () {
      localStorage.setItem('firstName', this.firstName)
      localStorage.setItem('lastName', this.lastName)
      this.closeModal()
    }
  }
}
</script>

<style scoped>
  .close-button {
    float: right;
    margin: 7px;
    color: red;
    cursor: pointer;
  }
  .save-button {
  	letter-spacing: 1.3px;
  	margin: 10px 20px 0 20px;
  }
  .fill-info-fields {
  	padding: 5px 20px;
  }
  .fill-info-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .fill-info-fields input {
    height: 30px;
  }
</style>