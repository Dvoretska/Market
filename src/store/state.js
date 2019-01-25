export default {
  authState: {
    token: localStorage.getItem('token') || ''
  },
  responseState: {
    success: null, errors: null, loading: null
  },
  loginState: {
    loading: null
  },
  avatarLoading: false,
  registerState: {
    loading: null
  },
  userDetailsState: {},
  categories: {
    results: []
  },
  ads: {
    results: []
  },
  myAds: {
    results: []
  },
  myWishList: {
    results: []
  },
  myWishListSlugs: [],
  starState: {},
  activeFiltersState: {
    search: {},
    node: ''
  },
  adDetails: {
    user: {}
  },
  orderingState: {isOpen: null}
}
