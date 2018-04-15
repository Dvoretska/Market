export default {
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
  },
  getProducts: state => {
    return state.products
  },
  getMyAds: state => {
    return state.myAds
  },
  getActiveFilters: state => {
    return state.activeFiltersState.search
  }
}
