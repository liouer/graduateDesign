import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'
// import Home from '../views/Home.vue'
import PageA from '@/components/PageA.vue'
import PageB from '@/components/PageB.vue'

import LoginA from '@/views/login/index.vue'


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/PageA',
    name: 'PageA',
    component: PageA
  },
  {
    path: '/PageB',
    name: PageB,
    component: PageB
  },
  {
    path: '/login',
    name: LoginA,
    component: LoginA
  }

]

const router = new VueRouter({
  routes
})

export default router
