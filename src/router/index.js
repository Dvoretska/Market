import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/pages/HomePage'
import loginPage from '@/pages/LoginPage'
import registerPage from '@/pages/RegisterPage'
import profilePage from '@/pages/ProfilePage'

Vue.use(Router)

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
    path: '/profile', name: 'profile', component: profilePage, meta: {title: 'Market | Profile'}
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title
  next()
})
export default router
