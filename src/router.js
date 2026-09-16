import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import ForgotPassword from './views/Forgot-Password.vue'
import ResetPassword from './views/Reset-Password.vue'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/forgot-password',
    name: 'Forgot-Password',
    component: ForgotPassword
  },
  
  {
    path: '/reset-password',
    name: 'Reset-Password',
    component: ResetPassword
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router