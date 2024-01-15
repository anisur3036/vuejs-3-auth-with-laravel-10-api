/* eslint-disable @typescript-eslint/no-unused-vars */
import { createRouter, createWebHistory, type RouteLocation } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

function auth(to: RouteLocation, from: RouteLocation) {
  const auth = useAuthStore()

  if (!auth.user) {
    return '/login'
  }
}

function guest(to: RouteLocation, from: RouteLocation) {
  const auth = useAuthStore()

  if (auth.user) {
    return '/'
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: auth,
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      beforeEnter: auth,
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: guest,
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach(
  async (to: RouteLocation, from: RouteLocation) => await useAuthStore().verifySession()
)

export default router
