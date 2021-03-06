import axios from 'axios'
import router from '../router/index.js'
import serviceLanguage from '../services/language.js'

const MAIN_URL = 'https://servermarket.herokuapp.com/'
// const MAIN_URL = '//localhost:8000/';
const ACCOUNTS_URL = `${MAIN_URL}accounts/`;
axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `jwt ${ token }`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  LOGIN: function (context, data) {
    context.commit('loginStateMutate', true);
    axios.post(`${ACCOUNTS_URL}login/`, {
      email: data.email,
      password: data.password
    }).then((response) => {
      context.commit('success', response.data);
      context.commit('loginStateMutate', false);
      context.commit('createUserState', response.data.user);
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `jwt ${response.data.token}`;
      context.commit('auth');
      router.push({name: 'ads-list'})
    }).catch((err) => {
      context.commit('loginStateMutate', false);
      context.commit('error', err.response.data)
    })
  },
  SIGNUP: function (context, data) {
    context.commit('registerStateMutate', true);
    axios.post(`${ACCOUNTS_URL}signup/`, {
      email: data.email,
      password1: data.password1,
      password2: data.password2
    }).then((response) => {
      context.commit('success', response.data);
      context.commit('registerStateMutate', false);
      context.commit('createUserState', response.data.user);
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `jwt ${response.data.token}`;
      context.commit('auth');
      router.push({name: 'ads-list'})
    }, (err) => {
      context.commit('error', err.response.data);
      context.commit('registerStateMutate', false)
    })
  },
  CLEAR_ERRORS: function (context) {
    context.commit('clear_errors')
  },
  LOGOUT: function (context) {
    localStorage.removeItem('token');
    context.commit('auth');
    router.push({name: 'login'});
    window.location.reload()
  },
  DELETE_PROFILE: function (context) {
    axios.delete(`${ACCOUNTS_URL}destroy/`).then(() => {
      localStorage.removeItem('token');
      context.commit('deleteUser');
      window.location.reload()
      router.push({name: 'login'});
    }).catch((err) => {
      console.log(err)
    })
  },
  GET_CITIES: function (context, data) {
    axios.get(`${MAIN_URL}location/cities/${data.search}/`).then((response) => {
      data.callback(response.data)
    }).catch((err) => {
      console.log(err)
    })
  },
  TOKEN_VERIFY: function (context, next) {
    const TOKEN = localStorage.getItem('token');
    if (TOKEN) {
      axios.post(`${ACCOUNTS_URL}api-token-verify/`,
        {token: TOKEN}
        ).then((response) => {
          context.commit('createUserState', response.data.user);
          if (next) next()
        }).catch((err) => {
          console.log(err)
          localStorage.removeItem('token');
          context.commit('clearUserState');
          router.push({name: 'login'})
        })
    } else {
      router.push({name: 'login'})
    }
  },
  GET_MY_ADS: function (context, data) {
    context.commit('myAdsMutate', {loading: true});
    axios.get(`${MAIN_URL}my/ads/`,
      {
        params: data,
        headers: {
          'Accept-Language': serviceLanguage.language
        }
      }).then((response) => {
        response.data.loading = false;
        context.commit('myAdsMutate', response.data);
      }).catch((err) => {
        console.log(err)
      })
  },
  GET_CATEGORIES: function (context, data) {
    context.commit('loading', true);
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
    context.commit('adsMutate', {loading: true});
    router.push({name: 'ads-list', query: data});
    axios.get(`${MAIN_URL}ads/`,
      {
        params: data,
        headers: {'Accept-Language': serviceLanguage.language}
      }).then((response) => {
        response.data.loading = false;
        context.commit('adsMutate', response.data)
      }).catch((err) => {
        console.log(err)
      })
  },
  GET_ADS_VIP: function (context, data) {
    context.commit('adsVipLoadingMutate', true);
    axios.get(`${MAIN_URL}ads/vip/`,
      {
        headers: {'Accept-Language': serviceLanguage.language}
      }).then((response) => {
        context.commit('adsVipLoadingMutate', false);
        context.commit('adsVipMutate', response.data);
      }).catch((err) => {
        context.commit('adsVipLoadingMutate', false);
        console.log(err)
      })
  },
  GET_AD_DETAILS: function (context, data) {
    context.commit('adDetailsLoadingMutate', true);
    axios.get(`${MAIN_URL}ads/${data}/`).then((response) => {
      context.commit('adDetailsLoadingMutate', false);
      context.commit('adDetailsMutate', response.data)
    }).catch((err) => {
      context.commit('adDetailsLoadingMutate', false);
      console.log(err)
    })
  },
  CREATE_AD: function (context, data) {
    context.commit('createAdLoadingMutate', true);
    axios.post(`${MAIN_URL}ads/ad/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      context.commit('createAdLoadingMutate', false);
      router.push({name: 'ads-list'})
    }).catch((err) => {
      context.commit('createAdLoadingMutate', false);
      context.commit('error', err.response.data)
    })
  },
  EDIT_AD: function (context, data) {
    context.commit('editAdLoadingMutate', true);
    axios.put(`${MAIN_URL}ads/${data.slug}/`, data.form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
        context.commit('editAdLoadingMutate', false);
        context.commit('adDetailsMutate', response.data);
        router.push({name: 'ads-list'})
      }).catch((err) => {
        context.commit('editAdLoadingMutate', false);
        console.log(err)
      })
  },
  DELETE_AD: function (context, data) {
    axios.delete(`${MAIN_URL}my/ads/delete/${data}/`).then((response) => {
      context.commit('deleteFromMyAdsMutate', data);
      context.dispatch('GET_MY_ADS')
    }).catch((err) => {
      console.log(err)
    })
  },
  CHANGE_CONTACT_INFO: function (context, data) {
    axios.patch(`${ACCOUNTS_URL}profile/`, {
      first_name: data.first_name,
      last_name: data.last_name,
      city: data.city
    }).then((response) => {
      context.commit('updateUserState', response.data);
      data.callback('<span>Settings saved successfully!</span><span class="checked-mark">&#10004;</span>')
    }).catch((err) => {
      console.log(err)
    })
  },
  CHANGE_USER_PASSWORD: function (context, data) {
    context.commit('changePasswordErrorsMutate', {})
    axios.patch(`${ACCOUNTS_URL}change-password/`, {
      old_password: data.oldPassword,
      new_password: data.newPassword,
      new_password_confirm: data.newPasswordConfirm
    }).then(() => {
      data.clearFields();
      data.callback('<span>Password was saved successfully!</span><span class="checked-mark">&#10004;</span>')
    }).catch((err) => {
      context.commit('changePasswordErrorsMutate', err.response.data)
      console.log(err)
    })
  },
  CHANGE_USER_PHONE: function (context, data) {
    axios.put(`${ACCOUNTS_URL}profile/`, {
      phone: data.phone
    }).then((response) => {
      context.commit('updateUserState', response.data);
      data.callback('<span>Settings saved successfully!</span><span class="checked-mark">&#10004;</span>')
    }).catch((err) => {
      console.log(err)
    })
  },
  CHANGE_USER_AVATAR: function (context, data) {
    context.commit('avatarLoadingMutate', true);
    axios.put(`${ACCOUNTS_URL}profile/`, {
      avatar: data.avatar
    }).then((response) => {
      context.commit('avatarLoadingMutate', false);
      context.commit('updateUserState', response.data);
      data.callback('<span>Settings saved successfully!</span><span class="checked-mark">&#10004;</span>')
    }).catch((err) => {
      context.commit('avatarLoadingMutate', false);
      console.log(err)
    })
  },
  SAVE_TO_WISH_LIST: function (context, slug) {
    context.commit('starStateMutate', {loading: true});
    axios.post(`${MAIN_URL}my/save/${slug}/`, {}).then((response) => {
      context.commit('appendToWishListSlugsMutate', slug);
      context.commit('starStateMutate', {loading: false})
    }).catch((err) => {
      context.commit('starStateMutate', {loading: false});
      console.log(err)
    })
  },
  GET_MY_WISH_LIST: function (context, data) {
    context.commit('myWishListMutate', {loading: true});
    axios.get(`${MAIN_URL}my/list/`,
      {
        params: data
      }).then((response) => {
        response.data.loading = false;
        context.commit('myWishListMutate', response.data)
      }).catch((err) => {
        context.commit('myWishListMutate', {loading: false});
        console.log(err)
      })
  },
  GET_MY_WISH_LIST_LOAD_MORE: function (context, data) {
    axios.get(`${MAIN_URL}my/list/`,
      {
        params: data
      }).then((response) => {
        context.commit('myWishListMutateLoadMore', response.data)
      }).catch((err) => {
        console.log(err)
      })
  },
  GET_MY_WISH_LIST_SLUGS: function (context) {
    axios.get(`${MAIN_URL}my/slugs/`).then((response) => {
        context.commit('myWishListSlugsMutate', response.data)
      }).catch((err) => {
        console.log(err)
      })
  },
  DELETE_FROM_WISH_LIST_SLUGS: function (context, slug) {
    axios.delete(`${MAIN_URL}my/delete/${slug}/`).then((response) => {
        context.commit('deleteFromMyWishListSlugsMutate', slug)
      }).catch((err) => {
        console.log(err)
      })
  },
   DELETE_FROM_WISH_LIST: function (context, slug) {
    axios.delete(`${MAIN_URL}my/delete/${slug}/`).then((response) => {
      context.commit('deleteFromMyWishListMutate');
      context.dispatch('GET_MY_WISH_LIST', {page: 1})
      }).catch((err) => {
        console.log(err)
      })
  }
}
