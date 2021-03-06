<template>
    <section class="section-ads">
        <b-field horizontal :label="getSubject()" class="align-left">
            <input name="subject"
              class="input"
              :value="subject"
              :maxlength="subjectMaxLength"
              @input="changeField">
            <div class="counter-validation"><b>{{ subjectSignsLeft }}</b> signs left</div>
            <div class="error" v-if="getErrors && getErrors.subject">{{ getErrors.subject[0] }}</div>
        </b-field>

        <b-field horizontal :label="getTopic()" class="align-left">
            <button @click="show" class="field-topic input">
              <input class="topic-span"
              v-if="subcategoryObjState"
              :value="subcategoryObjState.name">
              <img src="../assets/arrow-down-expand.svg" alt="" class="icon-expand-arrow">
            </button>
            <div class="error" v-if="getErrors">{{ getErrors.category }}</div>
            <modal-choose-category :rootCategory="rootCategory"
                                   :fetchSubcategory="fetchSubcategory"
                                   :fetchSubSubCategory="fetchSubSubCategory"
                                   @subcategory="subcategory">
            </modal-choose-category>
        </b-field>
        <b-field horizontal :label="getPrice()" class="align-left field-price">
            <div class="price-wrapper">
                <input name="price"
                  class="input"
                  :value="price"
                  @input="changeField">
                <span class="currency">грн.</span>
            </div>
            <div class="error" v-if="getErrors && getErrors.price">{{ getErrors.price[0] }}</div>
        </b-field>

        <b-field horizontal :label="getDescription()" class="align-left">
            <textarea name="message" id="" cols="30" rows="10" @input="changeField"  :value="message" class="message-field"></textarea>
            <div class="error" v-if="getErrors && getErrors.message">{{ getErrors.message[0] }}</div>
        </b-field>

        <b-field horizontal :label="getPhoto()" class="align-left"></b-field>

        <label id="file-drag-drop">
            <div ref="fileform" class="fileform"
             @drop="onDrop"
             @dragenter="onDragEnter"
             @dragleave="onDragLeave"
             v-bind:class="{highlight: isHighlight}">
                <translate>Click or drop your files here</translate>
                <img src="../assets/cloud-download-interface-symbol.svg" alt="" class="icon-cloud-download">
                <translate class="warning" v-if="warning">Download images with extension jpeg, jpg or png</translate>
            </div>
            <input type="file" class="inputfile" multiple accept="image/*" ref="fileinput">
          </label>

          <div class="wrapper-file-listing">
            <div v-for="(file, key) in files" class="file-listing" @click="makeMainImg(key)">
                  <img class="preview" v-bind:ref="'preview'+ parseInt(key)" :class="{'highlight-main-img': key == selectedImgKey}"/>
                  <div class="remove-container">
                    <a class="remove" v-on:click.stop.prevent="removeFile(key)" href="#">
                      <img src="../assets/icon-close.png" alt="" class="icon-close">
                    </a>
                  </div>
            </div>
          </div>

        <b-field horizontal :label="getPContactInformation()" class="align-left">
            <div  class="contact-info-container">
                <div class="contact-info-field">
                    <translate>Name: </translate>
                    <input name="name"
                           class="input"
                           v-model="firstName"
                           disabled="disabled">
                </div>
                <div class="contact-info-field">
                    <translate>Email: </translate>
                    <input name="email"
                           type="email"
                           v-model="email"
                           disabled="disabled"
                           class="input">
                </div>
                <div class="contact-info-field">
                    <translate>Phone: </translate>
                    <phone-input
                      :phone="phone"
                      class="vue-phone-input"
                      @input="changeField">
                    </phone-input>
                </div>
                <div class="contact-info-field">
                   <translate>Location: </translate>
                   <input name="location"
                         @input="changeField"
                         :value="location"
                         class="input">
                </div>
            </div>
        </b-field>

        <b-field horizontal class="align-center">
            <p class="button-submit-container">
                <button :label="getCreateAd()"
                        :disabled="loading || isDisabled()"
                        class="button-submit"
                        @click="editAd"
                        v-bind:class="{'disabled': loading || isDisabled()}">
                  <i class="fa fa-spinner fa-spin fa-lg fa-fw" v-if="loading"></i>
                  <translate>Edit an ad</translate>
                </button>
            </p>
        </b-field>
    </section>
</template>

<script>
import modalChooseCategory from '@/components/ModalChooseCategory'
import t from 'typy';
import VueLoading from 'vue-simple-loading';

