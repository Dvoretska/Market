import axios from 'axios'
import router from '../router/index.js'

const MAIN_URL = 'https://servermarket.herokuapp.com/'
// const MAIN_URL = '//localhost:8000/'
const ACCOUNTS_URL = `${MAIN_URL}accounts/`

export default {
  LOGIN: function (context, data) {
    context.commit('loading', true)
    axios.post(`${ACCOUNTS_URL}login`, {
      email: data.email,
      password: data.password
    }).then((response) => {
      context.commit('success', response.data)
      context.commit('loading', false)
      context.commit('createUserState', response.data.user)
      localStorage.setItem('token', response.data.token)
      router.push({name: 'home'})
    }).catch((err) => {
      context.commit('loading', false)
      context.commit('error', err.response.data)
    })
  },
  SIGNUP: function (context, data) {
    context.commit('loading', true)
    axios.post(`${ACCOUNTS_URL}signup`, {
      email: data.email,
      password1: data.password1,
      password2: data.password2
    }).then((response) => {
      context.commit('success', response.data)
      context.commit('loading', false)
      context.commit('createUserState', response.data.user)
      localStorage.setItem('token', response.data.token)
      router.push({name: 'home'})
    }, (err) => {
      context.commit('error', err.response.data)
      context.commit('loading', false)
    })
  },
  CLEAR_ERRORS: function (context) {
    context.commit('clear_errors')
  },
  LOGOUT: function (context) {
    localStorage.removeItem('token')
    router.push({name: 'login'})
    window.location.reload()
  },
  CHANGE_USER_DETAILS: function (context, data) {
    const TOKEN = localStorage.getItem('token')
    context.commit('loading', true)
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
      context.commit('updateUserState', response.data)
      context.commit('loading', false)
    }).catch((err) => {
      console.log(err)
    })
  },
  GET_COUNTRIES: function (context, callback) {
    axios.get(`${MAIN_URL}location/countries/`).then((response) => {
      callback(response.data)
    }).catch((err) => {
      console.log(err)
    })
  },
  GET_CITIES: function (context, {code, callback}) {
    axios.get(`${MAIN_URL}location/${code}/cities/`).then((response) => {
      callback(response.data)
    }).catch((err) => {
      console.log(err)
    })
  },
  GET_CATEGORIES: function (context) {
    const TOKEN = localStorage.getItem('token')
    axios.get(`${MAIN_URL}categories/`,
      {
        headers: {
          authorization: `jwt ${TOKEN}`
        }
      }).then((response) => {
        context.commit('getCategories', response.data)
      }).catch((err) => {
        console.log(err)
      })
  },
  TOKEN_VERIFY: function (context, next) {
    const TOKEN = localStorage.getItem('token')
    if (TOKEN) {
      axios.post(`${ACCOUNTS_URL}api-token-verify/`,
        {token: TOKEN}, {
          headers: {
            authorization: `jwt ${TOKEN}`
          }
        }).then((response) => {
          context.commit('createUserState', response.data.user)
          if (next) next()
        }).catch((err) => {
          console.log(err)
          localStorage.removeItem('token')
          context.commit('clearUserState')
          router.push({name: 'login'})
        })
    }
  },
  CREATE_AD: function (context, data) {
    const TOKEN = localStorage.getItem('token')
    context.commit('loading', true)
    axios.post(`${MAIN_URL}ads/ad/`, data, {
      headers: {
        authorization: `jwt ${TOKEN}`
      }
    }).then((response) => {
      context.commit('loading', false)
      router.push({name: 'home'})
    }).catch((err) => {
      console.log(err)
      context.commit('loading', false)
    })
  },
  GET_PRODUCT_LIST: function (context, pageNum = 1) {
    context.commit('productsMutate', {loading: true})
    axios.get(`${MAIN_URL}ads/`,
      {
        params: {
          page: pageNum
        }
      }).then((response) => {
        response.data.loading = false
        context.commit('productsMutate', response.data)
      }).catch((err) => {
        console.log(err)
      })
  },
  GET_MY_ADS: function (context) {
    const TOKEN = localStorage.getItem('token')
    context.commit('myAdsMutate', {loading: true})
    axios.get(`${MAIN_URL}my/ads/`,
      {
        headers: {
          authorization: `jwt ${TOKEN}`
        }
      }).then((response) => {
        response.data.loading = false
        context.commit('myAdsMutate', response.data)
      }).catch((err) => {
        console.log(err)
      })
  }
}
