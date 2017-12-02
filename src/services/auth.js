import Vue from 'vue'

export default {
  authenticate (request) {
    return Vue.http.post('https://servermarket.herokuapp.com/accounts/signup')
    .then((response) => Promise.resolve(response.data))
    .catch((error) => Promise.reject(error))
  }
}
