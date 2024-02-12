import Layout from '@/layouts/DashboardLayout.vue'
import DashboardHome from '@/views/pages/dashboard/home.vue'
import Users from '@/views/pages/dashboard/users/index.vue'
import User from '@/views/pages/dashboard/users/details.vue'
import CreateUser from '@/views/pages/dashboard/users/create.vue'

export default{
  path: '/dashboard',
  name: 'dashbaord',
  component: Layout,
  meta:{
    requireAuth:true
  },
  children:[
    {
      path:'/dashboard/home',
      name:'dashboardHome',
      component:DashboardHome
    },
    {
      path:'/users',
      name:'users',
      component:Users
    },
    {
      path:'/user/:id',
      name:'user',
      component:User,     
    },    
    {
      path:'/users/create',
      name:'createUser',
      component:CreateUser,
    }
  ]
}