export default {
  components: {
    modalChooseCategory,
    VueLoading
  },
  props: {
    slug: String
  },
  data () {
    return {
      file: '',
      dragAndDropCapable: false,
      files: [],
      isHighlight: false,
      warning: false,
      rootCategory: false,
      selectedImgKey: 0,
      subjectMaxLength: 70
    }
  },
  created () {
    this.$store.dispatch('CLEAR_ERRORS')
    this.$store.dispatch('GET_AD_DETAILS', this.slug)
  },
  mounted () {
    if (!this.$store.getters.getCategories.length) {
      this.$store.dispatch('GET_CATEGORIES')
    }
    this.dragAndDropCapable = this.determineDragAndDropCapable()
    if (this.dragAndDropCapable) {
      ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach( function(evt) {
        this.$refs.fileform.addEventListener(evt, function(e){
          e.preventDefault()
          e.stopPropagation()
        }.bind(this), false)
      }.bind(this))
      this.$refs.fileform.addEventListener('drop', function(e){
        for(let i = 0; i < e.dataTransfer.files.length; i++){
          if (/\.(jpe?g|png|gif)$/i.test(e.dataTransfer.files[i].name)) {
            this.files.push(e.dataTransfer.files[i])
            this.getImagePreviews()
            this.warning = false
          } else {
            this.warning = true
          }
        }
      }.bind(this))
      this.$refs.fileinput.addEventListener('change', function(e){
        for(let i = 0; i < e.target.files.length; i++){
          if (/\.(jpe?g|png|gif)$/i.test(e.target.files[i].name)) {
            this.files.push(e.target.files[i])
            this.getImagePreviews()
            this.warning = false
          } else {
            this.warning = true
          }
        }
      }.bind(this))
    }
  },
  watch: {
    images (newValue) {
      if(newValue) {
        for(let i = 0; i < newValue.length; i++) {
          this.loadXHR(newValue[i]).then((blob) => {
          this.files.push(blob)
            this.getImagePreviews()
          });
        }
      }
    }
  },
  methods: {
    loadXHR(url) {
      return new Promise(function(resolve, reject) {
          try {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url);
              xhr.responseType = "blob";
              xhr.onerror = function() {reject("Network error.")};
              xhr.onload = function() {
                  if (xhr.status === 200) {resolve(xhr.response)}
                  else {reject("Loading error:" + xhr.statusText)}
              };
              xhr.send();
          }
          catch(err) {reject(err.message)}
      });
    },
    isDisabled () {
      return !this.location || !this.subject || !this.message || !this.price || !this.phone.number || ! this.subcategoryObjState.slug
    },
    changeField (input) {
      this.$store.commit('adDetailsFieldMutate', {field: input.target.name, value: input.target.value})
    },
    subcategory (data) {
      this.$store.commit('adDetailsFieldMutate', {field: 'category', value: data})
    },
    makeMainImg (key) {
      this.selectedImgKey = key
    },
    fetchSubcategory (item) {
      this.rootCategory = false
      this.$store.dispatch('GET_CATEGORIES', {category: item, isLeafNode: false})
    },
    fetchSubSubCategory (category) {
      this.$store.dispatch('GET_CATEGORIES', {category: category.slug, isLeafNode: false})
      this.category = category
    },
    show () {
      this.rootCategory = true
      this.$store.dispatch('GET_CATEGORIES')
      this.$modal.show('choose-category')
    },
    determineDragAndDropCapable () {
       var div = document.createElement('div')
       return ( ( 'draggable' in div )
          || ( 'ondragstart' in div && 'ondrop' in div ) )
          && 'FormData' in window
          && 'FileReader' in window
    },
    getImagePreviews () {
      for (let i = 0; i < this.files.length; i++){
        let reader = new FileReader()
        reader.addEventListener("load", function (e) {
          this.$refs['preview' + parseInt(i)][0].src = reader.result
        }.bind(this), false)
        reader.readAsDataURL(this.files[i])
      }
    },
    removeFile (key) {
      this.files.splice(key, 1)
      this.getImagePreviews ()
    },
    onDragEnter () {
      this.isHighlight = true
    },
    onDragLeave () {
      this.isHighlight = false
    },
    onDrop () {
      this.isHighlight = false
    },
    editAd () {
      var formData = new FormData()
      if (this.files.length) {
        let a = this.files.splice(this.selectedImgKey, 1)
        this.files.unshift(a[0])
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i]
          formData.append('files[' + i + ']', file)
        }
      }
      formData.append('category', this.subcategoryObjState.slug)
      formData.append('subject', this.subject)
      formData.append('message', this.message)
      formData.append('location', this.location)
      formData.append('price', this.price)
      formData.append('phone', this.phone.number)
      this.$store.dispatch('EDIT_AD', {slug: this.slug, form: formData})
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
    images () {
      return this.$store.getters.getAdDetails.images
    },
    subjectSignsLeft () {
      if(this.subject) {
        return this.subjectMaxLength - this.subject.length
      }
      return this.subjectMaxLength
    },
    subject () {
      return this.$store.getters.getAdDetails.subject
    },
    subcategoryObjState () {
      return this.$store.getters.getAdDetails.category
    },
    price () {
      return this.$store.getters.getAdDetails.price
    },
    message () {
      return this.$store.getters.getAdDetails.message
    },
    phone () {
      return {number: t(this.$store.getters.getAdDetails, 'phone').safeObject || '', code: ''}
    },
    loading () {
      return this.$store.getters.getEditAdLoading
    },
    getErrors () {
      return this.$store.getters.getErrors
    },
    categories () {
      return this.$store.getters.getCategories.results
    },
    firstName () {
      return this.$store.getters.getUserDetails.first_name
    },
    email () {
      return this.$store.getters.getUserDetails.email
    },
    location () {
      return this.$store.getters.getAdDetails.location
    }
  }
}
</script>

