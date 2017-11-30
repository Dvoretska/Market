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
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userDetails', JSON.stringify(response.data.user))
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
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('userDetails', JSON.stringify(response.data.user))
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
    }
  }
})

export default store
