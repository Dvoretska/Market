<template>
    <section class="ads">
        <b-field horizontal :label="getSubject()" class="align-left">
            <b-input name="subject" expanded v-model="subject"></b-input>
        </b-field>

        <b-field horizontal :label="getTopic()" class="align-left">
            <b-select placeholder="Select a topic" v-model="category">
                <option v-for="category in categories" class="categories">{{ category }}</option>
            </b-select>
        </b-field>
        <b-field horizontal :label="getPrice()" class="align-left price">
            <b-input name="price" expanded v-model="price"></b-input>
        </b-field>

        <b-field horizontal :label="getDescription()" class="align-left">
            <b-input type="textarea" v-model="message"></b-input>
        </b-field>

        <b-field horizontal :label="getPhoto()" class="align-left">
          <div>
            <input type="file" @change="onFile($event)" ref="file" accept="image/*" multiple>
          </div>
        </b-field>

        <b-field horizontal :label="getPContactInformation()" class="align-left">
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

        <b-field horizontal class="align-center">
            <p class="control">
                <button-bar :label="getCreateAd()" class="button-anim-ads" :click="createAd"></button-bar>
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
      },
      message: '',
      subject: '',
      category: '',
      price: '',
      file: ''
    }
  },
  mounted () {
    if (!this.$store.getters.getCategories.length) {
      this.$store.dispatch('GET_CATEGORIES')
    }
  },
  methods: {
    createAd () {
      var formData = new FormData()
      formData.append('image', this.file)
      formData.append('category', this.category)
      formData.append('subject', this.subject)
      formData.append('message', this.message)
      formData.append('location', this.location)
      formData.append('price', this.price)
      this.$store.dispatch('CREATE_AD', formData)
    },
    onFile (e) {
      this.file = this.$refs.file.files[0]
    },
    getSubject () {
      return this.$gettext('Subject')
    },
    getTopic () {
      return this.$gettext('Topic')
    },
    getPrice () {
      return this.$gettext('Price')
    },
    getDescription () {
      return this.$gettext('Description')
    },
    getPhoto () {
      return this.$gettext('Photo')
    },
    getPContactInformation () {
      return this.$gettext('Contact information')
    },
    getCreateAd () {
      return this.$gettext('Create an ad')
    }
  },
  computed: {
    categories () {
      return this.$store.getters.getCategories
    },
    firstName () {
      return this.$store.getters.getUserDetails.first_name
    },
    email () {
      return this.$store.getters.getUserDetails.email
    },
    country () {
      return this.$store.getters.getUserDetails.country
    },
    city () {
      return this.$store.getters.getUserDetails.city
    },
    location () {
      return this.country + ', ' + this.city
    }
  }
}
</script>

<style scoped lang="scss">
    .align-left {
      /deep/ label {
        text-align: left;
        padding: 0;
        color: #3A474D;
        font-weight: 600;
        font-size: 18px;
      }
    }
    .align-center /deep/ .control {
        text-align: center;
    }
    .ads {
        margin-top: 70px;
        width: 550px;
        outline: none;
        margin-left: auto;
        margin-right: auto;
    }
    .price {
      width: 146px;
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
    .button-anim-ads {
        margin-bottom: 7px;
        margin-top: 6px;
    }
    /deep/ .input:hover  {
        border-color: #b5b5b5;
    }
    /deep/ .input:focus, .input:active,
    .textarea:focus,
    .textarea:active {
      border-color: #7957d5;
      box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);
    }
</style>
