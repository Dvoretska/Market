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
      city: data.city,
      phone: data.phone
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
  myWishListSlugsMutate (state, data) {
    state.myWishListSlugs = data
  },
  appendToWishListSlugsMutate (state, data) {
    state.myWishListSlugs.push(data)
  },
  starStateMutate (state, data) {
    state.starState = data
  },
  deleteFromMyWishListSlugsMutate (state, data) {
    let index = state.myWishListSlugs.indexOf(data);
    if (index !== -1) {
      state.myWishListSlugs.splice(index, 1);
    }
  },
  deleteFromMyWishListMutate (state, slug) {
    state.myWishList.results = state.myWishList.results.filter(function (ad) {
      return ad.slug !== slug;
    })
  },
  myWishListMutate (state, data) {
    state.myWishList = {...state.myWishList, ...data}
  },
  myWishListMutateLoadMore (state, data) {
    let updateState = state.myWishList.results.concat(data.results)
    state.myWishList = {...state.myWishList, ...data}
    state.myWishList.results = updateState
  },
  activeFiltersSearchMutate(state, data) {
    state.activeFiltersState.search = data;
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
  adDetailsMutate (state, data) {
    state.adDetails = data
  },
  deleteFromMyAdsMutate (state, slug) {
    state.myAds.results = state.myAds.results.filter(function (myAd) {
      return myAd.slug !== slug;
    })
  },
  updateUserDetailsField (state, data) {
    state.userDetailsState = {
      ...state.userDetailsState,
      data
    }
  },
  setOrderingState (state, data) {
    state.orderingState = data
  },
  adDetailsFieldMutate (state, data) {
    state.adDetails[data.field] = data.value
  },
  adDetailsFieldUserMutate (state, data) {
    state.adDetails.user[data.field] = data.value
  }
}
