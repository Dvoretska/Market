<template>
    <section class="ads">
        <b-field horizontal label="Subject">
            <b-input name="subject" expanded></b-input>
        </b-field>

        <b-field horizontal label="Topic" class="topic-in-ads">
            <b-select placeholder="Select a topic">
                <option value="1">Bulma</option>
                <option value="2">Vue.js</option>
                <option value="3">Buefy</option>
            </b-select>
        </b-field>
       <b-field horizontal label="Contact information">
        <div  class="contact-info-container">
            <div class="contact-info-field">
                <span>Name: </span><b-input name="name" expanded v-model="firstName" disabled="disabled"></b-input>
            </div>
            <div class="contact-info-field">
                <span>Email: </span><b-input name="email" type="email" expanded v-model="email" disabled="disabled"></b-input>
            </div>
            <div class="contact-info-field">
                <span>Phone: </span><phone-input :phone="phone" class="vue-phone-input"></phone-input>
            </div>
            <div class="contact-info-field">
                <span>Location: </span><b-input name="location" expanded  v-model="location"></b-input>
            </div>
        </div>
        </b-field>

        <b-field horizontal label="Message">
            <b-input type="textarea"></b-input>
        </b-field>

        <b-field horizontal>
            <p class="control">
                <button-bar :label="'Create an ad'" class="button-anim-ads"></button-bar>
            </p>
        </b-field>

    </section>
</template>

<script>

import buttonBar from '@/components/ButtonBar'

export default {
  components: {
    buttonBar
  },
  data () {
    return {
      phone: {
        code: '',
        number: ''
      }
    }
  },
  computed: {
    firstName () {
      return this.$store.getters.getUserDetails.first_name
    },
    email () {
      return this.$store.getters.getUserDetails.email
    },
    location () {
      return this.$store.getters.getUserDetails.country + ', ' + this.$store.getters.getUserDetails.city
    }
  }
}
</script>

<style scoped>
    .ads {
        border-radius: 10px;
        border: 1px solid rgba(128,128,128,.5);
        background-color: #f4f4f4;
        color: #3A474D;
        padding: 10px 20px;
        font: 500 16px 'TradeGothicLTStd-BdCn20','PT Sans Narrow';
        -webkit-box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
        position: absolute;
        left: 50%;
        top: 11%;
        width: 550px;
        transform: translateX(-50%);
    }
    .contact-info-container /deep/ label  {
        display: block;
    }
    .contact-info-field {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }
    .contact-info-field /deep/ .control {
        display: inline-block;
    }
    .contact-info-container /deep/ input {
        width: 420px;
        height: 30px;
    }
    /deep/ .intl-phone-input {
        width: 420px;
    }
    .contact-info-container /deep/ input {
        border: 1px solid rgba(128,128,128,.5); 
    }
    .button-anim-ads /deep/ span {
        background-color: #7957d5 !important;
    }
    .button-anim-ads {
        margin-bottom: 7px;
        margin-top: 4px;
    }
    /deep/ .input:hover  {
        border-color: #b5b5b5;  
    }
    /deep/ .input:focus, .input:active,
    .textarea:focus,
    .textarea:active {
      border-color: #7957d5;
      -webkit-box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);
              box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);
    }
</style>
