import axios from 'axios'
import router from '../router/index.js'
import serviceLanguage from '../services/language.js'

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
      router.push({name: 'ads-list'})
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
      router.push({name: 'ads-list'})
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
        authorization: `jwt ${TOKEN}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      context.commit('loading', false)
      router.push({name: 'ads-list'})
    }).catch((err) => {
      context.commit('loading', false)
      context.commit('error', err.response.data)
    })
  },
  GET_MY_ADS: function (context, data) {
    const TOKEN = localStorage.getItem('token')
    context.commit('myAdsMutate', {loading: true})
    axios.get(`${MAIN_URL}my/ads/`,
      {
        params: data,
        headers: {
          authorization: `jwt ${TOKEN}`,
          'Accept-Language': serviceLanguage.language
        }
      }).then((response) => {
        response.data.loading = false
        context.commit('myAdsMutate', response.data)
      }).catch((err) => {
        console.log(err)
      })
  },
  GET_CATEGORIES: function (context, data) {
    context.commit('loading', true)
    if (data === undefined || data.isLeafNode === false) {
      context.commit('categoriesStaleMutate');
      context.commit('categoriesMutate', {loading: true});
      const payload = data && data.category ? {category: data.category} : '';
      axios.get(`${MAIN_URL}categories/`, {
        params: payload,
        headers: {'Accept-Language': serviceLanguage.language}
      })
        .then((response) => {
          if (response.data.results && response.data.results.length) {
            response.data.loading = false;
            context.commit('loading', false);
            context.commit('categoriesMutate', response.data);
            if (data) {
              context.commit('activeFiltersSearchMutate', {category: data.category});
            }
          } else {
            context.commit('categoriesMutate', {loading: false});
          }
        }).catch((err) => {
        console.log(err)
      })
    }
  },
  GET_FILTERED_CATEGORIES: function (context, data) {
    context.commit('loading', true);
    context.commit('categoriesStaleMutate');
    context.commit('categoriesMutate', {loading: true});
    axios.get(`${MAIN_URL}categories/`, {
      params: data,
      headers: {'Accept-Language': serviceLanguage.language}
    })
      .then((response) => {
        if (response.data.results && response.data.results.length) {
          response.data.loading = false;
          context.commit('loading', false);
          context.commit('categoriesMutate', response.data);
          if (data) {
            context.commit('activeFiltersSearchMutate', {category: data.category});
          }
        } else {
          context.commit('categoriesMutate', {loading: false});
        }
      }).catch((err) => {
      console.log(err)
    })
  },
  GET_FILTERED_AD_LIST: function (context, data) {
    context.commit('adsMutate', {loading: true})
    router.push({name: 'ads-list', query: data})
    axios.get(`${MAIN_URL}ads/`,
      {
        params: data,
        headers: {'Accept-Language': serviceLanguage.language}
      }).then((response) => {
        response.data.loading = false
        context.commit('adsMutate', response.data)
      }).catch((err) => {
        console.log(err)
      })
  },
  GET_AD_DETAILS: function (context, data) {
    context.commit('adDetailsMutate', {loading: true})
    axios.get(`${MAIN_URL}ads/${data}/`).then((response) => {
        response.data.loading = false
        context.commit('adDetailsMutate', response.data)
      }).catch((err) => {
        console.log(err)
      })
  },
  DELETE_AD: function (context, data) {
    const TOKEN = localStorage.getItem('token')
    axios.delete(`${MAIN_URL}my/ads/delete/${data}/`,
    {
      headers: {authorization: `jwt ${TOKEN}`}
    }).then((response) => {
      context.commit('deleteFromMyAdsMutate', data)
    }).catch((err) => {
      console.log(err)
    })
  },
  CHANGE_CONTACT_INFO: function (context, data) {
    // context.commit('updateUserState', {loading: true})
    const TOKEN = localStorage.getItem('token')
    axios.patch(`${ACCOUNTS_URL}profile/`, {
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
      data.callback('<span>Settings saved successfully!</span><span class="checked-mark">&#10004;</span>')
    }).catch((err) => {
      console.log(err)
    })
  },
  CHANGE_USER_PHONE: function (context, data) {
    const TOKEN = localStorage.getItem('token')
    axios.put(`${ACCOUNTS_URL}profile/`, {
      phone: data.phone
    }, {
      headers: {
        authorization: `jwt ${TOKEN}`
      }
    }).then((response) => {
      console.log(response.data)
      context.commit('updateUserState', response.data)
      data.callback('<span>Settings saved successfully!</span><span class="checked-mark">&#10004;</span>')
    }).catch((err) => {
      console.log(err)
    })
  },
  SAVE_TO_WISH_LIST: function (context, slug) {
    const TOKEN = localStorage.getItem('token')
    context.commit('myWishListMutate', {loadingStar: true, success: false})
    axios.post(`${MAIN_URL}my/save/${slug}/`, {}, {
      headers: {
        authorization: `jwt ${TOKEN}`
      }
    }).then((response) => {
       context.commit('myWishListMutate', {loadingStar: false, success: true})
    }).catch((err) => {
      context.commit('myWishListMutate', {loadingStar: false, success: false})
    })
  },
  GET_MY_WISH_LIST: function (context, data) {
    const TOKEN = localStorage.getItem('token')
    context.commit('myWishListMutate', {loading: true})
    axios.get(`${MAIN_URL}my/list/`,
      {
        params: data,
        headers: {
          authorization: `jwt ${TOKEN}`,
          'Accept-Language': serviceLanguage.language
        }
      }).then((response) => {
        response.data.loading = false
        context.commit('myWishListMutate', response.data)
      }).catch((err) => {
        context.commit('myWishListMutate', {loading: false})
        console.log(err)
      })
  }
}
