import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/pages/HomePage'
import loginPage from '@/pages/LoginPage'
import registerPage from '@/pages/RegisterPage'
import profilePage from '@/pages/ProfilePage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', name: 'home', component: homePage
    },
    {
      path: '/login', name: 'login', component: loginPage
    },
    {
      path: '/register', name: 'register', component: registerPage
    },
    {
      path: '/profile', name: 'profile', component: profilePage
    }
  ]
})
