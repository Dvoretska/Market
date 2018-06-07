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
import Paginate from 'vuejs-paginate'
import VueTree from 'liquor-tree'
import serviceLanguage from './services/language.js'
import moment from "moment"
import VueMomentJS from "vue-momentjs"
import vueScrollTo from 'vue-scroll-to'
import VueLocalStorage from 'vue-localstorage'
 
Vue.use(VueLocalStorage)

Vue.use(vueScrollTo);
Vue.use(VueMomentJS, moment);
Vue.use(VueTree)
Vue.use(GetTextPlugin, {
  availableLanguages: {
    en_US: 'English',
    ru_RU: 'Русский'
  },
  defaultLanguage: serviceLanguage.locale,
  languageVmMixin: {
    computed: {
      currentKebabCase: function () {
        return this.current.toLowerCase().replace('_', '-')
      }
    }
  },
  translations: translations,
  silent: true
});

Vue.use(VueMq, {
  breakpoints: {
    mobile: 320,
    tablet: 768,
    laptop: 1024,
    desktop: Infinity
  }
})

Vue.component('paginate', Paginate)
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
