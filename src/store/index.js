import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const ACCOUNTS_URL = 'https://servermarket.herokuapp.com/accounts/'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loginResponse: {
      success: null, errors: null
    },
    signupResponse: {
      success: null, errors: null
    }
  },
  actions: {
    LOGIN: function (commit, data) {
      axios.post(`${ACCOUNTS_URL}login`, {
        email: data.email,
        password: data.password
      }).then((response) => {
        store.commit('login', response.data)
      }, (err) => {
        store.commit('loginErrors', err.response.data)
      })
    },
    SIGNUP: function (commit, data) {
      axios.post(`${ACCOUNTS_URL}signup`, {
        email: data.email,
        password1: data.password1,
        password2: data.password2
      }).then((response) => {
        store.commit('signup', response.data)
      }, (err) => {
        store.commit('signupError', err.response.data)
      })
    }
  },
  mutations: {
    login (state, data) {
      state.loginResponse = data
      console.log(state.loginResponse)
    },
    loginErrors (state, data) {
      state.loginResponse.errors = data
    },
    signup (state, data) {
      state.signupResponse.success = data
      console.log(state.signupResponse)
    },
    signupError (state, data) {
      state.signupResponse.errors = data
    }
  },
  getters: {
    getLoginResponse: state => {
      return state.loginResponse
    },
    getLoginErrors: state => {
      return state.loginResponse.errors
    },
    getSignupResponse: state => {
      return state.signupResponse
    },
    getSignupErrors: state => {
      return state.signupResponse.errors
    }
  }
})

export default store
