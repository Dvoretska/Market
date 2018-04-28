<template>
    <section class="section-ads">
        <b-field horizontal :label="getSubject()" class="align-left">
            <b-input name="subject" expanded v-model="subject"></b-input>
            <div class="counter-validation"><b>70 </b>signs left</div>
        </b-field>

        <b-field horizontal :label="getTopic()" class="align-left">
            <button @click="show" class="field-topic input">
              <span class="topic-span">{{ category.name }}</span>
              <img src="../assets/arrow-down-expand.svg" alt="" class="icon-expand-arrow">
            </button>
            <modal-choose-category :rootCategory="rootCategory" :fetchSubcategory="fetchSubcategory" :fetchSubSubCategory="fetchSubSubCategory"></modal-choose-category>
        </b-field>
        <b-field horizontal :label="getPrice()" class="align-left field-price">
            <b-input name="price" expanded v-model="price"></b-input>
        </b-field>

        <b-field horizontal :label="getDescription()" class="align-left">
            <b-input type="textarea" v-model="message"></b-input>
            <div class="counter-validation"><b>4000 </b>signs left</div>
        </b-field>

        <b-field horizontal :label="getPhoto()" class="align-left">
        </b-field>

        <label id="file-drag-drop">
            <div ref="fileform" class="fileform"
             @drop="onDrop"
             @dragenter="onDragEnter"
             @dragleave="onDragLeave"
             v-bind:class="{highlight: isHighlight}">
                <span>Click or drop your files here</span>
                <img src="../assets/cloud-download-interface-symbol.svg" alt="" class="icon-cloud-download">
                <span class="warning" v-if="warning">Download images with extansion jpeg, jpg or png</span>
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
import modalChooseCategory from '@/components/ModalChooseCategory'

export default {
  components: {
    buttonBar,
    modalChooseCategory
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
      file: '',
      dragAndDropCapable: false,
      files: [],
      isHighlight: false,
      warning: false,
      rootCategory: true,
      selectedImgKey: 0
    }
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
  methods: {
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
      this.$modal.show('choose-category')
      this.$store.dispatch('GET_CATEGORIES')
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
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          let reader = new FileReader()
          reader.addEventListener("load", function (e) {
            this.$refs['preview' + parseInt(i)][0].src = reader.result
          }.bind(this), false)
          reader.readAsDataURL(this.files[i])
        }
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
    createAd () {
      var formData = new FormData()
      if (this.files.length) {
        let a = this.files.splice(this.selectedImgKey, 1)
        this.files.unshift(a[0])
        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i]
          formData.append('files[' + i + ']', file)
        }
      }
      formData.append('category', this.category.slug)
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
      return this.$store.getters.getCategories.results
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
  .section-ads {
    margin-top: 70px;
    width: 550px;
    outline: none;
    margin-left: auto;
    margin-right: auto;
    .field-topic {
      position: relative;
      width: 200px;
      padding-right: 20px;
      .topic-span {
        font-size: 14px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: inline-block;
        height: auto;
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
      }
    }
    #file-drag-drop {
      cursor: pointer;
      position: relative;
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
        width: 420px;
    }
    .contact-info-container /deep/ input {
        width: 420px;
        height: 30px;
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
    p.control {
      text-align: center;
    }
  }
</style>
