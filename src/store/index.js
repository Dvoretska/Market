import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index.js'

const ACCOUNTS_URL = 'https://servermarket.herokuapp.com/accounts/'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    responseState: {
      success: null, errors: null, loading: null
    },
    userDetailsState: {
      username: null, email: null, first_name: null, last_name: null
    }
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
        localStorage.setItem('userDetails', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        store.commit('updateUserDetails')
        router.push('/')
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
        localStorage.setItem('userDetails', JSON.stringify(response.data.user))
        localStorage.setItem('token', response.data.token)
        store.commit('updateUserDetails')
        router.push('/')
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
      localStorage.removeItem('userDetails')
      router.push('/login')
    },
    UPDATE_USER_DETAILS: function () {
      store.commit('updateUserDetails')
    },
    CHANGE_USER_DETAILS: function (commit, data) {
      const USER_ID = JSON.parse(localStorage.getItem('userDetails')).pk
      const TOKEN = localStorage.getItem('token')
      store.commit('loading', true)
      axios.put(`${ACCOUNTS_URL}profile/${USER_ID}`, {
        first_name: data.firstName,
        last_name: data.lastName
      }, {
        headers: {
          authorization: `jwt ${TOKEN}`
        }
      }).then((response) => {
        let userDetails = JSON.parse(localStorage.getItem('userDetails'))
        userDetails.first_name = response.data.first_name
        userDetails.last_name = response.data.last_name
        localStorage.setItem('userDetails', JSON.stringify(userDetails))
        store.commit('updateUserDetails')
        store.commit('loading', false)
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
    updateUserDetails (state) {
      const USER = JSON.parse(localStorage.getItem('userDetails'))
      state.userDetailsState = {
        username: USER.username,
        email: USER.email,
        first_name: USER.first_name,
        last_name: USER.last_name
      }
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
    }
  }
})

export default store
