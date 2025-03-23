import HomeViewVue from '@/views/HomeView.vue'
import LoginPage from '@/views/pages/auth/login.vue'
import ReceiptPage from '@/views/pages/guest/receipt/receipt.vue'


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
  },

  {
    path:'/receipts/:id/:month/:year',
    name:'receipt',
    component:ReceiptPage
  }


]
