import { createRouter, createWebHistory } from 'vue-router'

import ProtectedRoutes from './routes/protected'
import HomeView from '../views/HomeView.vue'

import { isUserLoggedIn, getUserData, getRol } from '../auth/utils'
import Guest from './routes/guest'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ProtectedRoutes,
    ...Guest,
    {
      path: '/',
      name: 'home',
      redirect:'auth/login',
    }
  ]
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()
  const userData = getUserData()
  const rol = getRol();

  if (to.name != 'login' && !isLoggedIn && to.meta.requireAuth ) {

    return next({ name:'login' })
  }

  return next()


})

export default router
