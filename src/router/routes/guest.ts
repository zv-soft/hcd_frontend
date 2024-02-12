import HomeViewVue from '@/views/HomeView.vue'
import LoginPage from '@/views/pages/auth/login.vue'


export default [
  {
    path:'/',
    name:'home',
    component:HomeViewVue
  },
  {
    path:'/market',
    name:'market',
    component:HomeViewVue
  },
  {
    path:'/auth/login',
    name:'login',
    component:LoginPage
  }
]
