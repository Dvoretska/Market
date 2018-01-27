import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index.js'

const ACCOUNTS_URL = 'https://servermarket.herokuapp.com/accounts/'
const MAIN_URL = 'https://servermarket.herokuapp.com/'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    responseState: {
      success: null, errors: null, loading: null
    },
    userDetailsState: {},
    categories: []
  },
  actions: {
    LOGIN: function (commit, data) {
      store.commit('loading', true)
      axios.post(`${ACCOUNTS_URL}login`, {
        email: data.email,
        password: data.password
      }).then((response) => {
        store.commit('success', response.data)
        store.commit('loading', false)
        store.commit('createUserState', response.data.user)
        localStorage.setItem('token', response.data.token)
        router.push({name: 'home'})
      }, (err) => {
        store.commit('error', err.response.data)
        store.commit('loading', false)
      })
    },
    SIGNUP: function (commit, data) {
      store.commit('loading', true)
      axios.post(`${ACCOUNTS_URL}signup`, {
        email: data.email,
        password1: data.password1,
        password2: data.password2
      }).then((response) => {
        store.commit('success', response.data)
        store.commit('loading', false)
        store.commit('createUserState', response.data.user)
        localStorage.setItem('token', response.data.token)
        router.push({name: 'home'})
      }, (err) => {
        store.commit('error', err.response.data)
        store.commit('loading', false)
      })
    },
    CLEAR_ERRORS: function (commit) {
      store.commit('clear_errors')
    },
    LOGOUT: function () {
      localStorage.removeItem('token')
      store.commit('clearUserState')
      router.push({name: 'login'})
    },
    CHANGE_USER_DETAILS: function (commit, data) {
      const TOKEN = localStorage.getItem('token')
      store.commit('loading', true)
      axios.put(`${ACCOUNTS_URL}profile/`, {
        first_name: data.first_name,
        last_name: data.last_name,
        country: data.country,
        city: data.city
      }, {
        headers: {
          authorization: `jwt ${TOKEN}`
        }
      }).then((response) => {
        store.commit('updateUserState', response.data)
        store.commit('loading', false)
      }).catch((err) => {
        console.log(err)
      })
    },
    GET_COUNTRIES: function (commit, callback) {
      axios.get(`${MAIN_URL}location/countries/`).then((response) => {
        callback(response.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    GET_CITIES: function (commit, {code, callback}) {
      axios.get(`${MAIN_URL}location/${code}/cities/`).then((response) => {
        callback(response.data)
        console.log(response.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    GET_CATEGORIES: function (commit) {
      const TOKEN = localStorage.getItem('token')
      axios.get(`${MAIN_URL}ads/categories/`,
        { headers: {
          authorization: `jwt ${TOKEN}`
        }
        }).then((response) => {
          store.commit('getCategories', response.data)
        }).catch((err) => {
          console.log(err)
        })
    },
    TOKEN_VERIFY: function (commit, next) {
      const TOKEN = localStorage.getItem('token')
      axios.post(`${ACCOUNTS_URL}api-token-verify/`,
      { token: TOKEN }, {
        headers: {
          authorization: `jwt ${TOKEN}`
        }
      }).then((response) => {
        store.commit('createUserState', response.data.user)
        if (next) next()
      }).catch((err) => {
        console.log(err)
        localStorage.removeItem('token')
        store.commit('clearUserState')
        router.push({name: 'login'})
      })
    }
  },
  mutations: {
    success (state, data) {
      state.responseState.success = data
    },
    error (state, data) {
      state.responseState.errors = data
    },
    clear_errors (state) {
      state.responseState.errors = null
    },
    loading (state, data) {
      state.responseState.loading = data
    },
    createUserState (state, user) {
      state.userDetailsState = user
    },
    updateUserState (state, data) {
      state.userDetailsState = {
        ...state.userDetailsState,
        first_name: data.first_name,
        last_name: data.last_name,
        country: data.country,
        city: data.city
      }
    },
    clearUserState (state) {
      state.userDetailsState = {}
    },
    getCategories (state, data) {
      state.categories = data
    }
  },
  getters: {
    getSuccess: state => {
      return state.responseState.success
    },
    getErrors: state => {
      return state.responseState.errors
    },
    getLoading: state => {
      return state.responseState.loading
    },
    getUserDetails: state => {
      return state.userDetailsState
    },
    getCategories: state => {
      return state.categories
    }
  }
})

export default store
