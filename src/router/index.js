import Vue from 'vue'
import Router from 'vue-router'
import homePage from '@/pages/HomePage'
import loginPage from '@/pages/LoginPage'
import registerPage from '@/pages/RegisterPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', name: 'home', component: homePage
    },
    {
      path: '/login', name: 'login', component: loginPage
    },
    {
      path: '/register', name: 'register', component: registerPage
    }
  ]
})
