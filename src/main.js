// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import Vuex from 'vuex'
import store from './store'
import 'vue-material-design-icons/styles.css'
import VModal from 'vue-js-modal'
import vuePhoneInput from '@/components/extended/vuePhoneInput'
import VueMq from 'vue-mq'
import GetTextPlugin from 'vue-gettext'
import translations from './translations.json'

Vue.use(GetTextPlugin, {
  availableLanguages: {
    en_US: 'English',
    ru_RU: 'Русский'
  },
  defaultLanguage: 'ru_RU',
  languageVmMixin: {
    computed: {
      currentKebabCase: function () {
        return this.current.toLowerCase().replace('_', '-')
      }
    }
  },
  translations: translations,
  silent: true
})

Vue.use(VueMq, {
  breakpoints: {
    mobile: 480,
    tablet: 768,
    laptop: 1024,
    desktop: Infinity
  }
})

Vue.component('phone-input', vuePhoneInput)

Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultContainerElement: '#content'
})
Vue.use(Vuex)
Vue.use(VModal)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
