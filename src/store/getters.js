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
  getAds: state => {
    return state.ads
  },
  getMyAds: state => {
    return state.myAds
  },
  getMyWishList: state => {
    return state.myWishList
  },
  getMyWishListSlugs: state => {
    return state.myWishListSlugs
  },
  getStarLoading: state => {
    return state.starState.loading
  },
  getActiveFilters: state => {
    return state.activeFiltersState.search
  },
  getAdDetails: state => {
    return state.adDetails
  },
  getOrdering: state => {
    return state.orderingState
  }
}
