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
  categoriesMutate (state, data) {
    state.categories = {...state.categories, ...data}
  },
  adsMutate (state, data) {
    state.ads = {...state.ads, ...data}
  },
  myAdsMutate (state, data) {
    state.myAds = {...state.myAds, ...data}
  },
  activeFiltersCategoryMutate (state, data) {
    state.activeFiltersState.search = {};
    if (data.length) {
      for (const filter of data) {
        if (state.activeFiltersState.search['category'] && filter.data.text.isLeafNode) {
          state.activeFiltersState.search['category'] += ',' + filter.data.text.slug;
        } else {
          state.activeFiltersState.search['category'] = filter.data.text.slug;
        }
        if (!filter.data.text.isLeafNode) {
          state.activeFiltersState.node = filter.data.text.slug
        }
      }
    } else {
      state.activeFiltersState.search['category'] = state.activeFiltersState.node
    }
  },
  categoriesStaleMutate (state) {
    state.categories.staleResults = state.categories.results
  },
  clearCategoriesMutate (state) {
    state.categories.results = []
  }
}
