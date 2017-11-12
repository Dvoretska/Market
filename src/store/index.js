import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loginResponse: null
  },
  actions: {
    LOGIN: function (commit, data) {
      console.log(data)
      axios.post('https://servermarket.herokuapp.com/accounts/login', {
        email: data.email,
        password: data.password
      }).then((response) => {
        store.commit('login', response)
      }, (err) => {
        store.commit('login', null)
        console.log(err)
      })
    }
  },
  mutations: {
    login (state, response) {
      state.loginResponse = response
      console.log(state.loginResponse)
    }
  },
  getters: {
    getLoginResponse: state => {
      return state.loginResponse
    }
  }
})

export default store
