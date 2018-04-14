import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/pages/HomePage'
import loginPage from '@/pages/LoginPage'
import registerPage from '@/pages/RegisterPage'
import profilePage from '@/pages/ProfilePage'
import adsPage from '@/pages/AdsPage'
import store from '@/store'
import profileMessageForm from '@/components/ProfileMessageForm'
import profileAdsForm from '@/components/ProfileAdsForm'
import profileSettingsForm from '@/components/ProfileSettingsForm'
import adDetailsPage from '@/pages/AdDetailsPage'

Vue.use(Router)

const TOKEN_REQUIRED_PAGES = ['profile']

const routes = [
  {
    path: '/', name: 'home', component: homePage, meta: {title: 'Market | Home'}
  },
  {
    path: '/login', name: 'login', component: loginPage, meta: {title: 'Market | Login'}
  },
  {
    path: '/register', name: 'register', component: registerPage, meta: {title: 'Market | Signup'}
  },
  {
    path: '/ads', name: 'ads', component: adsPage, meta: {title: 'Market | Ads'}
  },
  {
    path: '/profile',
    name: 'profile',
    component: profilePage,
    meta: {title: 'Market | Profile'},
    children: [
    {path: 'message', component: profileMessageForm},
    {path: 'ads', component: profileAdsForm},
    {path: 'settings', component: profileSettingsForm}
    ]
  },
  {
    path: '/ad-details', name: 'adDetails', component: adDetailsPage, meta: {title: 'Market | Ads'}
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
