<template>
  <div class="intl-phone-input allow-dropdown" v-on:mouseleave="hideList" >
    <div class="flag-container" v-on:click.stop="toggeList">

      <div class="selected-flag">
        <div v-bind:class="`iti-flag ${countryCode}`"></div>
        <div v-bind:class="`iti-arrow${isVisiblePanel && editable ? ' up' : ''}`"></div>
      </div>

      <ul class="country-list" v-if="isVisiblePanel && editable">
        <li
          v-for="item in itemsData.frontItems"
          v-bind:class="`country${item.code === countryCode ? ' highlight' : ''}`"
          v-on:click.stop="setCode(item.code)">
          <div class="flag-box">
            <div v-bind:class="`iti-flag ${item.code}`"></div>
          </div>
          <span class="country-name">{{ item.name }}</span>
          <span class="dial-code">+{{ item.dialCode }}</span>
        </li>
        <li class="divider" v-if="itemsData.needSeparator"></li>
        <li
          v-for="item in itemsData.otherItems"
          v-bind:class="`country${item.code === countryCode ? ' highlight' : ''}`"
          v-on:click.stop="setCode(item.code)">
          <div class="flag-box">
            <div v-bind:class="`iti-flag ${item.code}`"></div>
          </div>
          <span class="country-name">{{ item.name }}</span>
          <span class="dial-code">+{{ item.dialCode }}</span>
        </li>
      </ul>
    </div>
    <input type="text"
      id="phone"
      v-on:input="handleChangePhoneNumber"
      class="input-text"
      autocomplete="off"
      v-bind:name="name"
      v-model="phone.number"
      v-bind:class="{'input-danger': phoneErrors}"
    />
  </div>
</template>

<script>
  import PhoneInput from 'vue2-phone-input'
  export default {
    extends: PhoneInput,
    mounted () {
      this.inited = false;
      this.setCode(this.defaultCode)
    },
    watch: {
      'intlData.dialCode': function () {
        if(this.inited) {
          this.initPhoneNumber()
        }
        this.inited = true;
      }
    },
    props: {
      defaultCode: {type: String, default: 'ua'},
      editable: {type: Boolean, default: true},
      phoneErrors: String
    },
    methods: {
      handleChangePhoneNumber (event) {
        var regex = new RegExp('^\\+' + this.intlData.dialCode + '-')
//        if (!regex.test(event.target.value)) {
//          this.phone.number = `+${this.intlData.dialCode}-`
//        }
        this.$store.commit('adDetailsFieldMutate', {field: "phone", value: event.target.value})
      },
      initPhoneNumber () {
//        this.phone.number = `+${this.intlData.dialCode}-`
      }
    }
  }
</script>

