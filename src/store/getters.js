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
  getProductList: state => {
    return state.productListState
  }
}