<style scoped lang="scss">
  .section-ads {
    margin-top: 70px;
    width: 550px;
    outline: none;
    margin-left: auto;
    margin-right: auto;
  .message-field {
      padding: calc(0.625em - 1px);
      box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
      border-radius: 3px;
      border: 1px solid #dbdbdb;
    }
    .error {
      color: red;
      font-size: 12px;
    }
    .field-topic {
      position: relative;
      width: 200px;
      padding-right: 30px;
      .topic-span {
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
        height: auto;
        border: none;
      }
      .icon-expand-arrow {
        width: 15px;
        height: 15px;
        position: absolute;
        right: 10px;
      }
    }
    /deep/ .field {
      flex-direction: column;
      .counter-validation {
        color: #A6A6A6;
        font-size: 12px;
        margin-top: 2px;
      }
    }
    #file-drag-drop {
      cursor: pointer;
      position: relative;
      width: 100%;
      .fileform {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        height: 70px;
        background: #f4f4f4;
        border-radius: 4px;
        border: 2px dashed #ccc;
        margin-bottom: 10px;
        .icon-cloud-download {
          width: 40px;
          height: 40px;
          margin-left: 10px;
        }
        .warning {
          width:100%;
          color: red;
          line-height: 16px;
          font-size: 12px;
          text-align: center;
          margin-bottom: 10px;
        }
      }
      .inputfile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
        top: 100%;
        left: 0;
      }
    }
    .wrapper-file-listing {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin-bottom: 7px;
      .file-listing{
        width: 100px;
        margin: 5px;
        border-bottom: 1px solid #ddd;
        position: relative;
        & img {
          height: 100px;
          width: 100px;
          cursor: pointer;
        }
        .remove-container {
          position: absolute;
          top: 0;
          right: 0;
          z-index: 100;
          width: 16px;
          height: 16px;
          .icon-close {
            width: 16px;
            height: 16px;
            position: absolute;
            top: 3px;
            right: 3px;
          }
        }
      }
    }
    .highlight-main-img {
      outline: 2px solid rgba(121,87,213,1);
      outline-offset: 2px;
    }
    .highlight {
      border: 2px dashed #7957d5 !important;
      background-color: #fff !important;
    }
    .align-left {
      /deep/ label {
        text-align: left;
        padding: 0;
        color: #3A474D;
        font-weight: 600;
        font-size: 18px;
      }
    }
    .field-price {
      width: 200px;
    }
    .price-wrapper {
      display: flex;
      position: relative;
        .currency {
          position: absolute;
          right: -40px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 18px;
        }
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
     /deep/ .intl-phone-input {
        width: 400px;
    }
    .contact-info-container /deep/ input {
        width: 400px;
        height: 30px;
        border: 1px solid rgba(128,128,128,.5);
    }
    .button-submit {
        width: 145px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(123, 79, 173, 0.7);
        border: solid rgba(255, 255, 255, 1) 1px;
        cursor: pointer;
        transition: border-color 0.4s ease 0s, background-color 0.4s ease 0s;
        text-transform: uppercase;
        font-weight: 400;
        font-size: 14px;
        color: #fff;
        border-radius: 5px;
        margin: 20px auto;
        &:hover {
          background-color: #F4F4F4;
          border-color: #8c40b8;
          color: #8c40b8;
        }
        &.disabled {
          cursor: not-allowed;
        }
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
    textarea:focus,
    textarea:active {
      border-color: #7957d5;
      box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);
    }
    /deep/ .help.counter {
      display: none;
    }
  }
   @media screen and (max-width:575px){
    .section-ads {
      padding: 0 20px;
      width: 100%;
      .contact-info-field {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .field-topic {
        width: 100%;
      }
      .field-topic {
        width: 100%;
      }
      .contact-info-container /deep/ input {
        width: 100%;
      }
      /deep/ .intl-phone-input {
        width: 100%;
      }
      #file-drag-drop {
        cursor: pointer;
        position: relative;
        width: 100%;
        .fileform {
          span {
            font-size: 13px;
          }
        }
      }
    }
  }
</style>
