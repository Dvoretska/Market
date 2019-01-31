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
  adsVip: [],
  createAdLoading: false,
  editAdLoading: false,
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
  adDetails: {},
  adDetailsLoading: false,
  orderingState: {isOpen: null}
}
