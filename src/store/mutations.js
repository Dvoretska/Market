export default {
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
  },
  productsMutate (state, data) {
    state.products = {...state.products, ...data}
  }
}
