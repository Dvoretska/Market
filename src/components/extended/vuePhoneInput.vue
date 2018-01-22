<template>
  <div
    class="intl-phone-input allow-dropdown"
    v-on:mouseleave="hideList"
  >
    <div
      class="flag-container"
      v-on:click.stop="toggeList"
    >
      <div class="selected-flag">
        <div v-bind:class="`iti-flag ${countryCode}`"></div>
        <div v-bind:class="`iti-arrow${isVisiblePanel ? ' up' : ''}`"></div>
      </div>
      <ul class="country-list" v-if="isVisiblePanel">
        <li
          v-for="item in itemsData.frontItems"
          v-bind:class="`country${item.code === countryCode ? ' highlight' : ''}`"
          v-on:click.stop="setCode(item.code)"
        >
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
          v-on:click.stop="setCode(item.code)"
        >
          <div class="flag-box">
            <div v-bind:class="`iti-flag ${item.code}`"></div>
          </div>
          <span class="country-name">{{ item.name }}</span>
          <span class="dial-code">+{{ item.dialCode }}</span>
        </li>
      </ul>
    </div>
    <input type="text"
      autocomplete="off"
      v-bind:name="name"
      v-on:input="handleChangePhoneNumber"
      v-bind:value="phone.number"
      @keyup="changeCountry"
      v-bind:placeholder="intlData.example"
    />
  </div>
</template>

<script>
import PhoneInput from 'vue2-phone-input'

export default {
  extends: PhoneInput,
  created () {
    this.setCode('ua')
  }
}
</script>
