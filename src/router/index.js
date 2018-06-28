import Vue from 'vue'
import Router from 'vue-router'
import adsListPage from '@/pages/AdsListPage'
import loginPage from '@/pages/LoginPage'
import registerPage from '@/pages/RegisterPage'
import profilePage from '@/pages/ProfilePage'
import createAdPage from '@/pages/CreateAdPage'
import editAdPage from '@/pages/EditAdPage'
import store from '@/store'
import profileMessageForm from '@/components/ProfileMessageForm'
import profileAdsForm from '@/components/ProfileAdsForm'
import profileSelectedAds from '@/components/ProfileSelectedAds'
import profileSettingsForm from '@/components/ProfileSettingsForm'
import adDetailsPage from '@/pages/AdDetailsPage'
import homePage from '@/pages/HomePage'

Vue.use(Router)

const TOKEN_REQUIRED_PAGES = ['profile']

const routes = [
  {
    path: '/', name: 'home', component: homePage, meta: {title: 'Market | Home'}
  },
  {
    path: '/ads', name: 'ads-list', component: adsListPage, meta: {title: 'Market | Home'}
  },
  {
    path: '/login', name: 'login', component: loginPage, meta: {title: 'Market | Login'}
  },
  {
    path: '/register', name: 'register', component: registerPage, meta: {title: 'Market | Signup'}
  },
  {
    path: '/create-ad', name: 'create-ad', component: createAdPage, meta: {title: 'Market | Ads'}
  },
  {
    path: '/edit/:slug', name: 'edit', component: editAdPage, meta: {title: 'Market | Ads'}
  },
  {
    path: '/profile',
    name: 'profile',
    component: profilePage,
    meta: {title: 'Market | Profile'},
    children: [
    {path: 'message', component: profileMessageForm},
    {path: 'my-ads', component: profileAdsForm},
    {path: 'selected-ads', component: profileSelectedAds},
    {path: 'settings', component: profileSettingsForm}
    ]
  },
  {
    path: '/ads/:slug', name: 'adDetails', component: adDetailsPage, meta: {title: 'Market | Ads'}
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title
  if (TOKEN_REQUIRED_PAGES.includes(to.name)) {
    store.dispatch('TOKEN_VERIFY', next)
  } else {
    next()
  }
})
export default router
