import Layout from '@/layouts/DashboardLayout.vue'
import DashboardHome from '@/views/pages/dashboard/home.vue'
import Users from '@/views/pages/dashboard/users/index.vue'
import User from '@/views/pages/dashboard/users/details.vue'
import CreateUser from '@/views/pages/dashboard/users/create.vue'
//Employees
import Employees from '@/views/pages/dashboard/employees/index.vue'
import CreateEmployees from '@/views/pages/dashboard/employees/create.vue'
import DetailAndUpdateEmployee from '@/views/pages/dashboard/employees/edit.vue'
//Receipts
import Receipts from '@/views/pages/dashboard/receipts/receiptList.vue'


export default{
  path: '/dashboard',
  name: 'dashboard',
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
    },
    {
      path:'/employees',
      name:'employees',
      component:Employees,
    },
    {
      path:'/employees/create',
      name:'createEmployee',
      component:CreateEmployees,
    },
    {
      path:'/employee/:id',
      name:'detailsAndUpdateEmployee',
      component:DetailAndUpdateEmployee,
    },
    {
      path:'/receipts',
      name:'receiptList',
      component:Receipts,
    }

  ]
}
